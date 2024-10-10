import pool from "../../client/client.js";

const getUserDetails = async (req, res) => {
  let status = 500;
  const { userId } = req.params;
  try {
    const userDetailsResult = await pool.query(
      "SELECT * FROM users where user_id = $1 LIMIT 1",
      [userId]
    );

    if (userDetailsResult.rowCount < 1) {
      status = 404;
      throw new Error("User doesn't exist");
    }
    res.json(userDetailsResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(status).send(err.message ?? "Server Error");
  }
};

export default getUserDetails;
