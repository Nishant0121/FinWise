const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const budgetSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to a User model (assuming you have a User model)
      required: true,
    },
    income: {
      type: Number,
      required: true,
      default: 0,
    },
    food: {
      type: Number,
      required: true,
      default: 0,
    },
    rent: {
      type: Number,
      required: true,
      default: 0,
    },
    entertainment: {
      type: Number,
      required: true,
      default: 0,
    },
    utilities: {
      type: Number,
      required: true,
      default: 0,
    },
    transportation: {
      type: Number,
      required: true,
      default: 0,
    },
    savings: {
      type: Number,
      required: true,
      default: 0,
    },
    miscellaneous: {
      type: Number,
      required: true,
      default: 0,
    },
    totalExpenses: {
      type: Number,
      default: function () {
        return (
          this.food +
          this.rent +
          this.entertainment +
          this.utilities +
          this.transportation +
          this.miscellaneous
        );
      },
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
