const express = require("express");
const { setBudget, getBudget } = require("../controllers/budget");

const router = express.Router();

router.post("/create/budget", setBudget);
router.post("/get/budget", getBudget);

module.exports = router;
