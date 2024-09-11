import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios"; // Import Axios for sending requests
import toast from "react-hot-toast";
import { AppContext } from "../context";
import { Chart } from "chart.js/auto"; // Import Chart.js

export default function Budget() {
  const { authUser } = useContext(AppContext);

  // State to store the form input
  const [budget, setBudget] = useState({
    userId: "",
    income: "",
    food: "",
    rent: "",
    entertainment: "",
    utilities: "",
    transportation: "",
    savings: "",
    miscellaneous: "",
  });

  // State to store all budgets and the most recent budget
  const [submittedBudget, setSubmittedBudget] = useState(null);
  const [allBudget, setAllBudget] = useState([]);

  // Reference to the chart container
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Use ref to store the chart instance

  useEffect(() => {
    // Fetch budget data from the backend
    if (authUser && authUser._id) {
      axios
        .post("/api/budget/get/budget", { userId: authUser._id })
        .then((response) => {
          setAllBudget(response.data);

          // Find the most recent budget by sorting based on the 'date' field
          const sortedBudgets = [...response.data].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setSubmittedBudget(sortedBudgets[0]); // Set the most recent budget
        })
        .catch((error) => {
          console.error("There was an error fetching the budget!", error);
        });
    }
  }, [authUser]); // Re-run the effect when `authUser` changes

  useEffect(() => {
    // Create or update the chart whenever `submittedBudget` changes
    if (submittedBudget && chartRef.current) {
      // Get only the latest two budgets
      const latestTwoBudgets = allBudget.slice(0, 2);
      createChart(latestTwoBudgets);
    }

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [submittedBudget]); // Only run when `submittedBudget` changes

  // Handle form input change
  const handleChange = (e) => {
    setBudget({
      ...budget,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend with the budget data, including userId
      const response = await axios.post("/api/budget/create/budget", {
        ...budget,
        userId: authUser._id, // Ensure we include userId from authUser
      });

      setSubmittedBudget(response.data); // Update the current budget with the newly added one
      toast.success("Budget created successfully!");

      // Fetch the updated list of budgets after the new budget is added
      const updatedBudgets = await axios.post("/api/budget/get/budget", {
        userId: authUser._id, // Ensure the correct userId is sent here too
      });
      setAllBudget(updatedBudgets.data);
    } catch (error) {
      console.error("There was an error submitting the budget!", error);
    }
  };

  // Create the chart using Chart.js
  const createChart = (budgets) => {
    // If the chart already exists, destroy it to avoid overlapping
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    // Extract income and total expenses from each budget
    const labels = budgets.map((budget, index) => `Budget ${index + 1}`);
    const incomeData = budgets.map((budget) => budget.income);
    const totalExpensesData = budgets.map((budget) => budget.totalExpenses);

    // Create a new chart
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Income",
            data: incomeData,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Total Expenses",
            data: totalExpensesData,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Adjust to make chart responsive
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <div className="container mx-auto p-2 md:px-4 md:py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Display the submitted budget details */}
        {submittedBudget ? (
          <div className="p-2 md:p-6 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">Current Budget Details</h2>{" "}
            <div className="space-y-2">
              <p>
                <strong>Income:</strong> ₹{submittedBudget.income}
              </p>
              <p>
                <strong>Food:</strong> ₹{submittedBudget.food}
              </p>
              <p>
                <strong>Rent:</strong> ₹{submittedBudget.rent}
              </p>
              <p>
                <strong>Entertainment:</strong> ₹{submittedBudget.entertainment}
              </p>
              <p>
                <strong>Utilities:</strong> ₹{submittedBudget.utilities}
              </p>
              <p>
                <strong>Transportation:</strong> ₹
                {submittedBudget.transportation}
              </p>
              <p>
                <strong>Savings:</strong> ₹{submittedBudget.savings}
              </p>
              <p>
                <strong>Miscellaneous:</strong> ₹{submittedBudget.miscellaneous}
              </p>
              <p>
                <strong>Total Expenses:</strong> ₹
                {submittedBudget.totalExpenses}
              </p>
            </div>
            <div className="w-full h-64">
              <canvas
                ref={chartRef}
                id="myChart"
                className="w-full h-full"
              ></canvas>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">Current Budget Details</h2>
            <div className="space-y-2">
              <p>No budget data available.</p>
            </div>
          </div>
        )}
        {/* Form to take budget input */}
        <div className="p-6 bg-white shadow-md rounded-md">
          <h2 className="text-xl font-bold mb-4">Enter Your Budget Details</h2>
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            {[
              { label: "Income", name: "income" },
              { label: "Food", name: "food" },
              { label: "Rent", name: "rent" },
              { label: "Entertainment", name: "entertainment" },
              { label: "Utilities", name: "utilities" },
              { label: "Transportation", name: "transportation" },
              { label: "Savings", name: "savings" },
              { label: "Miscellaneous", name: "miscellaneous" },
            ].map((field) => (
              <div key={field.name} className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {field.label}:
                </label>
                <input
                  type="number"
                  name={field.name}
                  value={budget[field.name]}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
