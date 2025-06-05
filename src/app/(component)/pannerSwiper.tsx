import { useEffect, useState } from "react";
import ButtonWatch from "./buttonWatch";
import ButtonTrailer from "./buttonTrailer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const Pannerswiper = () => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const DEFAULT_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w1280";

  type Movie = {
    id: number;
    title: string;
    release_date: string;
    backdrop_path: string;
    overview: string;
    // Thường phim sẽ có video trailer trong API riêng, nhưng tạm thời mình giả sử URL trailer
  };

  const [movies, setMovies] = useState<Movie[]>([]);
  
  // State mở dialog và video trailer URL
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

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

  // Hàm mở dialog với URL video
  const openDialog = async(movieId: number) => {
    const res= await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`)
    const data= await res.json()
    const trailer = data.results.find(
      (vid: { type: string; site: string; key: string }) => vid.type === "Trailer" && vid.site === "YouTube"
    );
    if (trailer) {
      setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      setIsDialogOpen(true);
    } else {
      alert("Không tìm thấy trailer.");
    }
  };

  // Hàm đóng dialog
  const closeDialog = () => {
    setIsDialogOpen(false);
    setTrailerUrl(null);
  };

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
              className="relative h-96 w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${DEFAULT_IMAGE_BASE_URL}${item.backdrop_path})`,
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
                  <ButtonTrailer name="Watch Trailer" onClick={() => openDialog(item.id)} />
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
          className="relative w-full max-w-screen-md h-[600px] mx-auto p-8 bg-[#0F0F0F] p-4 overflow-hidden flex flex-col"
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
