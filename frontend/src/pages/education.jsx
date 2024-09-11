import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import { useEffect, useState } from "react";
import FinanceLearningGuide from "../components/financeLearning";

export default function Education() {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const articlesPerPage = 6; // Define the number of articles per page

  const [response, setResponse] = useState("");

  const API_KEY = "AIzaSyBxm7zzP55l_Aoqgb3I7LF-YJDURFApzrw";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const run = async function (p) {
    const refinedPrompt = p;
    const result = await model.generateContent(refinedPrompt);
    const response = result.response;
    const text = response.text();
    setResponse(text);
  };

  useEffect(() => {
    try {
      run(
        "As a financial planning expert, please provide personalized educational suggestions to help users achieve their financial goals. Consider the following areas when making suggestions: budgeting, saving, investing, debt management, retirement planning, and emergency fund building. Ensure the recommendations are tailored to their current financial situation, risk tolerance, and long-term objectives. Offer actionable strategies, resources (books, courses, online tools), and tips on improving financial literacy, reducing expenses, maximizing savings, and growing wealth. Additionally, suggest any lifestyle changes or mindset shifts necessary for achieving financial independence and security.response should be of 100 words and pointwise"
      );
      axios.get("/api/news/get/news").then((response) => {
        setNews(response.data.articles);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Calculate the total number of pages
  const totalPages = Math.ceil(news.length / articlesPerPage);

  // Get the articles for the current page
  const currentArticles = news.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  // Function to go to the next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!news || !response) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <pre className=" overflow-x-auto max-w-[90vw] mx-auto font-sans bg-blue-200 p-3 rounded-lg ">
        {response ? response : "Loading ?"}
      </pre>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Latest Finance News
        </h1>

        {news && news.length > 0 ? (
          <>
            {/* Display articles for the current page */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentArticles.map((article, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105"
                >
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">
                      {article.title}
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">
                      {article.description?.slice(0, 100)}...
                    </p>
                    <div className="flex justify-between items-center">
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 font-semibold"
                      >
                        Read More
                      </a>
                      <p className="text-xs text-gray-400">
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination controls */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-700"
                }`}
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-700"
                }`}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Loading news...</p>
        )}
      </div>

      <FinanceLearningGuide />
    </div>
  );
}
