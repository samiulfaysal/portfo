import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-dark/50 border-b border-dark/20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-white">Samiu</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-white/80 transition-colors">
            Home
          </Link>
          <Link href="/projects" className="hover:text-white/80 transition-colors">
            Projects
          </Link>
          <Link href="/about" className="hover:text-white/80 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-white/80 transition-colors">
            Contact
          </Link>
          <Link href="/admin" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md transition-colors">
            Admin
          </Link>
        </div>

        <div className="md:hidden">
          {/* Mobile menu button would go here */}
          <button className="text-white hover:text-white/80">
            Menu
          </button>
        </div>
      </div>
    </nav>
  );
}