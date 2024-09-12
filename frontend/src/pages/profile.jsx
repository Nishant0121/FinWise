import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LogOut, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Profile() {
  const API_KEY = "AIzaSyBxm7zzP55l_Aoqgb3I7LF-YJDURFApzrw"; // Replace with your actual API key
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const [user, setUser] = useState({});
  const [response, setResponse] = useState("");
  const [formData, setFormData] = useState({
    income: "",
    savings: "",
    debts: "",
    expenses: "",
  });
  const [financialScore, setFinancialScore] = useState(0);
  const navigate = useNavigate();

  const calculateFinancialScore = (income, savings, debt, expenses) => {
    let score = 0;

    if (income > expenses) score += 40;
    if (savings >= 0.2 * income) score += 30;
    if (debt <= 0.5 * income) score += 20;
    if (savings > 0) score += 10;

    return score;
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.createdAt) {
      const date = new Date(userData.createdAt);
      const options = { year: "numeric", month: "long" };
      userData.createdAt = date.toLocaleDateString(undefined, options);
    }
    setUser(userData);
    setFormData({
      income: userData.income || "",
      savings: userData.savings || "",
      debts: userData.debts || "",
      expenses: userData.expenses || "",
    });

    const score = calculateFinancialScore(
      userData.income,
      userData.savings,
      userData.debts,
      userData.expenses
    );
    setFinancialScore(score);
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const run = async function (p) {
      try {
        const refinedPrompt = p;
        const result = await model.generateContent(refinedPrompt);
        const response = result.response;
        const text = response.text();
        setResponse(text);
      } catch (error) {
        console.error("Error in run function:", error);
        // Handle the error appropriately (e.g., return a default value or show an error message)
        return "An error occurred while generating content.";
      }
    };
    run(
      `{response should be point wise and of 70 words generate a financial advice for me based on my income
        ${userData.income},saving
        ${userData.savings}, debts
        ${userData.debts} ,expenses
        ${userData.expenses}}`
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `/api/users/update/${user._id}`,
        formData
      );

      const updatedUser = await response.data;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      document.getElementById("edit_info").close();
      setFinancialScore(
        calculateFinancialScore(
          updatedUser.income,
          updatedUser.savings,
          updatedUser.debts,
          updatedUser.expenses
        )
      );
      toast.success("User data updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user data");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };
  console.log(response);

  return (
    <div className="p-2 md:p-6 bg-gray-100 min-h-screen">
      <article className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <section className="bg-white shadow-lg rounded-lg p-2 md:p-6">
          <div className="bg-blue-500 relative text-white rounded-md p-4">
            <div>
              <p className="font-semibold">Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Contact No: {user.mobileNo}</p>
            </div>

            <div
              className="px-1 m-2 py-1 w-fit absolute top-0 right-0 text-red-600 bg-white rounded-md shadow-md hover:bg-blue-100"
              onClick={handleLogout}
            >
              <LogOut />
            </div>
          </div>
          <div className="border-t border-gray-300 my-4"></div>
          <div className="bg-blue-400 text-white flex items-start justify-between rounded-md p-4">
            <div>
              <p>Income: {user.income}</p>
              <p>Expenses: {user.expenses}</p>
              <p>Savings: {user.savings}</p>
              <p>Debts: {user.debts}</p>
            </div>
            <button
              className="px-1 py-1 text-blue-600 bg-white rounded-md shadow-md hover:bg-blue-100"
              onClick={() => document.getElementById("edit_info").showModal()}
            >
              <Pencil />
            </button>
          </div>
          <div className="border-t border-gray-300 my-4"></div>
          <div className="bg-blue-300 text-white rounded-md p-4">
            <p>User Since: {user.createdAt}</p>
            <p>Financial Score: {financialScore}</p>
          </div>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-2 md:p-6">
          <p className="text-lg font-semibold text-gray-700">
            Your Financial Score
          </p>
          <p className="text-sm text-gray-600 mt-2 mb-4">
            The Financial Score is a measure of your financial health. Your
            financial score is calculated based on these rules:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>Income should be more than expenses.</li>
            <li>Savings should be more than 20% of income.</li>
            <li>Debt should be less than 50% of income.</li>
            <li>Add extra score for having some savings.</li>
          </ul>
          <p className="mt-4 text-lg font-semibold text-gray-800">
            Your Financial Score:{" "}
            <span className="text-blue-500">{financialScore}</span>
          </p>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-2 md:p-6">
          <pre className=" overflow-x-auto">{response}</pre>
        </section>
      </article>

      <dialog id="edit_info" className="modal">
        <div className="modal-box bg-white text-black rounded-lg p-2 md:p-6">
          <h3 className="font-bold text-lg mb-4">Edit User Info</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="income" className="block text-sm font-medium">
                Income:
              </label>
              <input
                type="text"
                name="income"
                value={formData.income}
                onChange={handleChange}
                className="w-full text-white p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="expenses" className="block text-sm font-medium">
                Expenses:
              </label>
              <input
                type="text"
                name="expenses"
                value={formData.expenses}
                onChange={handleChange}
                className="w-full text-white p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="savings" className="block text-sm font-medium">
                Savings:
              </label>
              <input
                type="text"
                name="savings"
                value={formData.savings}
                onChange={handleChange}
                className="w-full text-white p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="debts" className="block text-sm font-medium">
                Debts:
              </label>
              <input
                type="text"
                name="debts"
                value={formData.debts}
                onChange={handleChange}
                className="w-full text-white p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="modal-action flex justify-end space-x-2">
              <button
                type="submit"
                className="btn bg-blue-500 border-0 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
              >
                Save
              </button>
              <button
                type="button"
                className="btn bg-gray-300 border-0 text-black px-4 py-2 rounded-lg shadow hover:bg-gray-400 transition"
                onClick={() => document.getElementById("edit_info").close()}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
