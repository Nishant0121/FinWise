import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import LoaderFit from "./loaderfit";

const DebtInterestCalculator = () => {
  const [debtAmount, setDebtAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [totalInterest, setTotalInterest] = useState(null);
  const [repayment, setRepayment] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const API_KEY = "AIzaSyBxm7zzP55l_Aoqgb3I7LF-YJDURFApzrw"; // Replace with your actual API key
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const hardcodedSuggestions = [
    "Make extra payments whenever possible to reduce the principal.",
    "Consider refinancing to get a lower interest rate.",
    "Set up automatic payments to avoid missed or late payments.",
    "Prioritize paying off high-interest loans first.",
    "Look for ways to cut unnecessary expenses and allocate more money toward debt repayment.",
  ];

  const calculateInterest = async () => {
    const principal = parseFloat(debtAmount);
    const rate = parseFloat(interestRate) / 100;
    const term = parseFloat(loanTerm);

    if (!isNaN(principal) && !isNaN(rate) && !isNaN(term)) {
      const interest = principal * rate * term;
      const totalAmount = principal + interest;
      const monthlyPayment = totalAmount / (term * 12);
      setTotalInterest(interest.toFixed(2));
      setRepayment(monthlyPayment.toFixed(2));

      // Set loading state to true before fetching suggestions
      setLoading(true);

      try {
        // Validate input values
        if (principal <= 0 || rate < 0 || term <= 0) {
          throw new Error(
            "Invalid input: Please enter positive values for principal, rate, and term."
          );
        }

        // Make a request to the Gemini AI model for suggestions
        const response = await model.generateContent({
          prompt: `Provide repayment strategies for a loan with a principal of ₹${principal}, an interest rate of ${
            rate * 100
          }%, and a term of ${term} years.`,
        });

        // Set the AI-generated suggestions
        setSuggestions(response.response.text);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        // If an error occurs, set the hardcoded suggestions
        setSuggestions(hardcodedSuggestions.join("\n"));
      } finally {
        // Set loading state to false after the request is complete
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-fit bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-black">
          Debt Interest Calculator
        </h2>
        <div className="mb-4">
          <label
            className="block text-sm text-blue-700 font-bold mb-2"
            htmlFor="debtAmount"
          >
            Debt Amount (₹)
          </label>
          <input
            type="number"
            id="debtAmount"
            value={debtAmount}
            onChange={(e) => setDebtAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter debt amount"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm text-blue-700 font-bold mb-2"
            htmlFor="interestRate"
          >
            Interest Rate (%)
          </label>
          <input
            type="number"
            id="interestRate"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter interest rate"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm text-blue-700 font-bold mb-2"
            htmlFor="loanTerm"
          >
            Loan Term (Years)
          </label>
          <input
            type="number"
            id="loanTerm"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter loan term"
          />
        </div>
        <button
          onClick={calculateInterest}
          className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Calculate
        </button>

        {loading && (
          <div className="mt-6 p-4 bg-indigo-50 rounded-lg text-center">
            <LoaderFit />
          </div>
        )}

        {totalInterest !== null && repayment !== null && !loading && (
          <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-700">
              Calculation Results
            </h3>
            <p className="mt-2 text-black">
              <span className="font-bold">Total Interest:</span> ₹
              {totalInterest}
            </p>
            <p className="mt-1 text-black">
              <span className="font-bold">Monthly Payment:</span> ₹{repayment}
            </p>
            <div className="mt-4">
              <h4 className="font-semibold text-gray-800">
                Suggested Repayment Strategy:
              </h4>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                {suggestions &&
                  suggestions
                    .split("\n")
                    .map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DebtInterestCalculator;
