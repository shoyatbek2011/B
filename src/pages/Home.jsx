import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="text-center py-20 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl sm:text-6xl font-extrabold text-gray-800 mb-6"
      >
        Xush kelibsiz <span className="text-purple-600">BirZumda</span> platformasiga 🚀
      </motion.h1>

      <p className="text-gray-600 mb-8 text-lg">
        Bu yerda freelancerlar va ish beruvchilar o‘zaro topishadi.
      </p>

      <Link
        to="/freelancers"
        className="px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
      >
        Boshlash
      </Link>
    </div>
  );
}
