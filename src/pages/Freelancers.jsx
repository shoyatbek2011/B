import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { motion, AnimatePresence } from "framer-motion";
import BannerBackground from "../components/BannerBackground";

export default function Freelancers() {
  const [freelancers, setFreelancers] = useState([]);
  const [selected, setSelected] = useState(null);
  const currentUser = localStorage.getItem("currentUser");

  useEffect(() => {
    const fetchFreelancers = async () => {
      const snapshot = await getDocs(collection(db, "freelancers"));
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setFreelancers(data);
    };
    fetchFreelancers();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "freelancers", id));
    setFreelancers(freelancers.filter((f) => f.id !== id));
    setSelected(null);
  };

  const bannerUrl = "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="min-h-screen mt-32 w-full bg-gradient-to-br from-white to-purple-50">
      <BannerBackground bgImage={bannerUrl}>
        <div className="pt-20 pb-16 px-4 text-center">
          <motion.h1
            className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            👨‍💻 Freelancerlar
          </motion.h1>
          <p className="text-white/90">Sizga mos freelancerlarni toping</p>
        </div>
      </BannerBackground>

      <div className="container mx-auto px-4 py-12">
        {freelancers.length === 0 ? (
          <p className="text-center text-gray-600">Hozircha freelancer yo‘q</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {freelancers.map((f, i) => (
              <motion.div
                key={f.id}
                className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 transition-all"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-indigo-500 text-white flex items-center justify-center font-bold text-xl shadow-lg mb-4">
                  {f.name?.charAt(0) || "F"}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{f.name}</h3>
                <p className="text-gray-500">{f.skill}</p>
                <p className="text-green-600 font-bold mt-2">{f.price || "—"}</p>
                <button
                  onClick={() => setSelected(f)}
                  className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Batafsil
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center p-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-purple-700">{selected.name}</h2>
                <p className="text-gray-500">{selected.skill}</p>
                <p className="mt-2">{selected.bio}</p>

                {/* Yangi qo'shilgan comment */}
                {selected.comment && (
                  <p className="mt-4 italic text-gray-700 border-l-4 border-purple-400 pl-4">
                    📝 <strong>Izoh:</strong> {selected.comment}
                  </p>
                )}

                <p className="mt-2 text-blue-600">{selected.contact}</p>

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
