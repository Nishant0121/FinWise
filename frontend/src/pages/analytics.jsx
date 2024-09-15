import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {
  const { authUser } = useContext(AppContext);

  // State to store all budgets and the most recent budget
  const [submittedBudget, setSubmittedBudget] = useState(null);
  const [allBudget, setAllBudget] = useState([]);

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
  }, [authUser]);

  // Get the last 10 entries of allBudget
  const last10Budgets = allBudget.slice(-10);

  // Prepare data for the charts
  const incomeVsExpenseData = {
    labels: last10Budgets.map((budget) =>
      new Date(budget.date).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Income",
        data: last10Budgets.map((budget) => budget.income),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "Total Expenses",
        data: last10Budgets.map((budget) => budget.totalExpenses),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 1)",
        fill: true,
      },
    ],
  };

  const categoryWiseSpendingData = {
    labels: [
      "Rent",
      "Food",
      "Transportation",
      "Utilities",
      "Entertainment",
      "Miscellaneous",
    ],
    datasets: [
      {
        label: "Category-wise Spending",
        data: submittedBudget
          ? [
              submittedBudget.rent,
              submittedBudget.food,
              submittedBudget.transportation,
              submittedBudget.utilities,
              submittedBudget.entertainment,
              submittedBudget.miscellaneous,
            ]
          : [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const savingsOverTimeData = {
    labels: last10Budgets.map((budget) =>
      new Date(budget.date).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Savings",
        data: last10Budgets.map((budget) => budget.savings),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.9)",
        fill: true,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 max-w-[60vw] mt-4 mx-auto gap-4">
      <div>
        <h2 className=" font-bold text-xl">
          Income vs Expenses Over Time (Last 10 Entries)
        </h2>
        <Line data={incomeVsExpenseData} />
      </div>
      <div className="max-h-[100vh] mx-auto">
        <h2 className=" font-bold text-xl">
          Category-wise Spending (Most Recent Budget)
        </h2>
        <Pie data={categoryWiseSpendingData} />
      </div>

      <div>
        <h2 className=" font-bold text-xl">
          Savings Over Time (Last 10 Entries)
        </h2>
        <Bar data={savingsOverTimeData} />
      </div>
    </div>
  );
}
