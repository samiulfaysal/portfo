import Navbar from "@/components/shared/navbar";
import Hero from '@/components/sections/hero';
import Services from '@/components/sections/services';
import TechStack from '@/components/sections/tech-stack';
import Projects from '@/components/sections/projects-showcase';
import Testimonials from '@/components/sections/testimonials';
import ContactCTA from '@/components/sections/ContactCTA';
import Footer from '@/components/ui/footer';
import { getHeroSettings } from "@/server-actions/settings";

// FIX: Force Next.js to bypass the cache and fetch fresh CMS data every time
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const heroContent = await getHeroSettings();

  return (
    <main className="bg-[#030303]">
      <Navbar />
      <Hero content={heroContent} />
      <Services />
      <TechStack />
      <Projects />
      <Testimonials />
      <ContactCTA />
      <Footer />
    </main>
  );
}