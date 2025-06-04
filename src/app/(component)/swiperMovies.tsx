"use client";
import TrailerButtons from "./buttonTrailer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const Swipermovied = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="text-white font-medium text-lg md:text-2xl">
          Trending Movie
        </span>
        <TrailerButtons name="View More" />
      </div>

      <Swiper
        slidesPerView={2}
        spaceBetween={20} 
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        className="mt-4"
      >
        {[1, 2, 3, 4].map((_, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col">
              <div
                style={{
                  backgroundImage:
                    "url('https://image.tmdb.org/t/p/w500//74hLDKjD5aGYOotO6esUVaeISa2.jpg')",
                }}
                className="relative h-72 2xl:h-80 w-full rounded-3xl bg-center bg-no-repeat bg-cover overflow-hidden group"
              >
                <div className="absolute inset-0 rounded-3xl transition duration-300 ease-in-out hover:bg-black/60"></div>
              </div>
              <h3 className="mt-3 font-bold text-white text-sm md:text-lg transition duration-300 ease-in-out group-hover:text-red-600">
                Minecraft
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Swipermovied;
