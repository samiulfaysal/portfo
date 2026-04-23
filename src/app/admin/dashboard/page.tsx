import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/shared/navbar";

export default function AdminDashboard() {
  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-white mb-8">
            Admin Dashboard
          </h1>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Total Projects</h3>
              <p className="text-3xl font-bold text-white">0</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">New Messages</h3>
              <p className="text-3xl font-bold text-white">0</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Featured Projects</h3>
              <p className="text-3xl font-bold text-white">0</p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Messages</h2>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
              <p className="text-muted-foreground">No messages yet.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}