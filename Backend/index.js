const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(
  cors()
);
app.use(express.json());

const userRoutes = require("./src/routes/userRoute");
const lecturerRoutes = require("./src/routes/lecturerRoute");
const studentRoutes = require("./src/routes/studentRoute");
const proposalRoutes = require("./src/routes/proposalRoute");

app.use("/api/users", userRoutes);
app.use("/api/lecturers", lecturerRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/proposals", proposalRoutes);

// app.use('', (req, res) => {
//   res.send('BACKEND SISTEM INFORMASI MONITORING MAHASISWA CUMLADE')
// })

app.listen(PORT, () => {
  console.log("server running on " + PORT);
});
