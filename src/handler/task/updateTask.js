import pool from "../../client/client.js";
import { ErrorMessage } from "../../shared/errorMessages.js";

const updateTask = async (req, res) => {
  const { taskId, name, details, status, priority } = req.body;

  try {
    // Check if the task exists
    const taskExists = await pool.query(
      "SELECT task_id FROM tasks WHERE task_id = $1",
      [taskId]
    );

    if (taskExists.rowCount === 0) {
      throw new Error(ErrorMessage.taskNotFound);
    }

    // Update the task with new values
    const updatedTask = await pool.query(
      "UPDATE tasks SET name = $1, details = $2, status = $3, priority = $4 WHERE task_id = $5 RETURNING *",
      [name, details, status, priority, taskId]
    );

    // Check if the update was successful
    if (updatedTask.rowCount === 0) {
      throw new Error(ErrorMessage.updateFailed);
    }

    // Respond with the updated task
    res.status(200).json(updatedTask.rows[0]);
  } catch (err) {
    const errorMsg = err.message || ErrorMessage.internalServerError;
    res.status(500).send({ errorMsg });
  }
};

export default updateTask;
