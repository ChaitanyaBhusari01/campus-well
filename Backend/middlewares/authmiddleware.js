const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }
    const token = authHeader.split(" ")[1];

    const decoded = JWT.verify(token, JWT_SECRET);

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
      refId: decoded.refId,
    };

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = { authMiddleware };
