import { useState } from "react";

const BudgetCalculator = () => {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [budgetResult, setBudgetResult] = useState(null);

  const calculateBudget = () => {
    const totalIncome = parseFloat(income);
    const totalExpenses = parseFloat(expenses);

    if (!isNaN(totalIncome) && !isNaN(totalExpenses)) {
      setBudgetResult(totalIncome - totalExpenses);
    }
  };

  return (
    <div className="mt-4">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Monthly Income ($)
        </label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="w-full px-4 text-white py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter your income"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Monthly Expenses ($)
        </label>
        <input
          type="number"
          value={expenses}
          onChange={(e) => setExpenses(e.target.value)}
          className="w-full px-4 text-white py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter your expenses"
        />
      </div>
      <button
        onClick={calculateBudget}
        className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Calculate
      </button>
      {budgetResult !== null && (
        <p className="mt-3 text-lg font-bold text-indigo-700">
          {budgetResult >= 0
            ? `You have a budget surplus of $₹{budgetResult}`
            : `You have a budget deficit of $₹{Math.abs(budgetResult)}`}
        </p>
      )}
    </div>
  );
};

// Placeholder components for Emergency Fund Calculator, Debt Tracker, and Investment Simulator
const EmergencyFundCalculator = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [months, setMonths] = useState("");
  const [emergencyFund, setEmergencyFund] = useState(null);

  const calculateEmergencyFund = () => {
    const expenses = parseFloat(monthlyExpenses);
    const monthsNeeded = parseFloat(months);

    if (!isNaN(expenses) && !isNaN(monthsNeeded)) {
      setEmergencyFund(expenses * monthsNeeded);
    }
  };

  return (
    <div className="mt-4">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Monthly Expenses ($)
        </label>
        <input
          type="number"
          value={monthlyExpenses}
          onChange={(e) => setMonthlyExpenses(e.target.value)}
          className="w-full px-4 text-white py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter your monthly expenses"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Months of Coverage
        </label>
        <input
          type="number"
          value={months}
          onChange={(e) => setMonths(e.target.value)}
          className="w-full px-4 text-white py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter the number of months"
        />
      </div>
      <button
        onClick={calculateEmergencyFund}
        className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Calculate
      </button>
      {emergencyFund !== null && (
        <p className="mt-3 text-lg font-bold text-indigo-700">
          You need an emergency fund of ₹{emergencyFund} for {months} months of
          coverage.
        </p>
      )}
    </div>
  );
};

const DebtTracker = () => {
  const [debts, setDebts] = useState([{ name: "", amount: "" }]);
  const [totalDebt, setTotalDebt] = useState(null);

  const handleDebtChange = (index, field, value) => {
    const newDebts = [...debts];
    newDebts[index][field] = value;
    setDebts(newDebts);
  };

  const addDebt = () => {
    setDebts([...debts, { name: "", amount: "" }]);
  };

  const calculateTotalDebt = () => {
    const total = debts.reduce((acc, debt) => {
      const amount = parseFloat(debt.amount);
      return acc + (isNaN(amount) ? 0 : amount);
    }, 0);
    setTotalDebt(total);
  };

  return (
    <div className="mt-4">
      {debts.map((debt, index) => (
        <div key={index} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Debt Name
          </label>
          <input
            type="text"
            value={debt.name}
            onChange={(e) => handleDebtChange(index, "name", e.target.value)}
            className="w-full px-4 text-white py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
            placeholder="Enter debt name"
          />
          <label className="block text-sm font-medium text-gray-700">
            Amount ($)
          </label>
          <input
            type="number"
            value={debt.amount}
            onChange={(e) => handleDebtChange(index, "amount", e.target.value)}
            className="w-full px-4 text-white py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter debt amount"
          />
        </div>
      ))}
      <button
        onClick={addDebt}
        className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors mb-4"
      >
        Add Another Debt
      </button>
      <button
        onClick={calculateTotalDebt}
        className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Calculate Total Debt
      </button>
      {totalDebt !== null && (
        <p className="mt-3 text-lg font-bold text-indigo-700">
          Your total debt is ₹{totalDebt}.
        </p>
      )}
    </div>
  );
};

