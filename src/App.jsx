import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Freelancers from "./pages/Freelancers";
import AdminAdd from "./pages/Login";
import Header from "./components/Header";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/freelancers" element={<Freelancers />} />
        <Route path="/qoshish" element={<AdminAdd />} /> {/* ✅ To‘g‘ri yo‘l */}
      </Routes>
    </>
  );
}
