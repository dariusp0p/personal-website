"use client";
import React, { useState } from "react";
import { FloatingNav } from "@/components/ui/sections/FloatingNavbar";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectFilters from "@/components/ui/ProjectFilters";
import MobileFiltersModal from "@/components/ui/MobileFiltersModal";
import ProjectSearchBar from "@/components/ui/ProjectSearchBar";
import Footer from "@/components/ui/sections/Footer";

const navItems = [{ name: "Home", link: "/" }];

const projects = [
  {
    title: "Desktop Application",
    name: "AddPoster",
    description:
      "Cross-platform desktop app to automate posting in Facebook groups. Features custom HWID-bound license manager, monthly expiry, code obfuscation, auto-update, and packaged for Windows/macOS.",
    tech: [
      "Python",
      "Selenium WebDriver",
      "PyQt",
      "SQLite",
      "PyInstaller",
      "Inno Setup",
    ],
    images: [
      "/projects/AddPoster/demo_1.png",
      "/projects/AddPoster/demo_2.png",
      "/projects/AddPoster/demo_3.png",
      "/projects/AddPoster/demo_4.png",
      "/projects/AddPoster/demo_6.png",
    ],
    link: "/addposter",
    inProgress: false,
    deployed: true,
  },
  {
    title: "Python Application",
    name: "Hotel Simulator",
    description:
      "Python app with layered architecture, drag-and-drop floor canvas, advanced reservation checks, hotel occupancy simulator, timeline, statistics, and 3D graph.",
    tech: ["Python", "Software Architecture", "PyQt", "SQLite"],
    images: [
      "/projects/HotelSimulator/demo_1.png",
      "/projects/HotelSimulator/demo_2.png",
      "/projects/HotelSimulator/demo_3.png",
      "/projects/HotelSimulator/demo_4.png",
    ],
    link: "/hotelsimulator",
    inProgress: false,
    deployed: true,
  },
  {
    title: "Full-stack Website Application",
    name: "Mindify",
    description:
      "Hackathon project: Django app for real-time group learning, room creation, and AI integration. Built with a team during ITEC Hackathon.",
    tech: [
      "Python",
      "Django",
      "Bootstrap",
      "Project Management",
      "Team Coordination",
    ],
    images: [
      "/projects/Mindify/demo_1.png",
      "/projects/Mindify/demo_2.png",
      "/projects/Mindify/demo_3.png",
      "/projects/Mindify/demo_4.png",
      "/projects/Mindify/demo_5.png",
    ],
    link: "/mindify",
    inProgress: false,
    deployed: false,
  },
  {
    title: "Full-stack Website",
    name: "Super Powers Team Website",
    description:
      "Presentation website with authentication, ready for video tutorial integration. Collaborated on visual design and brand identity, including team logo.",
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
    images: [
      "/projects/ForeverWebsite/demo_1.png",
      "/projects/ForeverWebsite/demo_2.png",
      "/projects/ForeverWebsite/demo_3.png",
      "/projects/ForeverWebsite/demo_4.png",
    ],
    link: "https://www.superpowersteam.ro",
    inProgress: false,
    deployed: true,
  },
];

// Get all unique techs
const allTechs = Array.from(
  new Set(projects.flatMap((project) => project.tech))
).sort();

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<{
    inProgress: boolean;
    deployed: boolean;
    tech: string[];
  }>({
    inProgress: false,
    deployed: false,
    tech: [],
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key: "inProgress" | "deployed") => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTechFilterChange = (tech: string) => {
    setFilters((prev) => ({
      ...prev,
      tech: prev.tech.includes(tech)
        ? prev.tech.filter((t) => t !== tech)
        : [...prev.tech, tech],
    }));
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      (!filters.inProgress && !filters.deployed) ||
      (filters.inProgress && project.inProgress) ||
      (filters.deployed && project.deployed);
    const matchesTech =
      filters.tech.length === 0 ||
      filters.tech.every((t) => project.tech.includes(t));
    return matchesSearch && matchesStatus && matchesTech;
  });

  return (
    <main className="container mx-auto py-8 px-4">
      <FloatingNav navItems={navItems} />
      <h1 className="text-4xl font-bold mt-20 mb-6 text-center">My Projects</h1>
      <MobileFiltersModal
        open={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onStatusChange={handleFilterChange}
        onTechChange={handleTechFilterChange}
        allTechs={allTechs}
      />
      <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
        {/* Left Sidebar (filters, desktop only) */}
        <div className="hidden md:block flex-shrink-0 w-64">
          <ProjectFilters
            filters={filters}
            onStatusChange={handleFilterChange}
            onTechChange={handleTechFilterChange}
            allTechs={allTechs}
          />
        </div>
        {/* Feed - centered with room for right sidebar */}
        <section className="flex flex-col items-center w-full">
          <div className="w-full max-w-xl mx-auto">
            <div className="mb-6">
              <ProjectSearchBar
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                showFiltersButton={true}
                onFiltersClick={() => setShowFilters(true)}
              />
            </div>
            <div className="flex flex-col w-full">
              {filteredProjects.length === 0 ? (
                <p className="text-gray-500 text-center">No projects found.</p>
              ) : (
                filteredProjects.map((project, idx) => (
                  <ProjectCard
                    key={idx}
                    title={project.title}
                    name={project.name}
                    description={project.description}
                    tech={project.tech}
                    link={project.link}
                    inProgress={project.inProgress}
                    deployed={project.deployed}
                  />
                ))
              )}
            </div>
          </div>
        </section>
        {/* Right Sidebar (empty, reserved for future use) */}
        <div className="hidden md:block flex-shrink-0 w-64" />
      </div>
      <Footer />
    </main>
  );
}
