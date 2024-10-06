import bcrypt from "bcrypt";
import pool from "../client/client.js";
import jwt from "jsonwebtoken";

const loginRouter = async (req, res) => {
  const { email, password } = req.query;

  try {
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).send("Invalid email or password");
    }

    const user = userResult.rows[0];

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("isMatch", isMatch);
    if (!isMatch) {
      return res.status(401).send("Invalid email or password");
    }
    // Create JWT payload
    const payload = {
      id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };

    // Generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }); // Token expires in 1 hour

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export default loginRouter;
