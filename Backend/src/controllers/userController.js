const userServices = require("../services/userService");
const jwtUtils = require("../utils/jwt");

const createUser = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ error: "Username, password, and role are required" });
  }

  try {
    const user = await userServices.createUser({ username, password, role });
    res.status(200).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const user = await userServices.loginUser({ username, password });
    const token = jwtUtils.generateToken(user);
    await jwtUtils.saveToken(user.user_id, token);

    res.status(200).json({
      message: "Login successful",
      data: user,
      access_token: token,
    });
  } catch (error) {
    res.status(401).json({ message: "user not found" });
  }
};

const getAllUser = async (req, res) => {
  try {
    const data = await userServices.getAllUser();
    res.status(200).json({
      message: "Successfully retrieved all user data",
      data,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const getUserData = async (req, res) => {
  const username = req.user;
  try {
    const data = await userServices.getUserData(username);
    res.status(200).send(data);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send("Internal server error"); // Generic error message for the user
  }
};

module.exports = {
  createUser,
  loginUser,
  getAllUser,
  getUserData,
};
