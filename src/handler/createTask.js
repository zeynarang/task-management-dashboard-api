import express from "express";
import pool from "../client/client.js";
import { ErrorMessage } from "../shared/errorMessages.js";

const createTask = async (req, res) => {
  const { name, details, status, priority, projectDetails } = req.body;
  const { project_id } = projectDetails;
  try {
    const taskAlreadyExists = await pool.query(
      "select task_id from tasks where name = $1 and project_id = $2",
      [name, project_id]
    );
    console.log("taskAlreadyExists", taskAlreadyExists.rowCount);
    if (taskAlreadyExists.rowCount > 0) {
      throw new Error(ErrorMessage.taskAlreadyExists);
    }

    const newTask = await pool.query(
      "INSERT INTO tasks (name, details, status,  priority, project_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, details, status, priority, project_id]
    );
    res.status(201).json(newTask.rows[0]);
  } catch (err) {
    const errorMsg = err.message || ErrorMessage.internalServerError;
    res.status(500).send({ errorMsg });
  }
};

export default createTask;
