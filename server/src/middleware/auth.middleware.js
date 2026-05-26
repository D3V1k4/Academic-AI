const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const jwtConfig = require("../config/jwt");

module.exports = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied: No token provided"
      });
    }

    try {
      const decoded = jwt.verify(token, jwtConfig.SECRET);
      
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User no longer exists"
        });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Access Denied: Invalid or expired token"
      });
    }
  } catch (error) {
    next(error);
  }
};
