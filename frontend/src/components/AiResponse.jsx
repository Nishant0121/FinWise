// Assuming this code is in a separate file (e.g., run.js)

import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBxm7zzP55l_Aoqgb3I7LF-YJDURFApzrw"; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const run = async function (p) {
  try {
    const refinedPrompt = p;
    const result = await model.generateContent(refinedPrompt);
    const response = result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error in run function:", error);
    // Handle the error appropriately (e.g., return a default value or show an error message)
    return "An error occurred while generating content.";
  }
};

export default run;
