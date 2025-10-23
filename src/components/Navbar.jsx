import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    
    { path: "/freelancers", label: "Freelancers" },
    { path: "/jobs", label: "Jobs" },
    { path: "/add", label: "Qo‘shish" },
    
  ];

  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3 sm:py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-bold tracking-tight hover:opacity-90 transition"
        >
          <span className="text-white">Bir</span>
          <span className="text-yellow-300">Zumda</span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden sm:flex gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `font-medium text-sm sm:text-base transition ${
                  isActive
                    ? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
                    : "hover:text-yellow-200"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden bg-gradient-to-b from-purple-700 to-pink-600"
          >
            <ul className="flex flex-col items-center py-3 space-y-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-1 rounded-md text-sm font-medium transition ${
                        isActive
                          ? "bg-yellow-400 text-purple-800"
                          : "hover:bg-pink-500 hover:text-white"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
