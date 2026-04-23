import Navbar from "@/components/shared/navbar";

export default function Admin() {
  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-white mb-8">
            Admin Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Admin panel coming soon...
          </p>
        </div>
      </main>
    </>
  );
}