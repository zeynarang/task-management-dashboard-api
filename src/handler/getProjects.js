import { jwtDecode } from "jwt-decode";
import pool from "../client/client.js";

const getProjects = async (req, res) => {
  try {
    const user = jwtDecode(req.headers.authorization);
    console.log("user", user);
    const projectsResult = await pool.query(
      `
    SELECT 
    p.*, 
    COALESCE(json_agg(json_build_object('section_id', s.section_id, 'name', s.name)) FILTER (WHERE s.section_id IS NOT NULL), '[]') AS sections
FROM projects p
LEFT JOIN project_sections_mapping psm ON p.project_id = psm.project_id
LEFT JOIN sections s ON psm.section_id = s.section_id
WHERE p.user_id = $1
GROUP BY p.project_id;
`,
      [user.id]
    );
    res.json(projectsResult.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export default getProjects;
