import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-gradient-to-r from-[#0f172a]/70 via-[#1e1b4b]/60 to-[#4c1d95]/60 shadow-[0_0_20px_rgba(59,130,246,0.4)] border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 select-none">
          <motion.span
            initial={{ rotate: -15, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-cyan-400 text-4xl drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
          >
            ⚡
          </motion.span>

          <motion.h1
            className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent tracking-wider"
            whileHover={{
              scale: 1.05,
              textShadow: "0px 0px 20px rgba(168,85,247,0.8)",
            }}
          >
            BirZumda
          </motion.h1>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex gap-10 text-white font-medium items-center">
          {[
            { name: "Ishlar", path: "/jobs" },
            { name: "Freelancerlar", path: "/freelancers" },
            { name: "Qo‘shish", path: "/qoshish" }, // ✅ To‘g‘rilandi
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 200 }}>
              <Link to={item.path} className="relative group">
                <span className="hover:text-cyan-300 transition">{item.name}</span>
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-slate-900/95 border-t border-white/10 backdrop-blur-md shadow-lg"
        >
          <nav className="flex flex-col p-4 gap-4 text-white font-medium">
            {[
              { name: "Ishlar", path: "/jobs" },
              { name: "Freelancerlar", path: "/freelancers" },
              { name: "Qo‘shish", path: "/qoshish" }, // ✅ To‘g‘rilandi
            ].map((item, i) => (
              <Link
                key={i}
                to={item.path}
                className="hover:text-cyan-400 transition"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
}
