import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { motion, AnimatePresence } from "framer-motion";
import BannerBackground from "../components/BannerBackground";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [selected, setSelected] = useState(null);
  const currentUser = localStorage.getItem("currentUser");

  useEffect(() => {
    const fetchJobs = async () => {
      const snapshot = await getDocs(collection(db, "jobs"));
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setJobs(data);
    };
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "jobs", id));
    setJobs(jobs.filter((j) => j.id !== id));
    setSelected(null);
  };

  const bannerUrl =
    "https://images.unsplash.com/photo-1507209696998-3c532be9b2b4?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="min-h-screen mt-32 w-full bg-gradient-to-br from-white to-indigo-50">
      <BannerBackground bgImage={bannerUrl}>
        <div className="pt-20 pb-16 px-4 text-center">
          <motion.h1
            className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            🚀 Vakansiyalar
          </motion.h1>
          <p className="text-white/90">Sizga mos ish o‘rinlarini ko‘rib chiqing</p>
        </div>
      </BannerBackground>

      <div className="container mx-auto px-4 py-12">
        {jobs.length === 0 ? (
          <p className="text-center text-gray-600">Hozircha vakansiya yo‘q</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((j, i) => (
              <motion.div
                key={j.id}
                className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-indigo-600 hover:scale-105 transition-all"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-indigo-700">{j.title}</h3>
                <p className="text-gray-500 mt-2">{j.description?.slice(0, 100)}...</p>
                <p className="text-green-600 font-bold mt-2">
                  {j.budget || "Narx belgilanmagan"}
                </p>
                <button
                  onClick={() => setSelected(j)}
                  className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Batafsil
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <>
            {/* fon orqa tomoni */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />

            {/* modal oynasi */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center p-4 z-50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-2xl">
                <h2 className="text-2xl font-bold text-indigo-700">{selected.title}</h2>
                <p className="mt-2 text-gray-700">{selected.description}</p>
                <p className="mt-3 text-green-600 font-semibold">
                  💰 {selected.budget || "Narx belgilanmagan"}
                </p>
                <p className="mt-1 text-blue-600">{selected.contact}</p>

                {/* Izoh bo‘lsa chiqaramiz */}
                {selected.comment && (
                  <p className="mt-4 italic text-gray-700 border-l-4 border-indigo-400 pl-4">
                    📝 <strong>Izoh:</strong> {selected.comment}
                  </p>
                )}

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setSelected(null)}
                    className="flex-1 py-2 border rounded-lg hover:bg-gray-50 transition"
                  >
                    Yopish
                  </button>
                  {selected.owner === currentUser && (
                    <button
                      onClick={() => handleDelete(selected.id)}
                      className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      O‘chirish
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
