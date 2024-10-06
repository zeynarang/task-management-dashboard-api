import express from "express";
import pool from "../client/client.js";
import { jwtDecode } from "jwt-decode";

const getProjects = async (req, res) => {
  try {
    const decodedToken = jwtDecode(req.headers.authorization);
    const projectsResult = await pool.query(
      "SELECT * FROM projects where user_id=$1",
      [decodedToken.id]
    );
    res.json(projectsResult.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export default getProjects;
