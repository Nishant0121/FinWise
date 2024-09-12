/* eslint-disable react/prop-types */
import {
  ChevronRight,
  BarChart2,
  PiggyBank,
  TrendingUp,
  BookOpen,
  Users,
  Bell,
  LineChart,
  Brain,
  BadgeIndianRupee,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 bg-slate-50 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <BadgeIndianRupee className="h-8 w-8 text-black" strokeWidth={2} />
          <span className="ml-2 text-2xl text-black font-bold">FinWise</span>
          <span className="sr-only">FinTech Pro</span>
        </Link>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-violet-700 to-blue-500">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Master Your Finances with FinTech Pro
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-900 md:text-xl">
                  Empower your financial journey with cutting-edge tools and
                  personalized insights.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  to={"/login"}
                  className="bg-white px-3 py-2 rounded-md text-blue-600 hover:bg-gray-100"
                >
                  Get Started
                </Link>
                <button className="bg-white px-3 py-2 rounded-md text-blue-600 hover:bg-gray-100">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-black tracking-tighter sm:text-5xl text-center mb-12">
              Our Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <FeatureCard
                icon={<BarChart2 className="h-10 w-10 mb-4 text-blue-600" />}
                title="Financial Health Assessment"
                description="Get a comprehensive view of your financial well-being with our advanced assessment tools."
              />
              <FeatureCard
                icon={<PiggyBank className="h-10 w-10 mb-4 text-blue-600" />}
                title="Budgeting Tools"
                description="Create and manage budgets effortlessly to keep your spending in check and achieve your goals."
              />
              <FeatureCard
                icon={<TrendingUp className="h-10 w-10 mb-4 text-blue-600" />}
                title="Savings & Investment Tracker"
                description="Monitor your savings and investments in real-time, making informed decisions for your future."
              />
              <FeatureCard
                icon={<BookOpen className="h-10 w-10 mb-4 text-blue-600" />}
                title="Educational Resources"
                description="Access a wealth of financial knowledge to improve your money management skills."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 mb-4 text-blue-600" />}
                title="Community Features"
                description="Connect with like-minded individuals, share experiences, and learn from others' financial journeys."
              />
              <FeatureCard
                icon={<Bell className="h-10 w-10 mb-4 text-blue-600" />}
                title="Notifications & Alerts"
                description="Stay on top of your finances with timely notifications and personalized alerts."
              />
              <FeatureCard
                icon={<LineChart className="h-10 w-10 mb-4 text-blue-600" />}
                title="Advanced Analytics"
                description="Gain deep insights into your financial patterns with our powerful analytics tools."
              />
              <FeatureCard
                icon={<Brain className="h-10 w-10 mb-4 text-blue-600" />}
                title="AI & Automation"
                description="Leverage AI-powered recommendations and automate your financial tasks for maximum efficiency."
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-violet-700 to-blue-500">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Ready to Transform Your Finances?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-900 md:text-xl">
                  Join thousands of users who have already taken control of
                  their financial future.
                </p>
              </div>
              <div className="w-full flex items-center justify-center max-w-sm space-y-2">
                <Link
                  to={"/login"}
                  className="bg-white px-3 py-2 flex items-center justify-center rounded-md text-blue-600 hover:bg-gray-100"
                >
                  Sign Up Now
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div>
      <header>
        <title className="flex flex-col text-blue-600 items-center text-center">
          {icon}
          {title}
        </title>
      </header>
      <p>
        <p className="text-center text-gray-700">{description}</p>
      </p>
    </div>
  );
};
