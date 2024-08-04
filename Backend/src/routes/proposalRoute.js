const proposalController = require("../controllers/proposalController");
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create-proposal", authMiddleware, proposalController.createProposal);
router.get("/get-proposals-by-student", authMiddleware, proposalController.getLatestProposalsByStudent);
router.post("/get-proposals-by-studentId", proposalController.getLatestProposalsByStudentId);
router.get("/get-student-approvals", proposalController.getStudentApprovals);

module.exports = router;