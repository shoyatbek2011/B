import { useState, useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";


export default function AdminAdd() {
  const [form, setForm] = useState({});
  const [category, setCategory] = useState(null);
  const [successPopup, setSuccessPopup] = useState(false);
  const inputRefs = useRef([]);

  const currentUser =
    localStorage.getItem("currentUser") ||
    (() => {
      const id = "user_" + Math.random().toString(36).slice(2, 9);
      localStorage.setItem("currentUser", id);
      return id;
    })();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    if (category === "jobs") {
      return (
        form.title &&
        form.company &&
        form.salary &&
        form.experience &&
        form.description &&
        form.contact
      );
    } else if (category === "freelancers") {
      return (
        form.name &&
        form.skill &&
        form.price &&
        form.bio &&
        form.contact &&
        form.comment // endi comment ham kerak
      );
    }
    return false;
  };

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
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      } else {
        if (validateForm()) {
          handleSubmit(e);
        } else {
          alert("⚠️ Iltimos, barcha maydonlarni to‘ldiring!");
        }
      }
    }
  };

  return (
    <div className="min-h-screen mt-32 py-16 px-6 ">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        {!category ? (
          <div className="text-center space-y-6">
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
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
              {category === "jobs" ? "📝 Yangi Vakansiya" : "📝 Yangi Freelancer"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              {category === "jobs" ? (
                <>
                  <input
                    name="title"
                    ref={(el) => (inputRefs.current[0] = el)}
                    placeholder="Lavozim nomi"
                    value={form.title || ""}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, 0)}
                    className="w-full p-3 border rounded-lg"
                  />
                  <input
                    name="company"
                    ref={(el) => (inputRefs.current[1] = el)}
                    placeholder="Kompaniya"
                    value={form.company || ""}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, 1)}
                    className="w-full p-3 border rounded-lg"
                  />
                  <input
                    name="salary"
                    ref={(el) => (inputRefs.current[2] = el)}
                    placeholder="Maosh (so‘m)"
                    value={form.salary || ""}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, 2)}
                    className="w-full p-3 border rounded-lg"
                  />
                  <input
                    name="experience"
                    ref={(el) => (inputRefs.current[3] = el)}
                    type="number"
                    placeholder="Tajriba (yil)"
                    value={form.experience || ""}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, 3)}
                    className="w-full p-3 border rounded-lg"
                  />
                  <textarea
                    name="description"
                    ref={(el) => (inputRefs.current[4] = el)}
                    placeholder="Vakansiya tavsifi"
                    value={form.description || ""}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, 4)}
                    className="w-full p-3 border rounded-lg"
                  />
                  <input
                    name="contact"
                    ref={(el) => (inputRefs.current[5] = el)}
                    placeholder="Bog‘lanish (tel/email/@telegram)"
                    value={form.contact || ""}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, 5)}
                    className="w-full p-3 border rounded-lg"
                  />
                </>
              ) : (
                <>
                  <input
                    name="name"
                    ref={(el) => (inputRefs.current[0] = el)}
                    placeholder="Ism Familya"
                    value={form.name || ""}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, 0)}
                    className="w-full p-3 border rounded-lg"
                  />
                  <input
                    name="skill"
                    ref={(el) => (inputRefs.current[1] = el)}
                    placeholder="Asosiy ko‘nikma (masalan: Frontend)"
                    value={form.skill || ""}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, 1)}
                    className="w-full p-3 border rounded-lg"
                  />
                  <input
                    name="price"
                    ref={(el) => (inputRefs.current[2] = el)}
                    placeholder="Narx (soatlik yoki loyiha uchun)"
                    value={form.price || ""}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, 2)}
                    className="w-full p-3 border rounded-lg"
                  />
                  <textarea
                    name="bio"
                    ref={(el) => (inputRefs.current[3] = el)}
                    placeholder="O‘zingiz haqingizda qisqacha"
                    value={form.bio || ""}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, 3)}
                    className="w-full p-3 border rounded-lg"
                  />
                  <textarea
                    name="comment"
                    ref={(el) => (inputRefs.current[4] = el)}
                    placeholder="Ish beruvchiga qo'shimcha izoh yoki ishlar haqida ma'lumot"
                    value={form.comment || ""}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, 4)}
                    className="w-full p-3 border rounded-lg"
                  />
                  <input
                    name="contact"
                    ref={(el) => (inputRefs.current[5] = el)}
                    placeholder="Bog‘lanish (tel/email/@telegram)"
                    value={form.contact || ""}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, 5)}
                    className="w-full p-3 border rounded-lg"
                  />
                </>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
                >
                  Qo‘shish
                </button>
                <button
                  type="button"
                  onClick={() => setCategory(null)}
                  className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition"
                >
                  ◀️ Orqaga
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      {successPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="bg-green-500 text-white px-8 py-6 rounded-xl shadow-lg text-center relative z-10 animate-bounce">
            ✅ Muvaffaqiyatli qo‘shildi!
          </div>
        </div>
      )}
    </div>
  );
}
