"use client";

import React, { useState } from "react";
import { FloatingNav } from "@/components/ui/sections/FloatingNavbar";
import ProjectSearchEngine from "@/components/ui/ProjectSearchEngine";
import ProjectCard from "@/components/ui/ProjectCard";
import Footer from "@/components/ui/sections/Footer";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Projects", link: "/projects/" },
  { name: "Education", link: "/education/" },
];

const projects = [
  {
    name: "AddPoster",
    tech: [
      "Python",
      "Selenium WebDriver",
      "PyQt",
      "SQLite",
      "PyInstaller",
      "Inno Setup",
    ],
  },
  {
    name: "Hotel Simulator",
    tech: ["Python", "Software Architecture", "PyQt", "SQLite"],
  },
  {
    name: "Mindify",
    tech: [
      "Python",
      "Django",
      "Bootstrap",
      "Project Management",
      "Team Coordination",
    ],
  },
  {
    name: "Super Powers Team Website",
    tech: [
      "Web Development",
      "Web Design",
      "HTML5",
      "CSS",
      "JavaScript",
      "PHP",
      "MySQL",
      "Client Work",
    ],
  },
];

const staticStatusCategory = {
  name: "status",
  fields: ["Deployed", "In Progress"],
};

export default function ProjectsPage() {
  const [searchBarText, setSearchBarText] = useState("");

  const [filters, setFilters] = useState<{ [category: string]: Set<string> }>(
    {},
  );

  const [fetchedProjects, setFetchedProjects] = useState<any[]>([]);

  const [tagCategories, setTagCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [projectTags, setProjectTags] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const resProjects = await fetch("/api/projects");
        const projectsData = await resProjects.json();

        const resTagCategories = await fetch("/api/tag_categories");
        const tagCategoriesData = await resTagCategories.json();

        const resTags = await fetch("/api/tags");
        const tagsData = await resTags.json();

        const resProjectTags = await fetch("/api/project_tags");
        const projectTagsData = await resProjectTags.json();

        setFetchedProjects(projectsData);
        setTagCategories(tagCategoriesData);
        setTags(tagsData);
        setProjectTags(projectTagsData);

        const initialFilters: { [category: string]: Set<string> } = {};
        initialFilters[staticStatusCategory.name] = new Set<string>();
        tagCategoriesData.forEach((cat: any) => {
          initialFilters[cat.name] = new Set<string>();
        });
        setFilters(initialFilters);

        setLoading(false);
      } catch {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filterCategories = [
    staticStatusCategory,
    ...tagCategories.map((cat: any) => ({
      name: cat.name,
      fields: tags
        .filter((t: any) => t.category_id === cat.id)
        .map((t: any) => t.name),
    })),
  ];

  const projects = fetchedProjects.map((project) => {
    const tagIds = projectTags
      .filter((pt: any) => pt.project_id === project.id)
      .map((pt: any) => pt.tag_id);
    const ptag = tags
      .filter((tag: any) => tagIds.includes(tag.id))
      .map((tag: any) => tag.name);

    if (project.deployed) ptag.push("Deployed");
    if (project.in_progress) ptag.push("In Progress");

    return { ...project, ptag };
  });

  return (
    <>
      <FloatingNav navItems={navItems} />
      <main className="mb-18 min-h-[90vh]">
        <div className="max-w-3xl mx-auto px-4 pt-28">
          <ProjectSearchEngine
            searchBarText={searchBarText}
            setSearchBarText={setSearchBarText}
            filters={filters}
            setFilters={setFilters}
            categories={filterCategories}
          />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {loading && <div>Loading projects...</div>}
            {!loading && projects.length === 0 && <div>No projects found.</div>}
            {!loading &&
              projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  name={project.name}
                  description={project.description}
                  tech={project.ptag}
                  link={project.url}
                  inProgress={project.in_progress}
                  deployed={project.deployed}
                />
              ))}
            {!loading && projects.length % 2 === 1 && (
              <div className="invisible h-full">
                <ProjectCard
                  title=""
                  name=""
                  description=""
                  tech={[]}
                  link=""
                  inProgress={false}
                  deployed={false}
                />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
