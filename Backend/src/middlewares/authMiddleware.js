const jwtUtils = require("../utils/jwt");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missinggg" });
  }

  const token = authHeader.split(" ")[1]; // Mengambil token dari header Authorization

  try {
    const decoded = await jwtUtils.verifyToken(token);
    req.user = decoded; // Menyimpan informasi pengguna yang terverifikasi di req.user
    next();
  } catch (error) {
    res.status(404).json({ message: "Invalid or expired tokennn" });
  }
};

module.exports = authMiddleware;
