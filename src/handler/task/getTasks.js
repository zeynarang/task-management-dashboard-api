import pool from "../../client/client.js";

const getTasks = async (req, res) => {
  try {
    const tasksResult = await pool.query("SELECT * FROM tasks");
    res.json(tasksResult.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export default getTasks;
