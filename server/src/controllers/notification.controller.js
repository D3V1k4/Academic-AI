const notificationService = require("../services/notification.service");

const getNotifications = async (req, res, next) => {
  try {
    const notifications = await notificationService.getUserNotifications(req.user._id);
    res.status(200).json({
      success: true,
      data: notifications
    });
  } catch (error) {
    next(error);
  }
};

const markAsRead = async (req, res, next) => {
  try {
    const { notificationId } = req.params;
    const notification = await notificationService.markNotificationAsRead(notificationId);
    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      data: notification
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotifications,
  markAsRead
};
