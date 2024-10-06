import express from "express";
import pool from "../client/client.js";
import { jwtDecode } from "jwt-decode";

const getProjects = async (req, res) => {
  try {
    // Decode the JWT to get the user information
    const decodedToken = jwtDecode(req.headers.authorization);

    // Query to get the projects and their associated sections
    const projectsResult = await pool.query(
      `SELECT p.*, json_agg(ps.section_id) as sections
     FROM projects p
     LEFT JOIN project_sections_mapping ps ON p.id = ps.project_id
     WHERE p.user_id = $1
     GROUP BY p.id`,
      [decodedToken.id]
    );

    // Return the projects and their associated sections
    res.json(projectsResult.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export default getProjects;
