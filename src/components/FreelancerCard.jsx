import React, { useState, useEffect } from "react";

export default function FreelancerCard({
  id,
  name,
  skill,
  price,
  location = "Masofaviy",
  experience = "3 yil",
  bio = "Freelancer haqida qisqa ma'lumot mavjud emas.",
  skills = [],
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Card */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-2 transition duration-300">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xl font-bold">
            {name[0]}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500">{skill}</p>
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-600 line-clamp-2">{bio}</p>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-indigo-600 font-semibold">{price}</span>
          <button
            onClick={() => setOpen(true)}
            className="px-3 py-1.5 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Ko‘proq
          </button>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
                <p className="text-sm text-gray-500">{skill} • {location}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <hr className="my-4" />

            <p className="text-gray-700 mb-4">{bio}</p>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Ko‘nikmalar</h4>
              <div className="flex flex-wrap gap-2">
                {skills.length ? (
                  skills.map((s, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full"
                    >
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-400">Aniqlanmagan</span>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-6">Tajriba: {experience}</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => alert(`Siz ${name} bilan bog‘lanmoqchisiz (demo).`)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Bog‘lanish
              </button>
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