const InvestmentSimulator = () => {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [years, setYears] = useState("");
  const [investmentValue, setInvestmentValue] = useState(null);

  const calculateInvestment = () => {
    const initial = parseFloat(initialInvestment);
    const monthly = parseFloat(monthlyContribution);
    const rate = parseFloat(interestRate) / 100;
    const time = parseFloat(years);

    if (!isNaN(initial) && !isNaN(monthly) && !isNaN(rate) && !isNaN(time)) {
      let futureValue = initial * Math.pow(1 + rate / 12, 12 * time);
      for (let i = 1; i <= time * 12; i++) {
        futureValue += monthly * Math.pow(1 + rate / 12, 12 * time - i);
      }
      setInvestmentValue(futureValue.toFixed(2));
    }
  };

  return (
    <div className="mt-4">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Initial Investment ($)
        </label>
        <input
          type="number"
          value={initialInvestment}
          onChange={(e) => setInitialInvestment(e.target.value)}
          className="w-full px-4 text-white py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter initial investment"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Monthly Contribution ($)
        </label>
        <input
          type="number"
          value={monthlyContribution}
          onChange={(e) => setMonthlyContribution(e.target.value)}
          className="w-full px-4 text-white py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter monthly contribution"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Annual Interest Rate (%)
        </label>
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          className="w-full px-4 text-white py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter annual interest rate"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Number of Years
        </label>
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          className="w-full px-4 text-white py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter number of years"
        />
      </div>
      <button
        onClick={calculateInvestment}
        className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Calculate Investment Value
      </button>
      {investmentValue !== null && (
        <p className="mt-3 text-lg font-bold text-indigo-700">
          Your investment will be worth ₹{investmentValue} after {years} years.
        </p>
      )}
    </div>
  );
};

// Sample steps for the financial guide
const financeSteps = [
  {
    id: 1,
    title: "Step 1: Budgeting Basics",
    description:
      "Budgeting is the foundation of financial planning. Learn how to track your income and expenses to create a budget that works for you.",
    tool: (
      <div>
        <h3 className="text-lg font-semibold">Budget Calculator</h3>
        <BudgetCalculator />
      </div>
    ),
  },
  {
    id: 2,
    title: "Step 2: Building an Emergency Fund",
    description:
      "An emergency fund is essential for covering unexpected expenses. Learn how much you need to save and how to build it over time.",
    tool: (
      <div>
        <h3 className="text-lg font-semibold">Emergency Fund Calculator</h3>
        <EmergencyFundCalculator />
      </div>
    ),
  },
  {
    id: 3,
    title: "Step 3: Debt Repayment Strategies",
    description:
      "Managing and paying off debt is crucial to financial freedom. Learn the best strategies to pay off debt, such as the snowball and avalanche methods.",
    tool: (
      <div>
        <h3 className="text-lg font-semibold">Debt Tracker</h3>
        <DebtTracker />
      </div>
    ),
  },
  {
    id: 4,
    title: "Step 4: Investing for Beginners",
    description:
      "Investing helps you grow wealth over time. Learn the basics of stocks, bonds, and index funds, and start investing for your future.",
    tool: (
      <div>
        <h3 className="text-lg font-semibold">Investment Simulator</h3>
        <InvestmentSimulator />
      </div>
    ),
  },
];

const FinanceLearningGuide = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < financeSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">
          Learn Finance: Step by Step
        </h1>
        <div>
          <h2 className="text-xl font-bold text-indigo-600 mb-2">
            {financeSteps[currentStep].title}
          </h2>
          <p className="text-gray-600 mb-4">
            {financeSteps[currentStep].description}
          </p>
          {financeSteps[currentStep].tool}

          <div className="flex justify-between mt-6">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`bg-indigo-600 text-white py-2 px-4 rounded-lg ₹{
                currentStep === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-indigo-700"
              }`}
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              disabled={currentStep === financeSteps.length - 1}
              className={`bg-indigo-600 text-white py-2 px-4 rounded-lg ₹{
                currentStep === financeSteps.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-indigo-700"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example of an interactive budget calculator

export default FinanceLearningGuide;
