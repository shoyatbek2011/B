import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../components/Modal";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setJobs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  const handleDelete = async (id, ownerId) => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser !== ownerId) return alert("⚠️ Faqat o‘zingizning e’lonni o‘chira olasiz!");
    await deleteDoc(doc(db, "jobs", id));
    setActive(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">🏢 Vakansiyalar</h2>

      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {jobs.map((job, i) => (
            <motion.div
              key={job.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              onClick={() => setActive(job)}
              className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition cursor-pointer border border-gray-100"
            >
              <h3 className="font-semibold text-lg text-gray-800">{job.title}</h3>
              <p className="text-sm text-gray-500 mb-2">🏢 {job.company}</p>
              <p className="text-gray-700 text-sm line-clamp-3">{job.description}</p>
              {job.salary && (
                <p className="text-xs text-green-600 mt-2 font-medium">
                  💰 Maosh: {job.salary}
                </p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {active && (
          <Modal onClose={() => setActive(null)}>
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-[90%] sm:w-[500px] mx-auto"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{active.title}</h3>
              <p className="text-gray-500 text-sm mb-2">🏢 {active.company}</p>

              {active.salary && (
                <p className="text-gray-700 mb-2">
                  💰 <strong>Maosh:</strong> {active.salary}
                </p>
              )}

              {active.experience && (
                <p className="text-gray-700 mb-2">
                  🧠 <strong>Tajriba:</strong> {active.experience} yil
                </p>
              )}

              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-3">
                {active.description}
              </p>

              {active.contact && (
                <a
                  href={
                    active.contact.startsWith("@")
                      ? `https://t.me/${active.contact.replace("@", "")}`
                      : active.contact.includes("+")
                      ? `tel:${active.contact}`
                      : `mailto:${active.contact}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  ✉️ Bog‘lanish
                </a>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setActive(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  Yopish
                </button>
                {localStorage.getItem("currentUser") === active.owner && (
                  <button
                    onClick={() => handleDelete(active.id, active.owner)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    O‘chirish
                  </button>
                )}
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
