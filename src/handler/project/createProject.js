import express from "express";
import pool from "../../client/client.js";
import { ErrorMessage } from "../../shared/errorMessages.js";

const createProject = async (req, res) => {
  const {
    project_name,
    project_details,
    project_status,
    start_date,
    end_date,
    userId,
  } = req.body;

  await pool.query("BEGIN");
  try {
    const projectAlreadyExists = await pool.query(
      "select project_id from projects where project_name = $1 and user_id = $2",
      [project_name, userId]
    );
    console.log("projectAlreadyExists", projectAlreadyExists.rowCount);
    if (projectAlreadyExists.rowCount > 0) {
      throw new Error(ErrorMessage.projectAlreadyExists);
    }

    const newProject = await pool.query(
      "INSERT INTO projects (project_name, project_details, project_status, start_date, end_date, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        project_name,
        project_details,
        project_status,
        start_date,
        end_date,
        userId,
      ]
    );
    const projectId = newProject.rows[0].project_id; // Get the generated project ID
    // Step 2: Insert default section mappings for this new project
    const defaultSections = [1, 2, 3]; // Assuming section IDs 1, 2, and 3 are default
    for (const sectionId of defaultSections) {
      await pool.query(
        `INSERT INTO project_sections_mapping (project_id, section_id) VALUES ($1, $2)`,
        [projectId, sectionId]
      );
    }

    // Step 3: Commit the transaction after successful inserts
    await pool.query("COMMIT");
    res.status(201).json(newProject.rows[0]);
  } catch (err) {
    await pool.query("ROLLBACK");
    const errorMsg = err.message || ErrorMessage.internalServerError;
    res.status(500).send({ errorMsg });
  }
};

export default createProject;
