const proposalService = require("../services/proposalService");

const createProposal = async (req, res) => {
  const username = req.user.username;
  const { title, description } = req.body;
  try {
    const proposal = await proposalService.createProposal(title, description, username);
    res.status(200).json(proposal);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};

const getLatestProposalsByStudent = async (req, res) => {
  const username = req.user.username;
  try {
    const proposals = await proposalService.getLatestProposalsByStudent(username);
    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};

const getLatestProposalsByStudentId = async (req, res) => {
  const { student_id } = req.body;

  if (!student_id) {
    return res.status(400).json({ message: "student_id is required" });
  }

  try {
    const data = await proposalService.getLatestProposalsByStudentId(student_id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};


const getStudentApprovals = async (req, res) => {
  try {
    const proposals = await proposalService.getStudentApprovals();
    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};

module.exports = { createProposal, getLatestProposalsByStudent, getLatestProposalsByStudentId, getStudentApprovals };
