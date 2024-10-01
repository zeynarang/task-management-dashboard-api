import express from "express";
import bcrypt from "bcrypt";
import pool from "../client/client.js";

const loginRouter = async (req, res) => {
  const { email, password } = req.query;

  try {
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    // const hashedPassword = await bcrypt.hash("your_password", 10);
    // await pool.query(`update users set password=$1 where email =$2`, [
    //   hashedPassword,
    //   email,
    // ]);

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

    // Authentication successful, return user info (excluding password)
    res.json({
      id: user.id,
      name: user.name,
      last_name: user.last_name,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export default loginRouter;
