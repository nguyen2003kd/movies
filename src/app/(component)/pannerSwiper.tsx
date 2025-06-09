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
          });
          document.querySelectorAll(".animate-scale-drop").forEach((el)=>{
            el.classList.remove("animate-scale")
          });
        }}
        onSlideChangeTransitionEnd={(swiper) => {
          const activeSlide = swiper.slides[swiper.activeIndex];
          const targets = activeSlide.querySelectorAll(".animated-drop");
          targets.forEach((el) => {
            el.classList.remove("drop-down");
            el.classList.remove("opacity-0");
            void (el as HTMLElement).offsetWidth;
            el.classList.add("drop-down");
          });
          const targets2=activeSlide.querySelectorAll(".aanimate-scale-drop")
          targets2.forEach((el)=>{
            void (el as HTMLElement).offsetWidth;
            el.classList.add("animate-scale")
          });
        }}
      >
        {movies.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-100 md:h-[36rem] lg:h-[42rem] px-4 md:px-12 py-12 md:py-32 flex justify-center bg-center bg-no-repeat bg-cover before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:bg-black/60 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-28 after:bg-gradient-to-t after:from-black-main after:to-transparent"
              style={{
                backgroundImage: `url(${DEFAULT_IMAGE_BASE_URL}${item.backdrop_path})`,
              }}
            >
              <div className="absolute inset-0 lg:bg-[#0F0F0F] bg-black opacity-20 z-0"></div>
              <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center max-w-screen-2xl w-full">
                <div className=" w-full lg:w-3/4 pr-8">
                  <h2
                    className="drop-down delay-[400ms] animated-drop font-bold text-4xl md:text-6xl lg:text-8xl text-white"
                  >
                    {item ? item.title : "Loading..."}
                  </h2>
                  <p
                    className="transition-opacity duration-500 delay-[600ms] opacity-100 animated-drop drop-down  font-medium text-white text-xs md:text-xl my-12  "
                  >
                    {item ? item.overview : "Loading description..."}
                  </p>
                  <div className="drop-down delay-[900ms] flex animated-drop ">
                    <ButtonWatch />
                    <ButtonTrailer name="Watch Trailer" onClick={() => openDialog(`${BASE_URL}/movie/${item.id}/videos?api_key=${API_KEY}`)} />
                  </div>
                </div>
                <div className="animate-scale-drop px-4 p-16 relative z-10 hidden lg:block lg:w-1/3">
                  <img className="w-96 h-auto rounded-3xl animate-scale shadow-xl object-cover" src={`${DEFAULT_IMAGE_BASE_URL}${item.poster_path}`} alt="Poster"  />
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
          className="relative w-full lg:h-[800px] max-w-screen-md h-[600px] mx-auto p-8 bg-[#0F0F0F] overflow-hidden flex flex-col"
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
