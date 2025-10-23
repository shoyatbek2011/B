import { Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Freelancers from "./pages/Freelancers";
import Jobs from "./pages/Jobs";
import Add from "./pages/AddPostForm";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <Navbar />

      {/* Main content */}
      <main className="flex-grow px-4 sm:px-8 py-6">
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/"
              element={
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Home />
                </motion.div>
              }
            />
            <Route
              path="/freelancers"
              element={
                <motion.div
                  key="freelancers"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Freelancers />
                </motion.div>
              }
            />
            <Route
              path="/jobs"
              element={
                <motion.div
                  key="jobs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Jobs />
                </motion.div>
              }
            />
            <Route
              path="/add"
              element={
                <motion.div
                  key="add"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Add />
                </motion.div>
              }
            />

            {/* 404 sahifa */}
            <Route
              path="*"
              element={
                <motion.div
                  key="404"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16"
                >
                  <h2 className="text-3xl font-bold text-gray-700 mb-2">404</h2>
                  <p className="text-gray-500">Bunday sahifa topilmadi 😔</p>
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-center py-4 mt-auto">
        <p className="text-sm">
          © {new Date().getFullYear()} <span className="font-semibold">BirZumda</span>. Barcha huquqlar himoyalangan.
        </p>
      </footer>
    </div>
  );
}
