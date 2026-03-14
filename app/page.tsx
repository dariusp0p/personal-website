import { FloatingNav } from "@/components/ui/sections/FloatingNavbar";
import Hero from "@/components/ui/sections/Hero";
import Skills from "@/components/ui/sections/Skills";
import Projects from "@/components/ui/sections/Projects";
import Footer from "@/components/ui/sections/Footer";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Projects", link: "/projects" },
  { name: "About Me", link: "/about" },
];

export default function Home() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <main>
        <Hero />
        <Projects />
        {/* <Skills /> */}
        <Footer />
      </main>
    </>
  );
}
