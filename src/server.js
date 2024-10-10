import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import createProject from "./handler/project/createProject.js";

import createTask from "./handler/task/createTask.js";
import getTasks from "./handler/task/getTasks.js";

import getProjects from "./handler/project/getProjects.js";
import getProject from "./handler/project/getProject.js";

import createSection from "./handler/section/createSection.js";

import getUserDetails from "./handler/user/getUser.js";
import loginRouter from "./handler/user/loginUser.js";
import registerUser from "./handler/user/registerUser.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use the routers

// AUTH //
app.get("/api/auth/login", loginRouter);
app.post("/api/auth/signup", registerUser);

// USERS //
app.get("/api/user/:userId", getUserDetails);

// PROJECT //
app.get("/api/projects", getProjects);
app.get("/api/project/:projectId", getProject);
app.post("/api/projects", createProject);

// TASKS //
app.get("/api/tasks", getTasks);
app.post("/api/tasks", createTask);

// SECTIONS //
app.post("/api/project/:projectId/sections", createSection);
// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
