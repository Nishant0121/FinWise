/* eslint-disable react/prop-types */
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect, useState } from "react";

export default function AiResponse({ prompt }) {
  const Aiprompt = prompt;
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
    run(Aiprompt);
  }, []);

  return response;
}
