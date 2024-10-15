
import pool from "../../client/client.js";

const getSection = async (req, res) => {
  const { sectionId } = req.params;

  if (!sectionId) {
    return res.status(400).json({ error: "Section ID is required." });
  }

  try {
    // Retrieve the specific section by ID
    const result = await pool.query(
      "SELECT section_id, name FROM sections WHERE section_id = $1",
      [sectionId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Section not found." });
    }

    res.status(200).json(result.rows[0]); // Return the section
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the section." });
  }
};

export default getSection;
