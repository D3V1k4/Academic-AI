const Notification = require("../models/Notification.model");

const getUserNotifications = async (userId) => {
  return Notification.find({ userId }).sort({ createdAt: -1 });
};

const markNotificationAsRead = async (notificationId) => {
  return Notification.findByIdAndUpdate(
    notificationId,
    { read: true },
    { new: true }
  );
};

const createNotification = async (userId, title, message, type = "system") => {
  return Notification.create({
    userId,
    title,
    message,
    type
  });
};

module.exports = {
  getUserNotifications,
  markNotificationAsRead,
  createNotification
};
