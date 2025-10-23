import { useState, useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { motion, AnimatePresence } from "framer-motion";

export default function AddPostForm() {
  const [form, setForm] = useState({});
  const [category, setCategory] = useState(null);
  const [successPopup, setSuccessPopup] = useState(false);
  const inputRefs = useRef([]);

  // 🧍 Foydalanuvchiga ID beramiz (localStorage orqali)
  const currentUser =
    localStorage.getItem("currentUser") ||
    (() => {
      const id = "user_" + Math.random().toString(36).slice(2, 9);
      localStorage.setItem("currentUser", id);
      return id;
    })();

  // 🔄 input qiymatini saqlash
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ Forma to‘ldirilganini tekshirish
  const validateForm = () => {
    if (category === "jobs") {
      return ["title", "company", "salary", "experience", "description", "contact"].every(
        (f) => form[f]
      );
    } else if (category === "freelancers") {
      return ["name", "skill", "price", "bio", "comment", "contact"].every((f) => form[f]);
    }
    return false;
  };

  // 💾 Ma’lumotni Firebaseda saqlash
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("⚠️ Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }
    try {
      await addDoc(collection(db, category), {
        ...form,
        owner: currentUser,
        createdAt: Date.now(),
      });
      setForm({});
      setSuccessPopup(true);
      setTimeout(() => setSuccessPopup(false), 2500);
    } catch (err) {
      console.error("Xatolik:", err);
      alert("❌ Xatolik yuz berdi, keyinroq urinib ko‘ring.");
    }
  };

  // ⏎ Enter bosilganda keyingi inputga o‘tish
  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      } else {
        if (validateForm()) handleSubmit(e);
        else alert("⚠️ Iltimos, barcha maydonlarni to‘ldiring!");
      }
    }
  };

  // ✍️ Kategoriyaga qarab inputlar
  const renderInputs = () => {
    const inputConfigs =
      category === "jobs"
        ? [
            { name: "title", placeholder: "Lavozim nomi" },
            { name: "company", placeholder: "Kompaniya" },
            { name: "salary", placeholder: "Maosh (so‘m)" },
            { name: "experience", placeholder: "Tajriba (yil)" },
            { name: "description", placeholder: "Vakansiya tavsifi", textarea: true },
            { name: "contact", placeholder: "Bog‘lanish (tel/email/@telegram)" },
          ]
        : [
            { name: "name", placeholder: "Ism Familya" },
            { name: "skill", placeholder: "Asosiy ko‘nikma (masalan: Frontend)" },
            { name: "price", placeholder: "Narx (soatlik yoki loyiha uchun)" },
            { name: "bio", placeholder: "O‘zingiz haqingizda qisqacha", textarea: true },
            { name: "comment", placeholder: "Qo‘shimcha izoh yoki ishlar haqida ma’lumot", textarea: true },
            { name: "contact", placeholder: "Bog‘lanish (tel/email/@telegram)" },
          ];

    return inputConfigs.map((cfg, i) =>
      cfg.textarea ? (
        <textarea
          key={cfg.name}
          name={cfg.name}
          ref={(el) => (inputRefs.current[i] = el)}
          placeholder={cfg.placeholder}
          value={form[cfg.name] || ""}
          onChange={handleChange}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px]"
        />
      ) : (
        <input
          key={cfg.name}
          name={cfg.name}
          ref={(el) => (inputRefs.current[i] = el)}
          placeholder={cfg.placeholder}
          value={form[cfg.name] || ""}
          onChange={handleChange}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 mt-8">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        {/* Kategoriya tanlanmagan bo‘lsa */}
        {!category ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <h1 className="text-2xl font-bold text-indigo-700">
              Qaysi turdagi ma’lumot qo‘shmoqchisiz?
            </h1>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setCategory("jobs")}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                🚀 Vakansiya qo‘shish
              </button>
              <button
                onClick={() => setCategory("freelancers")}
                className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition"
              >
                💻 Freelancer qo‘shish
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Forma */}
            <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
              {category === "jobs" ? "📝 Yangi Vakansiya" : "📝 Yangi Freelancer"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              {renderInputs()}

              <div className="flex items-center justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setCategory(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  ⬅️ Orqaga
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </>
        )}

        {/* ✅ Muvaffaqiyat popup */}
        <AnimatePresence>
          {successPopup && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
              className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg"
            >
              ✅ Ma’lumot muvaffaqiyatli qo‘shildi!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
