const cron = require("node-cron");
const Notification = require("../models/notification");

const calculateFinancialHealth = async (userId) => {
  const user = await User.findById(userId);
  const financialHealthScore =
    (user.savings / (user.expenses + user.debts)) * 100; // Simple example formula
  return financialHealthScore;
};

const sendFinancialHealthNotification = async (userId) => {
  const score = await calculateFinancialHealth(userId);
  let message = `Your current financial health score is ${score}.`;

  const notification = new Notification({
    userId,
    message,
    type: "financial_health",
  });

  await notification.save();
};

cron.schedule("0 0 * * *", async () => {
  const users = await User.find(); // Get all users

  for (let user of users) {
    await sendFinancialHealthNotification(user._id);
    await sendPaymentReminders(user._id);
    await sendSavingsGoalNotification(user._id);
  }
});

exports.getNotification = async (req, res) => {
  const userId = req.params.userId;
  const notifications = await Notification.find({ userId: userId });
  res.json(notifications);
};
