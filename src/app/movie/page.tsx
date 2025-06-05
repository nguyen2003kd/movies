"use client"
import { useEffect } from "react";
import Iconyst from "../(component)/iconytb";
import Search from "../(component)/search";
import Watchmore from "../(component)/buttonmy";
import {useStoremovie} from "../(store)/store"
const Movie = () => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const DEFAULT_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w1280";
  const movies=useStoremovie((state)=>state.movies)
  const fetchMovie=useStoremovie((state)=>state.fetchMovie)
  const viewMore=useStoremovie((stare)=>stare.viewMore)
  const setUrl=useStoremovie((state)=>state.setUrl)
  useEffect(() => {
    if (!API_KEY || !BASE_URL) {
      console.error("API_KEY hoặc BASE_URL không được định nghĩa trong .env");
      return;
    }
    setUrl(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`)
    fetchMovie(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`)
  }, [API_KEY, BASE_URL,fetchMovie,setUrl]);
    return (
        <>
        <div className="bg-[#0F0F0F] min-h-screen  static">
          <main className="flex-1">
            <div className="relative h-48 bg-[url('/img/arriere-plan-degrade-subtil-lisse_1302830-4017.avif')] bg-cover bg-center bg-no-repeat after:absolute after:bottom-0 after:left-0 break-after-right-0 after:top-0 after:bg-gradient-to-t after:from-black after:to-transparent">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-y-0 text-white text-4xl font-bold z-10">Movies</span>
              <div className="absolute bottom-0 left-0 w-full h-14 bg-gradient-to-b from-transparent to-[#0F0F0F] z-[5] pointer-events-none"></div>
            </div>
            <div className="bg-black-main px-4 md:px-8 py-8 xl:p-16">
              <div className="max-w-screen-2xl mx-auto">
              <Search/>
              <div className="flex flex-wrap -mx-2 mt-16">
                {movies.map((item,index)=>(
                  <div className="px-2 w-1/2 md:w-1/4 lg:w-1/6 mb-8" key={index} >
                    <a className="hover:cursor-pointer group/container z-10">
                  <div
                  style={{
                    backgroundImage:
                      `url('${DEFAULT_IMAGE_BASE_URL}${item.backdrop_path}')`,
                  }}
                  className="relative w-full h-72 2xl:h-80 rounded-3xl bg-center bg-no-repeat bg-cover group/poster after:content-[&quot;&quot;] after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:rounded-3xl hover:after:bg-black/60 after:transition after:ease-in-out after:duration-300"
                >
                  <Iconyst/>
                </div>
                <h3 className="mt-3 font-bold text-white text-sm md:text-lg transition duration-300 ease-in-out group-hover:text-red-600">
                  {item.title}
                </h3>
                  </a>
                  </div>
                ))}
              </div>
              <div className="text-center">
                  <Watchmore name="Watch more" Click={viewMore}/>
              </div>
              </div>
            </div>
          </main>
        </div>
        </>
    )
}

export default Movie;