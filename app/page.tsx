import { FloatingNav } from "@/components/ui/sections/FloatingNavbar";
import Hero from "@/components/ui/sections/Hero";
import Skills from "@/components/ui/sections/Skills";
import Projects from "@/components/ui/sections/Projects";
import Footer from "@/components/ui/sections/Footer";

const navItems = [
  { name: "Home", link: "#hero" },
  { name: "Projects", link: "#projects" },
  { name: "Skills", link: "#skills" },
];

export default function Home() {
  return (
    <main>
      <FloatingNav navItems={navItems} />
      <Hero />
      <Projects />
      <Skills />
      <Footer />
    </main>
  );
}
