const ipRequestCounts = new Map();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100; // max requests per window

setInterval(() => {
  ipRequestCounts.clear();
}, WINDOW_MS);

module.exports = (req, res, next) => {
  const ip = req.ip || req.headers["x-forwarded-for"] || "unknown-ip";
  const currentCount = ipRequestCounts.get(ip) || 0;

  if (currentCount >= MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      message: "Too many requests from this IP, please try again after 15 minutes."
    });
  }

  ipRequestCounts.set(ip, currentCount + 1);
  next();
};
