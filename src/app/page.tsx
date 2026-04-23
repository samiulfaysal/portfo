import Navbar from "@/components/shared/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Crafting exceptional digital experiences with cutting-edge technology
          </p>
          <a href="/projects" className="inline-block bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg transition-colors text-white/90 hover:text-white">
            View My Projects
          </a>
        </div>
      </main>
    </>
  );
}