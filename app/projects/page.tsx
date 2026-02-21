"use client";

import React, { useState } from "react";
import { FloatingNav } from "@/components/ui/sections/FloatingNavbar";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectFilters from "@/components/ui/ProjectFilters";
import MobileFiltersModal from "@/components/ui/MobileFiltersModal";
import ProjectSearchBar from "@/components/ui/ProjectSearchBar";
import Footer from "@/components/ui/sections/Footer";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Projects", link: "/projects/" },
  { name: "Education", link: "/education/" },
];

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

const allTechs = Array.from(
  new Set(projects.flatMap((project) => project.tech)),
).sort();

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  return (
    <>
      <FloatingNav navItems={navItems} />
      <main>
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-left mt-8">Projects</h1>
          <hr className="border-t border-neutral-200 my-4" />
          <ProjectSearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </main>
    </>
  );
}
