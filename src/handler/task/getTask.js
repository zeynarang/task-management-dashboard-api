import pool from "../../client/client.js";

const getTask = async (req, res) => {
  const { taskId } = req.params;
  console.log("taskId", taskId, req.params);
  try {
    const tasksResult = await pool.query(
      "SELECT * FROM tasks where task_id=$1",
      [taskId]
    );
    res.json(tasksResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export default getTask;
