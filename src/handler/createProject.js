import express from "express";
import pool from "../client/client.js";

const createProjectRouter = async (req, res) => {
  const {
    project_name,
    project_details,
    project_status,
    start_date,
    end_date,
  } = req.body;

  try {
    const newProject = await pool.query(
      "INSERT INTO projects (project_name, project_details, project_status, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [project_name, project_details, project_status, start_date, end_date]
    );
    res.status(201).json(newProject.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export default createProjectRouter;
