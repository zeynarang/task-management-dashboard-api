
import pool from "../../client/client.js";

const updateSection = async (req, res) => {
  const { sectionId } = req.params; // Get the section ID from the request parameters
  const { sectionName } = req.body; // Get the new section name from the request body

  if (!sectionId) {
    return res.status(400).json({ error: "Section ID is required." });
  }

  if (!sectionName) {
    return res.status(400).json({ error: "Section name is required." });
  }

  try {
    // Update the section name in the sections table
    const result = await pool.query(
      "UPDATE sections SET name = $1 WHERE section_id = $2 RETURNING section_id, name",
      [sectionName, sectionId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Section not found." });
    }

    res.status(200).json(result.rows[0]); // Return the updated section
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the section." });
  }
};

export default updateSection;
