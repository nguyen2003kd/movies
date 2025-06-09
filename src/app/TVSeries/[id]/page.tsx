"use client"
import { useParams } from "next/navigation";
import { useEffect } from "react";
import {useStoreDetailTV} from "../../(store)/store"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Iconyst from "@/app/(component)/iconytb";
import "swiper/css";
import "swiper/css/navigation";
const Detail=()=>{
    const { id } = useParams();
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const {smilar,detailtv,cast,trailer,promisesAll}=useStoreDetailTV((state)=>state)
    const DEFAULT_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w1280";
    const url = [
    `${BASE_URL}/tv/${id}?api_key=${API_KEY}`,
    `${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}`,
    `${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}`,
    // `${BASE_URL}/trending/tv/day?api_key=${API_KEY}`,
    `${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}`
    ];

    useEffect(()=>{
         if (!API_KEY || !BASE_URL) {
            console.error("API_KEY hoặc BASE_URL không được định nghĩa trong .env");
            return;
             }
             promisesAll(url)
            
    })
    return(
        <>
            <div className="relative px-4 md:px-8 lg:px-16 py-12 md:pt-32 md:pb-20 bg-center bg-no-repeat bg-cover z-0 before:absolute before:bottom-0 before:left-0 before:right-0 before:h-1/2 before:bg-black before:-z-10 after:absolute after:top-0 after:left-0 after:right-0 after:h-1/2 after:bg-gradient-to-t after:from-black after:to-transparent after:-z-10"
                style={{backgroundImage: `url('${DEFAULT_IMAGE_BASE_URL}${detailtv?.backdrop_path}')`}}
            >
                <div className="flex items-start -mx-4 max-h-fit">
                    <div className="px-4 flex-1 flex flex-row justify-between -my-2 lg:-my-4">
                        <div className="animate-scale-drop px-4 relative z-10 hidden lg:block lg:w-1/3">
                            <img className="w-96 h-auto rounded-3xl animate-scale shadow-xl object-cover" src={`${DEFAULT_IMAGE_BASE_URL}${detailtv?.poster_path}`} alt="Poster"  />
                        </div>    
                        <div className=" w-full lg:w-3/4 pr-8">
                            <h2 className="py-2 lg:py-4 font-bold text-white text-3xl md:text-5xl lg:text-7xl">
                            {detailtv?.original_name}
                        </h2>
                        <div className="py-4 flex flex-wrap items-center -mx-1">
                            {detailtv?.genres.map((item,index)=>(
                            <div key={index} className="px-1 mb-4">
                                <span className="bg-black px-4 py-1 border-2 border-white rounded-full text-white text-xs lg:text-sm">{item.name}</span>
                            </div>
                            ))}
                        </div>
                        <p className="py-2 lg:py-4 text-white text-xs md:text-sm lg:text-base">{detailtv?.overview  }</p>
                        <div className="py-2 lg:py-4">
                            <h3 className="text-white text-xl font-medium">Casts</h3>
                            <div className="flex flex-wrap -mx-2 mt-1">
                                {cast.map((item,index)=>(
                                <div key={index} className="w-28 px-2 mb-1">
                                    <img src={`${DEFAULT_IMAGE_BASE_URL}${item.profile_path}`} className="rounded-xl"/>
                                    <span className="text-white text-xs md:text-sm font-sm">{item.name}</span>
                                </div>
                                ))}
                            </div>
                        </div>
                        </div>     
                        
                    </div>
                </div>
            </div>
            <div className="py-2 px-4 md:px-8 lg:px-16">
                <div>
                    {trailer.map((item,index)=>(
                    <div key={index} className="mb-16">
                        <h3 className="text-white text-base md:text-2xl font-semibold mb-4">{item.name}</h3>
                        <iframe src={`https://www.youtube.com/embed/${item.key}`} title="video" width="100%" height="800px" loading="lazy" allowFullScreen></iframe>
                    </div>
                    ))}
                </div>
            </div>
            <div className="px-4 md:px-8 lg:px-16 pb-16">
                <h4 className="text-white text-base md:text-2xl font-semibold mb-4">Similar</h4>
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
            slidesPerView: 4,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 24,
          },
        }}
        className="mt-4"
      >
        {smilar.map((item, index) => (
          <SwiperSlide key={index}>
            <a href={`${item.id}`} className="hover:cursor-pointer group/container c-10 flex flex-col">
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
                {item.name}
              </h3>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
            </div>
        </>
    )
}
export default Detail