const Budget = require("../models/budget");

exports.setBudget = async (req, res) => {
  const budget = req.body;
  const newBudget = new Budget(budget);
  try {
    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.getBudget = async (req, res) => {
  const { userId } = req.body; // Extract the userId from request parameters
  try {
    const budget = await Budget.find({ userId: userId }); // Query the budget by userId
    if (!budget.length) {
      return res
        .status(404)
        .json({ message: "Budget not found for this user." });
    }
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
