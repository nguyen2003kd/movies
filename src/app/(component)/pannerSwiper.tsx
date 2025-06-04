"use client";
import { useEffect, useState } from "react";
import "dotenv/config";
import ButtonWatch from "./buttonWatch";
import ButtonTrailer from "./buttonTrailer";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'; 
const Pannerswiper = () => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const DEFAULT_IMAGE_BASE_URL ="https://image.tmdb.org/t/p/w1280";

  type Movie = {
    id: number;
    title: string;
    release_date: string;
    backdrop_path: string;
    overview: string;
  };

  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    if (!API_KEY || !BASE_URL) {
      console.error("API_KEY hoặc BASE_URL không được định nghĩa trong .env");
      return;
    }

    fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`)
      .then((res) => {
        if (!res.ok) throw new Error("Lỗi khi gọi API");
        return res.json();
      })
      .then((data) => {
        const moviesData = data.results.slice(0, 3);
        setMovies(moviesData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [API_KEY, BASE_URL]);

  return (
    <>
    <Swiper
      onSlideChangeTransitionStart={() => {
        document.querySelectorAll(".animated-drop").forEach((el) => {
          el.classList.remove("drop-down");
          el.classList.add("opacity-0", "invisible");
        });
      }}
      onSlideChangeTransitionEnd={(swiper) => {
        const activeSlide = swiper.slides[swiper.activeIndex];
        const targets = activeSlide.querySelectorAll(".animated-drop");
        targets.forEach((el) => {
          el.classList.remove("drop-down");
          void (el as HTMLElement).offsetWidth; // reset animation
          el.classList.remove("opacity-0", "invisible");
          el.classList.add("drop-down");
        });
      }}
    >
      {movies.map((item,index)=>(
        <SwiperSlide key={index}>
          <div
            className="relative h-96 w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${DEFAULT_IMAGE_BASE_URL}${item.backdrop_path})`
            }}
          >
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <div className="relative z-10 items-center p-10">
              <h2
                className="w-3/4 font-bold text-4xl md:text-6xl lg:text-8xl text-white animated-drop "
                style={{ animationDelay: "0.2s" }}
              >
                {item ? item.title : "Loading..."}
              </h2>
              <p
                className="font-medium text-white text-xs md:text-xl my-12 animated-drop"
                style={{ animationDelay: "0.5s" }}
              >
                {item ? item.overview : "Loading description..."}
              </p>
              <div className="flex animated-drop " style={{ animationDelay: "0.7s" }}>
                <ButtonWatch />
                <ButtonTrailer name={"Watch trailer"}/>
              </div>
            </div>
             <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-black z-[5] pointer-events-none"></div>
          </div>
        </SwiperSlide>
      ))}
     </Swiper>
    </>
  );
};

export default Pannerswiper;