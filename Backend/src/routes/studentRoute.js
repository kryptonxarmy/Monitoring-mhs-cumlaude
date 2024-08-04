const express = require("express");
const studentController = require("../controllers/studentController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", studentController.registerStudent);
router.get("/get-student-data", authMiddleware, studentController.getStudentData);

module.exports = router;
