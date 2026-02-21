// app/api/projects/route.ts
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET() {
  const { rows } = await pool.query(
    `SELECT id, title, name, url, description, in_progress, deployed
     FROM projects
     ORDER BY id DESC
     LIMIT 50`
  );
  return Response.json(rows);
}