const express = require("express");
const { getNotification } = require("../controllers/notification");

const router = express.Router();

router.get("/get/notify/:userId", getNotification);

module.exports = router;
