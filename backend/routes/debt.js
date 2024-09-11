const express = require("express");
const { addDebt, getDebts } = require("../controllers/debt");

const router = express.Router();

router.post("/add/debt", addDebt);
router.post("/get/debt", getDebts);

module.exports = router;
