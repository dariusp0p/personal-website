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
  { name: "About Me", link: "/about/" },
];

export default function ProjectsPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-center">Coming Soon!</h1>
      </main>
      <Footer />
    </>
  );
}
