"use client";
import React, { useEffect, useState } from "react";
import ProjectCard from "../ProjectCard";

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [projectTags, setProjectTags] = useState<any[]>([]);
  const [featuredIds, setFeaturedIds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const resProjects = await fetch("/api/projects");
        const projectsData = await resProjects.json();

        const resTags = await fetch("/api/tags");
        const tagsData = await resTags.json();

        const resProjectTags = await fetch("/api/project_tags");
        const projectTagsData = await resProjectTags.json();

        const resFeatured = await fetch("/api/featured_projects");
        const featuredData = await resFeatured.json();
        const ids = featuredData.map((item: any) => item.project_id);

        setProjects(projectsData);
        setTags(tagsData);
        setProjectTags(projectTagsData);
        setFeaturedIds(ids);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Map tags to each project
  const mappedProjects = projects.map((project) => {
    const tagIds = projectTags
      .filter((pt: any) => pt.project_id === project.id)
      .map((pt: any) => pt.tag_id);
    const tech = tags
      .filter((tag: any) => tagIds.includes(tag.id))
      .map((tag: any) => tag.name);
    return { ...project, tech, link: project.url };
  });

  // Featured projects
  const featuredProjects = mappedProjects.filter((project) =>
    featuredIds.includes(project.id),
  );

  // Currently working on projects
  const workingOnProjects = mappedProjects.filter(
    (project) => project.in_progress,
  );

  return (
    <section
      id="projects"
      className="flex flex-col items-center bg-background px-4 py-8 lg:p-64 lg:pt-10 lg:pb-16"
    >
      <h2 className="text-5xl font-bold mb-10 text-left w-full max-w-4xl mx-auto">
        Featured Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-4xl mx-auto mb-12">
        {loading && <div>Loading projects...</div>}
        {!loading &&
          featuredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
      </div>
      <h2 className="text-5xl font-bold mb-10 text-left w-full max-w-4xl mx-auto">
        Currently Working On
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-4xl mx-auto mb-12">
        {loading && <div>Loading projects...</div>}
        {!loading &&
          workingOnProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
      </div>
      <a
        href="/projects"
        className="mt-10 text-3xl font-semibold text-neutral-600 decoration-neutral-600 hover:text-blue-600 hover:underline hover:decoration-blue-600 decoration-2 underline-offset-2 transition-all duration-200 transform hover:scale-105"
      >
        More projects &rarr;
      </a>
    </section>
  );
};

export default Projects;
