import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import createProject from "./handler/createProject.js";
import createTask from "./handler/createTask.js";
import getProjects from "./handler/getProjects.js";
import getProject from "./handler/getProject.js";
import getTasks from "./handler/getTask.js";
import getUserDetails from "./handler/getUser.js";
import loginRouter from "./handler/loginUser.js";
import registerUser from "./handler/registerUser.js";
import createSection from "./handler/createSection.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use the routers
app.post("/api/auth/signup", registerUser);
app.get("/api/auth/login", loginRouter);
app.get("/api/user/:userId", getUserDetails);
app.get("/api/projects", getProjects);
app.get("/api/project/:projectId", getProject);
app.post("/api/projects", createProject);
app.get("/api/tasks", getTasks);
app.post("/api/tasks", createTask);
app.post("/sections", createSection);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
