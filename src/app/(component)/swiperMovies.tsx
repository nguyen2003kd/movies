"use client";
import Viewmore from "./buttonmy";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Iconyst from "./iconytb";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
type Movie = {
  id: number;
  title: string;
  release_date: string;
  backdrop_path: string;
  overview: string;
};
const Swipermovied = ({title,movies}:{title:string,movies:Movie[]}) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="text-white font-medium text-lg md:text-2xl">
          {title}
        </span>
        <Viewmore name="View more" href=""/>
      </div>

      <Swiper
      modules={[Autoplay, Navigation]}
        slidesPerView={2}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }} 
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
        {movies.map((item, index) => (
          <SwiperSlide key={index}>
            <a className="hover:cursor-pointer group/container c-10 flex flex-col">
              <div
                style={{
                  backgroundImage:
                    `url('https://image.tmdb.org/t/p/w1280/${item.backdrop_path}')`,
                }}
                className="relative h-72 2xl:h-80 w-full rounded-3xl bg-center bg-no-repeat bg-cover overflow-hidden group"
              >
                <Iconyst/>
              </div>
              <h3 className="mt-3 font-bold text-white text-sm md:text-lg transition duration-300 ease-in-out group-hover:text-red-600">
                {item.title}
              </h3>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Swipermovied;
