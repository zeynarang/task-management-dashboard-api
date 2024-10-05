import express from "express";
import pool from "../client/client.js";
import { ErrorMessage } from "../shared/errorMessages.js";

const createProjectRouter = async (req, res) => {
  const {
    project_name,
    project_details,
    project_status,
    start_date,
    end_date,
  } = req.body;

  try {
    const projectAlreadyExists = await pool.query(
      "select project_id from projects where project_name = $1 and user_id = $2",
      [project_name, 1]
    );
    console.log("projectAlreadyExists", projectAlreadyExists.rowCount);
    if (projectAlreadyExists.rowCount > 0) {
      throw new Error(ErrorMessage.projectAlreadyExists);
    }

    const newProject = await pool.query(
      "INSERT INTO projects (project_name, project_details, project_status, start_date, end_date, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [project_name, project_details, project_status, start_date, end_date, 1]
    );
    res.status(201).json(newProject.rows[0]);
  } catch (err) {
    const errorMsg = err.message || ErrorMessage.internalServerError;
    res.status(500).send({ errorMsg });
  }
};

export default createProjectRouter;
