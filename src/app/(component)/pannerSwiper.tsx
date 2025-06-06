import { useEffect } from "react";
import ButtonWatch from "./buttonWatch";
import ButtonTrailer from "./buttonTrailer";
import {useStore} from "../(store)/store"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const Pannerswiper = () => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const DEFAULT_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w1280";

  
  // State mở dialog và video trailer URL
  const isDialogOpen=useStore((stare)=>stare.isDialogOpen)
  const trailerUrl=useStore((stare)=>stare.trailerUrl)
  const fetchpannerSwiper=useStore((state)=>state.fetchpannerSwiper)
  const movies=useStore((state)=>state.movies)
  useEffect(() => {
    if (!API_KEY || !BASE_URL) {
      console.error("API_KEY hoặc BASE_URL không được định nghĩa trong .env");
      return;
    }
    fetchpannerSwiper(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`)
  }, [API_KEY, BASE_URL,fetchpannerSwiper]);

  // Hàm mở dialog với URL video
  const openDialog=useStore((stare)=>stare.openDialog)
  // Hàm đóng dialog
  const closeDialog=useStore((stare)=>stare.closeDialog)

  return (
    <>
      <Swiper
        loop={true}
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
        {movies.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-100 w-full bg-cover bg-center flex justify-center md:h-[36rem] lg:h-[52rem] px-4 md:px-12 py-12 md:py-32  bg-no-repeat before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:bg-black/60 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-28 after:bg-gradient-to-t after:from-black-main after:to-transparent"
              style={{
                backgroundImage: `url(${DEFAULT_IMAGE_BASE_URL}${item.backdrop_path})`,
              }}
            >
              <div className="absolute inset-0 bg-black opacity-40 max-w-screen-2xl z-10 h-fit flex items-center justify-between"></div>
              <div className="max-w-screen-2xl z-10 h-fit flex items-center justify-between">
                <div className="lg:w-2/3 relative z-10 items-center p-10">
                  <h2
                    className="animated-drop font-bold text-4xl md:text-6xl lg:text-8xl text-white  transition duration-700 ease-in-out opacity-100 translate-y-0 "
                    style={{ animationDelay: "0.2s" }}
                  >
                    {item ? item.title : "Loading..."}
                  </h2>
                  <p
                    className="font-medium text-white text-xs md:text-xl my-12 delay-[600ms] transition duration-700 ease-in-out opacity-100 translate-y-0 animated-drop"
                    style={{ animationDelay: "0.5s" }}
                  >
                    {item ? item.overview : "Loading description..."}
                  </p>
                  <div className="flex animated-drop " style={{ animationDelay: "0.7s" }}>
                    <ButtonWatch />
                    <ButtonTrailer name="Watch Trailer" onClick={() => openDialog(`${BASE_URL}/movie/${item.id}/videos?api_key=${API_KEY}`)} />
                  </div>
                </div>
                <div className="px-4 p-16  h-20 relative z-10 hidden lg:block lg:w-1/3">
                  <img className="w-96 rounded-3xl animate-scale" src={`${DEFAULT_IMAGE_BASE_URL}${item.backdrop_path}`} alt="Poster"></img>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-black z-[5] pointer-events-none"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dialog chứa video trailer */}
      {isDialogOpen && (
        <div className="fixed inset-0  bg-opacity-80 z-50 flex justify-center items-center">
        <div
          className="relative w-full max-w-screen-md h-[500px] mx-auto p-8 bg-[#0F0F0F] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-1 right-3 text-white text-2xl z-10"
            onClick={closeDialog}
          >
            &times;
          </button>
          <iframe
            className="w-full h-full"
            src={trailerUrl || ""}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
      )}
    </>
  );
};

export default Pannerswiper;
