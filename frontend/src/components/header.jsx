import { useState } from "react";
import { FaJetFighterUp } from "react-icons/fa6";
import { useAppContext } from "../context";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAppContext();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md relative z-20">
      <div className="container mx-auto flex justify-between items-center py-2 px-2 md:px-4">
        {/* Logo */}
        <div className="flex items-center">
          <FaJetFighterUp className="h-6 w-6 mr-2" />
          <span className="text-xl font-bold">FinWise</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-blue-500 ">
            Features
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-500">
            Pricing
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-500">
            About Us
          </a>
          <Link to={"/profile"} className="text-gray-600 hover:text-blue-500">
            Profile
          </Link>
          <a href="#" className="text-gray-600 hover:text-blue-500">
            Contact
          </a>
        </nav>

        {/* Get Started Button */}
        <a
          href="#"
          className="hidden md:block bg-cyan-500 text-white py-2 px-2 rounded-md hover:bg-cyan-600"
        >
          Get Started
        </a>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={toggleMenu}
            className="text-gray-500 hover:text-gray-600 focus:outline-none"
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
            <a href="#" className="text-blue-500 border-blue-500 pb-1">
              Features
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500">
              Pricing
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500">
              About Us
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500">
              Blog
            </a>
            <Link to={"/profile"} className="text-gray-600 hover:text-blue-500">
              Profile
            </Link>
            <a
              href="#"
              className="bg-cyan-500 text-white py-2 px-2 rounded-md hover:bg-cyan-600"
            >
              Get Started
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
