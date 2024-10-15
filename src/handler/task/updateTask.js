import pool from "../../client/client.js";
import { ErrorMessage } from "../../shared/errorMessages.js";

const updateTask = async (req, res) => {
  const { name, details, status, priority, sectionId } = req.body;
  const { taskId } = req.params;

  try {
    // Check if the task exists
    const taskExists = await pool.query(
      "SELECT task_id FROM tasks WHERE task_id = $1",
      [taskId]
    );

    if (taskExists.rowCount === 0) {
      throw new Error(ErrorMessage.taskNotFound);
    }

    // Prepare dynamic update query
    const fields = [];
    const values = [];
    let index = 1;

    // Check which fields are provided and push them into the fields and values arrays
    if (name !== undefined) {
      fields.push(`name = $${index}`);
      values.push(name);
      index++;
    }
    if (details !== undefined) {
      fields.push(`details = $${index}`);
      values.push(details);
      index++;
    }
    if (status !== undefined) {
      fields.push(`status = $${index}`);
      values.push(status);
      index++;
    }
    if (priority !== undefined) {
      fields.push(`priority = $${index}`);
      values.push(priority);
      index++;
    }
    if (sectionId !== undefined) {
      fields.push(`section_id = $${index}`);
      values.push(sectionId);
      index++;
    }

    // If no fields are provided for update, return early
    if (fields.length === 0) {
      return res
        .status(400)
        .send({ errorMsg: "ErrorMessage.noFieldsToUpdate" });
    }

    // Add taskId to the values array for the WHERE clause
    values.push(taskId);

    // Construct the query string dynamically
    const query = `
      UPDATE tasks 
      SET ${fields.join(", ")} 
      WHERE task_id = $${index} 
      RETURNING *;
    `;

    // Execute the update query
    const updatedTask = await pool.query(query, values);

    // Check if the update was successful
    if (updatedTask.rowCount === 0) {
      throw new Error(ErrorMessage.updateFailed);
    }

    // Respond with the updated task
    res.status(200).json(updatedTask.rows[0]);
  } catch (err) {
    console.log(err);
    const errorMsg = err.message || ErrorMessage.internalServerError;
    res.status(500).send({ errorMsg });
  }
};

export default updateTask;
