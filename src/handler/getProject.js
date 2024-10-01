import express from "express";
import pool from "../client/client.js";


const getProjectsRouter = async (req, res) => {
  try {
    const projectsResult = await pool.query("SELECT * FROM projects");
    res.json(projectsResult.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export default getProjectsRouter;
