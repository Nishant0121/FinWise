const Debt = require("../models/debt");

exports.addDebt = async (req, res) => {
  const { userId, name, amount, dueDate } = req.body;

  // Validate input
  if (!userId || !name || !amount || !dueDate) {
    return res.status(400).json({ message: "Invalid debt data" });
  }

  try {
    // Find the user's debt record
    let userDebt = await Debt.findOne({ userId });

    // If no record exists for the user, create a new one
    if (!userDebt) {
      userDebt = new Debt({
        userId,
        debts: [{ name, amount, dueDate }],
      });
    } else {
      // If a record exists, append the new debt to the debts array
      userDebt.debts.push({ name, amount, dueDate });
    }

    // Save the updated or new record
    await userDebt.save();
    res.status(201).json(userDebt);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.getDebts = async (req, res) => {
  const { userId } = req.body;
  try {
    // Fetch all debts
    const debts = await Debt.find({ userId }).populate("userId"); // Populate user data if needed
    res.status(200).json(debts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
