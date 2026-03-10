import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const inProgress = url.searchParams.get("in_progress");

  let query = `SELECT id, title, name, url, description, in_progress, deployed FROM projects`;
  let params: any[] = [];

  if (inProgress === "true") {
    query += ` WHERE in_progress = true`;
  }

  query += ` ORDER BY id DESC LIMIT 50`;

  const { rows } = await pool.query(query, params);
  return Response.json(rows);
}
