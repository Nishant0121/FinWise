const express = require("express");
const axios = require("axios");
const router = express.Router();

// Function to get the date in 'YYYY-MM-DD' format
function formatDate(date) {
  return date.toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'
}

// Function to get the date two days back
function getTwoDaysBackDate() {
  const today = new Date();
  const twoDaysBack = new Date(today);
  twoDaysBack.setDate(today.getDate() - 2);
  return formatDate(twoDaysBack);
}

router.get("/get/news", async (req, res) => {
  try {
    const twoDaysBackDate = getTwoDaysBackDate();
    const todayDate = formatDate(new Date()); // Get today's date

    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=finance AND 'money management'&from=${twoDaysBackDate}&to=${todayDate}&sortBy=popularity&apiKey=423c372d505f45fb8b9f38426610d367`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
