import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BannerBackground from "../components/BannerBackground";
import BannerSlider from "../components/BannerSlider";

export default function Home() {
  const bannerUrl =
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="min-h-screen mt-20 w-full bg-gradient-to-br from-white to-purple-50 flex flex-col">
      {/* Yuqori banner */}
      <BannerBackground bgImage={bannerUrl}>
        <div className="pt-20 pb-32 px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-700 drop-shadow-lg"
          >
            BirZumda 🚀
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-2xl max-w-2xl text-gray-100 mt-6 mx-auto"
          >
            Freelancerlar va ish beruvchilar uchun yagona maydon 🎯
          </motion.p>
        </div>
      </BannerBackground>

      {/* Pastki info bloki */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="flex-1 bg-white rounded-t-3xl shadow-xl p-10 max-w-3xl mx-auto mt-12 mb-16"
      >
        <h2 className="text-4xl font-extrabold text-indigo-700 mb-6 text-center tracking-wide">
          Nega <span className="text-pink-500">BirZumda</span>?
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-8 text-center italic">
          Biz freelancerlar va ish beruvchilar uchun eng qulay platformani yaratdik,
          bu yerda siz o‘z imkoniyatlaringizni maksimal darajada namoyish etishingiz va
          kerakli loyihalarni topishingiz mumkin.
        </p>

        <ul className="list-disc list-inside text-gray-600 space-y-4 max-w-xl mx-auto text-lg">
          <li>
            <span className="font-semibold text-indigo-600">🔥 Tez va oson ish topish:</span> Sizning vaqtingiz — eng
            qimmatli resursingiz.
          </li>
          <li>
            <span className="font-semibold text-indigo-600">💼 Shaxsiy profil:</span> Ko‘nikmalaringizni to‘liq namoyish eting.
          </li>
          <li>
            <span className="font-semibold text-indigo-600">🤝 To‘g‘ridan-to‘g‘ri aloqa:</span> Ish beruvchilar bilan tez va
            qulay bog‘laning.
          </li>
          <li>
            <span className="font-semibold text-indigo-600">⚡ Oddiy interfeys:</span> Keraksiz murakkabliklarsiz.
          </li>
          <li>
            <span className="font-semibold text-indigo-600">📱 Har qanday qurilmada ishlash:</span> Responsive va
            mobilga mos.
          </li>
        </ul>

        <motion.div
          className="mt-10 flex justify-center gap-4 flex-wrap"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
        >
          <Link
            to="/freelancers"
            className="px-8 py-3 bg-pink-600 text-white font-semibold rounded-xl shadow-lg hover:bg-pink-700 transition transform hover:scale-105"
          >
            Freelancerlarni ko‘rish
          </Link>

          <Link
            to="/jobs"
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:scale-105"
          >
            Ishlarni ko‘rish
          </Link>
        </motion.div>
      </motion.section>

      {/* Slider joyi (agar kerak bo‘lsa) */}
      <div className="flex-1 max-w-5xl mx-auto px-4 mb-16">
        {/* <BannerSlider /> */}
      </div>
    </div>
  );
}
