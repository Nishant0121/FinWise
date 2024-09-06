const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    income: {
      type: Number,
      required: true,
      default: 0,
    },
    expenses: {
      type: Number,
      required: true,
      default: 0,
    },
    debts: {
      type: Number,
      required: true,
      default: 0,
    },
    savings: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Creating the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
