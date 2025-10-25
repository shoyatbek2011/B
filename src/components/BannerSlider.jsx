// src/components/BannerSlider.jsx

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

export default function BannerSlider() {
  return (
    <div className="w-full max-w-6xl mx-auto mt-6 rounded-xl overflow-hidden shadow-xl">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="rounded-xl"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-56 md:h-72">
            <img
              src="https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80"
              alt="Bonus Club"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
              <h2 className="text-3xl font-bold">🎁 Bonus Club</h2>
              <p className="mt-2">Ro‘yxatdan o‘ting va maxsus chegirmalarga ega bo‘ling!</p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full h-56 md:h-72">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
              alt="Aksiya"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600/70 to-purple-600/70 flex flex-col items-center justify-center text-white text-center px-4">
              <h2 className="text-3xl font-bold">🔥 Maxsus Aksiya</h2>
              <p className="mt-2">Faqat bugun: 50% chegirma!</p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative w-full h-56 md:h-72">
            <img
              src="https://images.unsplash.com/photo-1507209696998-3c532be9b2b4?auto=format&fit=crop&w=1200&q=80"
              alt="Reklama"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-4">
              <h2 className="text-3xl font-bold">📢 Reklama</h2>
              <p className="mt-2">O‘z biznesingizni biz bilan rivojlantiring!</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
