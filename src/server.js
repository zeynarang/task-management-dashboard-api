import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import registerUser from "./handler/registerUser.js";
import loginRouter from "./handler/loginUser.js";
import createProjectRouter from "./handler/createProject.js";
import getProjectsRouter from "./handler/getProject.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use the routers
app.post("/api/auth/signup", registerUser);
app.get("/api/auth/login", loginRouter);
app.post("/api/projects", createProjectRouter);
app.get("/api/projects", getProjectsRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
