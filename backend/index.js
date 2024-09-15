const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoute = require("./routes/user.js");
const budgetRoute = require("./routes/budget.js");
const debtRoute = require("./routes/debt.js");
const newsRoute = require("./routes/news.js");
const notifyRoute = require("./routes/notification.js");

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI; // MongoDB connection string from .env

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "https://fin-wise-bice.vercel.app", // Replace with your frontend's actual origin
  })
);

// Connect to MongoDB using Mongoose
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

// Simple route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRoute);

app.use("/api/budget", budgetRoute);

app.use("/api/debt", debtRoute);
app.use("/api/news", newsRoute);
app.use("/api/notify", notifyRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
