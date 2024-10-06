import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const checkConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to the database successfully.");
    client.release();
  } catch (err) {
    console.error("Failed to connect to the database.", err);
  }
};
checkConnection();

export default pool;
