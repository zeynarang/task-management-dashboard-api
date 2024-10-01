import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Check if the pool is connected and create a new connection if it doesn't exist
const checkConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to the database successfully.");
    client.release();
  } catch (err) {
    console.error("Failed to connect to the database.", err);
  }
};

// Invoke the check connection function
checkConnection();

export default pool;
