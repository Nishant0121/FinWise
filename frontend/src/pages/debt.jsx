import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context.jsx";
import toast from "react-hot-toast";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import DebtInterestCalculator from "../components/debtmanagement.jsx";
import { Calculator, X } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Debt() {
  const { authUser } = useContext(AppContext); // Get the authenticated user from context
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [allDebts, setAllDebts] = useState([]);

  // Fetch debts when component mounts or when authUser changes
  useEffect(() => {
    const fetchDebts = async () => {
      try {
        const response = await axios.post("/api/debt/get/debt", {
          userId: authUser._id,
        });

        // Assuming the response contains an array of debt records, and we only need the debts array
        setAllDebts(response.data[0]?.debts || []); // Get debts array, or an empty array if none found
      } catch (error) {
        console.error(error);
      }
    };

    if (authUser && authUser._id) {
      fetchDebts(); // Only fetch debts if authUser is available
    }
  }, [authUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/debt/add/debt", {
        userId: authUser._id,
        name,
        amount: parseFloat(amount),
        dueDate,
      });
      toast.success("Debt added successfully!");
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  // Calculate total debts
  const totalDebt = allDebts.reduce((acc, debt) => acc + debt.amount, 0);

  // Prepare data for Pie chart
  const chartData = {
    labels: allDebts.map((debt) => debt.name),
    datasets: [
      {
        label: "Amount",
        data: allDebts.map((debt) => debt.amount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="relative max-w-[1200px] min-h-[90vh] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 p-2 md:p-4 border rounded-lg shadow-md bg-white">
      <form onSubmit={handleSubmit} className="col-span-1">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block p-4 text-white w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block p-4 text-white w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            step="0.01"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 block p-4 text-white w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Debt
        </button>
      </form>

      {/* Pie Chart */}
      <div className="col-span-1 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Debt Distribution</h2>
        <Pie className=" max-w-[400px] max-h-[400px] " data={chartData} />
        <p className="mt-4 text-lg">
          Total Debt: <strong>₹{totalDebt.toFixed(2)}</strong>
        </p>
      </div>

      <button
        className="btn p-2 m-2 absolute right-0 bottom-0"
        onClick={() =>
          document.getElementById("DebtInterestCalculator").showModal()
        }
      >
        <Calculator />
      </button>
      <dialog
        id="DebtInterestCalculator"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box relative scroll-hide bg-white">
          <DebtInterestCalculator />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">
                <X />
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
