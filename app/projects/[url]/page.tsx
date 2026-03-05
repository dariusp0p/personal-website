import { Pool } from "pg";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import Footer from "@/components/ui/sections/Footer";
import ImageCollection from "@/components/ui/ImageCollection";
import ProjectDetails from "@/components/ui/ProjectDetails";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ url?: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.url?.trim();
  if (!slug) {
    return <div>Invalid project URL</div>;
  }

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/projects/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return <div>Project not found</div>;
  }
  const project = await res.json();

  return (
    <>
      <main className="max-w-3xl mx-auto px-4 py-4 mb-18 min-h-[90vh]">
        <div className="flex items-center justify-between border-b-2 border-muted mb-6 h-12 relative">
          <div className="flex-1 flex items-center">
            <Link
              href="/projects"
              className="flex items-center gap-2 text-accent-foreground font-semibold hover:underline"
            >
              <FiArrowLeft className="text-xl" />
              Back
            </Link>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <span className="text-lg font-bold text-card-foreground whitespace-nowrap">
              {project.name}
            </span>
          </div>
          <div className="flex-1" />
        </div>
        <ProjectDetails
          title={project.title}
          description={project.description}
          tech={project.tech || []}
          inProgress={project.inProgress}
          deployed={project.deployed}
          links={project.links}
        />
        {project.images?.length > 0 && (
          <div className="mt-6">
            <ImageCollection images={project.images} alt={project.title} />
          </div>
        )}
        {project.markdowns?.length > 0 && (
          <div className="mt-6 flex flex-col gap-6">
            {project.markdowns.map((md: string, idx: number) => (
              <MarkdownRenderer key={idx} filePath={md} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
