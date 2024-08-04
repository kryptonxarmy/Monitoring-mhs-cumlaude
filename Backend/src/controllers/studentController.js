const studentServices = require("../services/studentService");

const registerStudent = async (req, res) => {
  const { student_id, name, email, doswal, dosbing, username } = req.body;

  try {
    const data = await studentServices.registerStudent({ student_id, name, email, doswal, dosbing, username });
    res.status(200).send(data);
  } catch (error) {
    res.status(401).send("error : " + error.message);
  }
};

const getStudentData = async (req, res) => {
  const username = req.user;
  try {
    const data = await studentServices.getStudentData(username);
    res.status(200).send(data);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send("Internal server error"); // Generic error message for the user
  }
};

module.exports = {
  registerStudent,
  getStudentData,
};
