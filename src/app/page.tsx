import Navbar from "@/components/shared/navbar";
import Hero from "@/components/sections/hero";
import ProjectShowcase from "@/components/sections/projects-showcase";
import TechStack from "@/components/sections/tech-stack";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-br from-dark via-dark to-dark/80 min-h-screen">
        <Hero />
        <ProjectShowcase />
        <TechStack />
      </main>
    </>
  );
}