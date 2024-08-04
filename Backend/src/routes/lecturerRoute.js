const express = require("express");
const lecturerController = require("../controllers/lecturerController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", authMiddleware, lecturerController.registerLecturer);
router.post("/get-lecturer-data", authMiddleware, lecturerController.getLecturerData);

module.exports = router;
