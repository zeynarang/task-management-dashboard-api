import { jwtDecode } from "jwt-decode";
import pool from "../client/client.js";

const getProjects = async (req, res) => {
  try {
    const { projectId } = req.params;
    // Decode the JWT to get the user information
    const decodedToken = jwtDecode(req.headers.authorization);

    // Query to get the projects and their associated sections
    const projectsResult = await pool.query(
      `SELECT 
    p.*, 
    COALESCE(
        json_agg(
            json_build_object('section_id', s.section_id, 'name', s.name)
        ) FILTER (WHERE s.section_id IS NOT NULL), '[]'
    ) as sections
FROM projects p
LEFT JOIN project_sections_mapping psm ON p.project_id = psm.project_id
LEFT JOIN sections s ON psm.section_id = s.section_id
WHERE p.user_id = $1 AND p.project_id = $2
GROUP BY p.project_id 
LIMIT 1;
`,
      [decodedToken.id, projectId]
    );

    // Return the projects and their associated sections
    res.json(projectsResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export default getProjects;
