import { BadgeIndianRupee } from "lucide-react";
import { useState } from "react";
import { FaJetFighterUp } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="bg-indigo-500 top-0 left-0 right-0 sticky z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-2 px-2 md:px-4">
        {/* Logo */}
        <div className="flex items-center">
          <BadgeIndianRupee className="h-8 w-8 text-black" strokeWidth={2} />
          <span className="text-xl font-bold text-white">FinWise</span>
        </div>

        {/* Navigation Links for Desktop */}
        <nav className="hidden md:flex space-x-6">
          <Link
            to="/home"
            className="text-white focus:text-blue-100 hover:text-blue-100"
          >
            Features
          </Link>
          <Link
            to="/debt"
            className="text-white focus:text-blue-100 hover:text-blue-100"
          >
            Debt
          </Link>
          <Link
            to="/budget"
            className="text-white focus:text-blue-100 hover:text-blue-100"
          >
            Budget
          </Link>
          <Link
            to="/profile"
            className="text-white focus:text-blue-100 hover:text-blue-100"
          >
            Profile
          </Link>
          <Link
            to="/education"
            className="text-white focus:text-blue-100 hover:text-blue-100"
          >
            Education
          </Link>
          <Link
            to="/analytics"
            className="text-white focus:text-blue-100 hover:text-blue-100"
          >
            Analytics
          </Link>
        </nav>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={toggleMenu}
            className="text-gray-200 hover:text-white focus:text-blue-100 focus:outline-none"
            aria-label="toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute top-[45px] left-0 w-full bg-indigo-500 shadow-md z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center py-4 space-y-4">
              <Link
                to="/home"
                className="text-white focus:text-blue-100 hover:text-blue-100"
                onClick={toggleMenu} // Close menu on link click
              >
                Features
              </Link>
              <Link
                to="/debt"
                className="text-white focus:text-blue-100 hover:text-blue-100"
                onClick={toggleMenu}
              >
                Debt
              </Link>
              <Link
                to="/budget"
                className="text-white focus:text-blue-100 hover:text-blue-100"
                onClick={toggleMenu}
              >
                Budget
              </Link>
              <Link
                to="/profile"
                className="text-white focus:text-blue-100 hover:text-blue-100"
                onClick={toggleMenu}
              >
                Profile
              </Link>
              <Link
                to="/education"
                className="text-white focus:text-blue-100 hover:text-blue-100"
                onClick={toggleMenu}
              >
                Education
              </Link>
              <Link
                to="/analytics"
                className="text-white focus:text-blue-100 hover:text-blue-100"
                onClick={toggleMenu}
              >
                Analytics
              </Link>
              <button
                onClick={handleLogout}
                className="bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600"
              >
                Logout
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
