// src/components/BannerSlider.jsx
import React from "react";
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
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="rounded-xl"
      >
        <SwiperSlide>
          <img
            src="https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80"
            alt="Bonus Club"
            className="w-full h-72 object-cover rounded-xl"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
            alt="Aksiya"
            className="w-full h-72 object-cover rounded-xl"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://images.unsplash.com/photo-1507209696998-3c532be9b2b4?auto=format&fit=crop&w=1200&q=80"
            alt="Reklama"
            className="w-full h-72 object-cover rounded-xl"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
