import background from "../assets/fintech_bg.jpg";
import { useAppContext } from "../context";

export default function Home() {
  const { user } = useAppContext();

  console.log(user);

  return (
    <div className="relative min-h-screen bg-black flex flex-col">
      {/* Header Section */}

      {/* Hero Section */}
      <div className="relative flex items-center justify-center min-h-screen bg-opacity-80">
        <img
          src={background}
          alt="FinTech Background"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            Manage Your Finances Smartly with FinWise
          </h1>
          <p className="text-lg mb-6">
            Track your expenses, manage budgets, and achieve your financial
            goals.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white text-black">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* User Management */}
            <div className="p-6 bg-blue-500 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">User Management</h3>
              <p className="text-gray-100 mb-4">
                Register or log in securely. Manage your profile, set up your
                financial information, and use multi-factor authentication for
                extra security.
              </p>
              <ul className="list-disc list-inside text-gray-100">
                <li>User Registration & Login</li>
                <li>Profile Management</li>
                <li>Multi-factor Authentication</li>
                <li>Password Recovery</li>
              </ul>
            </div>

            {/* Financial Health Assessment */}
            <div className="p-6 bg-blue-500 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">
                Financial Health Assessment
              </h3>
              <p className="text-gray-100 mb-4">
                Analyze your income, expenses, debts, and savings to get a
                financial health score. Receive personalized recommendations to
                improve your financial well-being.
              </p>
              <ul className="list-disc list-inside text-gray-100">
                <li>Income & Expense Tracking</li>
                <li>Financial Health Score</li>
                <li>Customized Recommendations</li>
              </ul>
            </div>

            {/* Budgeting Tools */}
            <div className="p-6 bg-blue-500 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Budgeting Tools</h3>
              <p className="text-gray-100 mb-4">
                Create and track budgets for all your spending categories. Set
                limits, monitor expenses, and receive alerts for overspending.
              </p>
              <ul className="list-disc list-inside text-gray-100">
                <li>Budget Creation</li>
                <li>Spending Alerts</li>
                <li>Recurring Expense Tracking</li>
                <li>Visualization Tools</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Debt Management */}
      <section id="debt-management" className="py-16 bg-white text-black">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Debt Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-blue-500 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Debt Overview</h3>
              <p className="text-gray-100">
                Get a summary of all your debts including credit cards and
                loans, and track your repayment progress over time.
              </p>
            </div>
            <div className="p-6 bg-blue-500 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">
                Repayment Strategies
              </h3>
              <p className="text-gray-100">
                Receive personalized strategies for managing debt, such as
                consolidation or the snowball method, to pay off your debts
                faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Resources */}
      <section id="education" className="py-16 bg-white text-black">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Educational Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-blue-500 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Blog & Articles</h3>
              <p className="text-gray-100">
                Learn the fundamentals of personal finance with our blogs,
                covering topics like budgeting, investing, and tax planning.
              </p>
            </div>
            <div className="p-6 bg-blue-500 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">
                Interactive Tutorials
              </h3>
              <p className="text-gray-100">
                Step-by-step guides and interactive tools to help you navigate
                your financial journey with ease.
              </p>
            </div>
            <div className="p-6 bg-blue-500 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">
                Webinars & Workshops
              </h3>
              <p className="text-gray-100">
                Join our webinars and workshops on various financial topics to
                enhance your financial literacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
}
