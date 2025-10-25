import React, { useState, useEffect } from "react";

/**
 * JobCard — karta + batafsil modal
 * Props: { id, title, company, salary, type, location, description, skills, postedAt }
 */
export default function JobCard({
  id,
  title,
  company,
  salary,
  type = "Masofaviy",
  location = "Online",
  description = "Tafsilotlar mavjud emas.",
  skills = [],
  postedAt = "2025-09-21",
}) {
  const [open, setOpen] = useState(false);

  // ESC bilan yopish
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Apply tugmasi — hozircha placeholder (backend bog'lanishi mumkin)
  function handleApply() {
    // TODO: replace with real apply flow (API call / auth check)
    alert(`Siz “${title}” lavozimiga ariza yubordingiz (demo).`);
  }

  return (
    <>
      {/* CARD */}
      <div className="group relative bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-2xl hover:border-indigo-200 transition duration-300 transform hover:-translate-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              {/* simple svg briefcase */}
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M3 7h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition">{title}</h3>
              <p className="text-sm text-gray-500">{company} • {location}</p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-indigo-600 font-bold">{salary}</div>
            <div className="text-xs text-gray-400 mt-1">{type}</div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-4 line-clamp-3">{description}</p>

        <div className="flex gap-3 mt-5">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl shadow-md hover:scale-[1.02] transition"
          >
            Batafsil
            <span aria-hidden>→</span>
          </button>

          <button
            onClick={handleApply}
            className="px-4 py-2 border rounded-xl text-sm font-medium hover:bg-gray-100 transition"
          >
            Ariza yuborish
          </button>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />

          {/* modal dialog */}
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 transform transition-all duration-200 scale-100"
          >
            {/* header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                <p className="text-sm text-gray-500 mt-1">{company} • {location}</p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-indigo-600 font-semibold">{salary}</span>
                  <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full">{type}</span>
                  <span className="text-xs text-gray-400">E'lon: {postedAt}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setOpen(false);
                    // small focus management could be added here
                  }}
                  aria-label="Close"
                  className="text-gray-500 hover:text-gray-800 text-xl"
                >
                  ✕
                </button>
              </div>
            </div>

            <hr className="my-4" />

            {/* description */}
            <div className="text-gray-700 leading-relaxed mb-4">
              {description}
            </div>

            {/* skills */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-2">Talab qilinadigan ko'nikmalar</h4>
              <div className="flex flex-wrap gap-2">
                {skills.length ? (
                  skills.map((s, idx) => (
                    <span key={idx} className="text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">{s}</span>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">Aniqlanmagan</span>
                )}
              </div>
            </div>

            {/* actions */}
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm text-gray-500">ID: {id}</div>
              <div className="flex gap-3">
                <button
                  onClick={handleApply}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Ariza yuborish
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
        </div>
      )}
    </>
  );
}
