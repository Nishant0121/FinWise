import { useState } from "react";

const DebtInterestCalculator = () => {
  const [debtAmount, setDebtAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [totalInterest, setTotalInterest] = useState(null);
  const [repayment, setRepayment] = useState(null);

  const calculateInterest = () => {
    const principal = parseFloat(debtAmount);
    const rate = parseFloat(interestRate) / 100;
    const term = parseFloat(loanTerm);

    if (!isNaN(principal) && !isNaN(rate) && !isNaN(term)) {
      const interest = principal * rate * term;
      const totalAmount = principal + interest;
      const monthlyPayment = totalAmount / (term * 12);
      setTotalInterest(interest.toFixed(2));
      setRepayment(monthlyPayment.toFixed(2));
    }
  };

  return (
    <div className="flex justify-center items-center h-fit bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-balck">
          Debt Interest Calculator
        </h2>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-white mb-2"
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
            className="block text-sm font-medium text-white mb-2"
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
            className="block text-sm font-medium text-white mb-2"
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

        {totalInterest !== null && repayment !== null && (
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
                <li>
                  Try to make extra payments to reduce the interest over time.
                </li>
                <li>Consider refinancing if the interest rate is high.</li>
                <li>
                  Ensure that monthly payments are affordable to avoid
                  penalties.
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DebtInterestCalculator;
