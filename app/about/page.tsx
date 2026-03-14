"use client";

import useSWR from "swr";
import React, { useState } from "react";
import { FloatingNav } from "@/components/ui/sections/FloatingNavbar";
import ProjectSearchEngine from "@/components/ui/ProjectSearchEngine";
import ProjectCard from "@/components/ui/ProjectCard";
import Footer from "@/components/ui/sections/Footer";
import AboutMeCard from "@/components/ui/AboutMeCard";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Projects", link: "/projects/" },
  { name: "About Me", link: "/about/" },
];

export default function ProjectsPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <main className="flex flex-col items-center justify-center min-h-screen">
        <AboutMeCard
          paragraphs={[
            "Second-year CS student at UBB Cluj-Napoca with early experience in web development and software engineering. I’ve built and deployed both web and desktop applications, taking them from idea to production.",
            "I’m currently exploring Cloud Infrastructure, DevOps, and AI/ML. I’m looking for an internship where I can contribute meaningful work while learning as much as possible from experienced engineers.",
            "Outside of tech, I stay active through music and martial arts. As Music Director in my local church band, I play piano and coordinate live performances, which has strengthened my discipline, teamwork, and focus under pressure. I have also practiced Muay Thai and Karate, experiences that taught me resilience, self-discipline, and perseverance, qualities I carry into both personal and professional challenges.",
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
