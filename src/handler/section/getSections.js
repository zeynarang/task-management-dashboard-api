
import pool from "../../client/client.js";

const getSections = async (req, res) => {
  const { projectId } = req.params;

  if (!projectId) {
    return res.status(400).json({ error: "Project ID is required." });
  }

  try {
    // Retrieve all sections associated with the given project ID
    const result = await pool.query(
      `SELECT s.section_id, s.name 
       FROM sections s 
       JOIN project_sections_mapping psm ON s.section_id = psm.section_id 
       WHERE psm.project_id = $1`,
      [projectId]
    );

    res.status(200).json(result.rows); // Return the sections
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching sections." });
  }
};

export default getSections;
