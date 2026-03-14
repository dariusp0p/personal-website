"use client";

import useSWR from "swr";
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

const staticStatusCategory = {
  name: "status",
  fields: ["Deployed", "In Progress"],
};

const fetcher = (url: string | URL | Request) =>
  fetch(url).then((res) => res.json());

export default function ProjectsPage() {
  const [searchBarText, setSearchBarText] = useState("");
  const [filters, setFilters] = useState<{ [category: string]: Set<string> }>(
    {},
  );

  const { data: fetchedProjects = [], isLoading: loadingProjects } = useSWR(
    "/api/projects",
    fetcher,
  );
  const { data: tagCategories = [], isLoading: loadingTagCategories } = useSWR(
    "/api/tag_categories",
    fetcher,
  );
  const { data: tags = [], isLoading: loadingTags } = useSWR(
    "/api/tags",
    fetcher,
  );
  const { data: projectTags = [], isLoading: loadingProjectTags } = useSWR(
    "/api/project_tags",
    fetcher,
  );

  const loading =
    loadingProjects ||
    loadingTagCategories ||
    loadingTags ||
    loadingProjectTags;

  React.useEffect(() => {
    if (!loading) {
      const initialFilters: { [category: string]: Set<string> } = {};
      initialFilters[staticStatusCategory.name] = new Set<string>();
      tagCategories.forEach((cat: any) => {
        initialFilters[cat.name] = new Set<string>();
      });
      setFilters(initialFilters);
    }
  }, [loading, tagCategories]);

  const filterCategories = [
    staticStatusCategory,
    ...tagCategories.map((cat: any) => ({
      name: cat.name,
      fields: tags
        .filter((t: any) => t.category_id === cat.id)
        .map((t: any) => t.name),
    })),
  ];

  interface Project {
    id: number;
    title: string;
    name: string;
    description: string;
    url: string;
    deployed: boolean;
    in_progress: boolean;
    ptag: string[];
    // Add other fields as needed
  }

  const mappedProjects = fetchedProjects.map((project: Project) => {
    const tagIds = projectTags
      .filter((pt: any) => pt.project_id === project.id)
      .map((pt: any) => pt.tag_id);
    const ptag = tags
      .filter((tag: any) => tagIds.includes(tag.id))
      .map((tag: any) => tag.name);

    return { ...project, ptag };
  });

  const filteredProjects = mappedProjects.filter((project: Project) => {
    const searchLower = searchBarText.toLowerCase();
    const matchesSearch =
      project.title?.toLowerCase().includes(searchLower) ||
      project.name?.toLowerCase().includes(searchLower) ||
      project.description?.toLowerCase().includes(searchLower) ||
      project.ptag.some((tag: string) =>
        tag.toLowerCase().includes(searchLower),
      );

    const statusFilters = filters["status"];
    const matchesStatus =
      !statusFilters ||
      statusFilters.size === 0 ||
      (statusFilters.has("Deployed") && project.deployed) ||
      (statusFilters.has("In Progress") && project.in_progress);

    const otherCategories = Object.keys(filters).filter(
      (cat) => cat !== "status",
    );
    const matchesOtherFilters = otherCategories.every((cat) => {
      const selected = filters[cat];
      if (!selected || selected.size === 0) return true;
      return project.ptag.some((tag: string) => selected.has(tag));
    });

    return matchesSearch && matchesStatus && matchesOtherFilters;
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
            {!loading && filteredProjects.length === 0 && (
              <div>No projects found.</div>
            )}
            {!loading &&
              filteredProjects.map((project: Project) => (
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
            {!loading && filteredProjects.length % 2 === 1 && (
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
