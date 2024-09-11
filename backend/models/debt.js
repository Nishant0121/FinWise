const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the debt schema
const DebtSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  debts: [
    {
      name: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
        min: 0,
      },
      dueDate: {
        type: Date,
        required: true,
      },
    },
  ],
});

// Create the Debt model
const Debt = mongoose.model("Debt", DebtSchema);

module.exports = Debt;
