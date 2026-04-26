import Hero from '@/components/sections/hero';
import Services from '@/components/sections/services';
import TechStack from '@/components/sections/tech-stack';
import Projects from '@/components/sections/projects-showcase';
import Testimonials from '@/components/sections/testimonials';
import ContactCTA from '@/components/sections/ContactCTA';
import Footer from '@/components/ui/footer';

export default function Home() {
  return (
    <main className="bg-[#030303]">
      {/* 1. The 3D Geodesic Hero */}
      <Hero />

      {/* 2. Your Core Competencies */}
      <Services />

      {/* 3. The Interactive Tech Grid */}
      <TechStack />

      {/* 4. Live Deployment Logs (Projects) */}
      <Projects />

      {/* 5. The 3D Perspective Slider */}
      <Testimonials />

      {/* 6. The Initialization Portal (CTA) */}
      <ContactCTA />

      {/* 7. System Base (Footer) */}
      <Footer />
    </main>
  );
}