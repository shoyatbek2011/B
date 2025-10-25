import { Facebook, Twitter, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-indigo-600 text-white py-8 mt-16">
      <div className="max-w-5xl mx-auto px-4 flex flex-col  md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">BirZumda</h2>
          <p className="text-white/80 text-sm mt-1">
            © 2025 BirZumda – Barcha huquqlar himoyalangan
          </p>
        </div>

        {/* Social links */}
        <div className="flex gap-5 mt-4 md:mt-0">
          {[Facebook, Twitter, Instagram, Github].map((Icon, idx) => (
            <a
              key={idx}
              href="#"
              className="hover:text-white transition-transform transform hover:scale-110"
            >
              <Icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-6 border-t border-white/20 pt-3 text-center text-sm text-white/80">
        Made with ❤️ in Uzbekistan
      </div>
    </footer>
  );
}
