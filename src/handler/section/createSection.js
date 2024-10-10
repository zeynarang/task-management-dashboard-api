import pool from "../../client/client.js";

const createSection = async (req, res) => {
  const { projectId } = req.params; // Destructure name and projectId from the request body
  const { sectionName } = req.body; // Destructure name and projectId from the request body
  console.log("projectId", projectId);
  console.log("sectionName", sectionName);
  if (!sectionName) {
    return res.status(400).json({ error: "Section name is required." });
  }

  if (!projectId) {
    return res.status(400).json({ error: "Project ID is required." });
  }

  try {
    // Step 1: Insert the new section into the sections table
    const result = await pool.query(
      "INSERT INTO sections (name) VALUES ($1) RETURNING section_id, name",
      [sectionName]
    );

    const newSection = result.rows[0]; // Get the newly created section
    const sectionId = newSection.section_id;

    // Step 2: Insert mapping into project_sections_mapping table
    await pool.query(
      "INSERT INTO project_sections_mapping (section_id, project_id) VALUES ($1, $2)",
      [sectionId, projectId]
    );

    res.status(201).json({ ...newSection, projectId }); // Return the created section and the associated project ID
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the section." });
  }
};

export default createSection;
