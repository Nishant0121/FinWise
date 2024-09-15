import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 fixed w-full z-20 top-0 left-0 border-b dark:border-gray-600">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <a href="#" className="flex items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="Logo"
            className="h-8 mr-3"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            FinWise
          </span>
        </a>
        <div className="flex items-center lg:order-2">
          <a
            href="#"
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-0 lg:mr-3 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          >
            Get Started
          </a>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
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
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } items-center justify-between w-full lg:flex lg:w-auto lg:order-1`}
          id="mobile-menu"
        >
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <a
                href="#"
                className="block py-2 pr-4 pl-3 text-blue-700 rounded lg:bg-transparent lg:text-blue-700 lg:p-0 dark:text-white"
                aria-current="page"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pr-4 pl-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pr-4 pl-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pr-4 pl-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pr-4 pl-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
