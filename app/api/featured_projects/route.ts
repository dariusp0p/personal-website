import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET() {
  const { rows } = await pool.query(`SELECT project_id FROM featured_projects`);
  return Response.json(rows);
}
