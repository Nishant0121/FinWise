import { useState } from "react";
import { FaJetFighterUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
    <header className="bg-white shadow-md relative z-20">
      <div className="container mx-auto flex justify-between items-center py-2 px-2 md:px-4">
        {/* Logo */}
        <div className="flex items-center">
          <FaJetFighterUp className="h-6 w-6 mr-2" />
          <span className="text-xl font-bold">FinWise</span>
        </div>

        {/* Navigation Links for Desktop */}
        <nav className="hidden md:flex space-x-6">
          <Link
            to="/home"
            className="text-gray-600 focus:text-blue-500 hover:text-blue-500"
          >
            Features
          </Link>
          <Link
            to="/debt"
            className="text-gray-600 focus:text-blue-500 hover:text-blue-500"
          >
            Debt
          </Link>
          <Link
            to="/budget"
            className="text-gray-600 focus:text-blue-500 hover:text-blue-500"
          >
            Budget
          </Link>
          <Link
            to="/profile"
            className="text-gray-600 focus:text-blue-500 hover:text-blue-500"
          >
            Profile
          </Link>
          <Link
            to="/education"
            className="text-gray-600 focus:text-blue-500 hover:text-blue-500"
          >
            Education
          </Link>
          <Link
            to="/analytics"
            className="text-gray-600 focus:text-blue-500 hover:text-blue-500"
          >
            Analytics
          </Link>
        </nav>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={toggleMenu}
            className="text-gray-500 hover:text-gray-600 focus:text-blue-500 focus:outline-none"
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
      {isMenuOpen && (
        <div className="absolute top-[45px] left-0 w-full bg-white shadow-md z-50">
          <nav className="flex flex-col items-center py-4 space-y-4">
            <Link
              to="/home"
              className="text-gray-600 focus:text-blue-500 hover:text-blue-500"
              onClick={toggleMenu} // Close menu on link click
            >
              Features
            </Link>
            <Link
              to="/debt"
              className="text-gray-600 focus:text-blue-500 hover:text-blue-500"
              onClick={toggleMenu}
            >
              Debt
            </Link>
            <Link
              to="/budget"
              className="text-gray-600 focus:text-blue-500 hover:text-blue-500"
              onClick={toggleMenu}
            >
              Budget
            </Link>
            <Link
              to="/profile"
              className="text-gray-600 focus:text-blue-500 hover:text-blue-500"
              onClick={toggleMenu}
            >
              Profile
            </Link>
            <Link
              to="/education"
              className="text-gray-600 focus:text-blue-500 hover:text-blue-500"
              onClick={toggleMenu}
            >
              Education
            </Link>
            <Link
              to="/analytics"
              className="text-gray-600 focus:text-blue-500 hover:text-blue-500"
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
        </div>
      )}
    </header>
  );
}
