const express = require("express");
const userController = require("../controllers/user.js");

const router = express.Router();

// Route for creating a user
router.post("/register", userController.createUser);

// Route for getting all users
router.post("/login", userController.loginUser);

// Route for getting a user by ID
router.get("/users/:id", userController.getUserById);

// Route for updating a user by ID
router.patch("/update/:id", userController.updateUserFields);

// Route for deleting a user by ID
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
