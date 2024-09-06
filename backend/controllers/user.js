const User = require("../models/user.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // If email is unique, create a new user with the hashed password
    const user = new User({
      ...req.body,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the stored password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET, // Use a secret from environment variables
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Convert user to a plain object and remove the password
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    // Send the token and user data (without the password)
    res
      .status(200)
      .json({ message: "Login successful", token, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserFields = async (req, res) => {
  try {
    // Define the allowed fields for update
    const { income, savings, debts, expenses } = req.body;

    // Find and update the user by ID
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { income, savings, debts, expenses },
      { new: true, runValidators: true } // Return the updated user and run validators
    );

    // Check if user was found and updated
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the updated user
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user by ID

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
