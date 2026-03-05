import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

console.log("API route HIT");

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  console.log("API route called with slug:", slug);

  // Fetch main project
  const { rows: projectRows } = await pool.query(
    `SELECT * FROM projects WHERE url = $1 LIMIT 1`,
    [`/${slug}`]
  );

  console.log("Project rows:", projectRows);
  console.log("HEY");
  
  const project = projectRows[0];
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Fetch links
  const { rows: links } = await pool.query(
    `SELECT type, value FROM project_links WHERE project_id = $1`,
    [project.id]
  );

  // Fetch tech tags
const { rows: techRows } = await pool.query(
  `SELECT tags.name FROM project_tags
   JOIN tags ON project_tags.tag_id = tags.id
   WHERE project_tags.project_id = $1`,
  [project.id]
);
const tech = techRows.map(t => t.name);

  // Fetch images
  const { rows: imageRows } = await pool.query(
    `SELECT path FROM project_images WHERE project_id = $1`,
    [project.id]
  );
  const images = imageRows.map(img => img.path);

  // Fetch markdowns
  const { rows: markdownRows } = await pool.query(
    `SELECT path FROM project_markdowns WHERE project_id = $1`,
    [project.id]
  );
  const markdowns = markdownRows.map(md => md.path);

  return NextResponse.json({
    title: project.title,
    name: project.name,
    description: project.description,
    inProgress: project.inprogress,
    deployed: project.deployed,
    links,
    tech,
    images,
    markdowns,
  });
}