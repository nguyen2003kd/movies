"use client"
import Pannerswiper from "./(component)/pannerSwiper";
import Swipermovied from "./(component)/swiperMovies";
import SwiperTVshow from "./(component)/swiperTVshow";
import { useEffect } from "react";
import {useStorehome} from "./(store)/store"
export default function Home() {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const trendingMovies=useStorehome((state)=>state.trendingMovies)
  const topRatedMovies=useStorehome((state)=>state.topRatedMovies)
  const trendingTV=useStorehome((state)=>state.trendingTV)
  const promisesAll=useStorehome((state)=>state.promisesAll)
  useEffect(() => {
    if (!API_KEY || !BASE_URL) {
      console.error("API_KEY hoặc BASE_URL không được định nghĩa trong .env");
      return;
    }
    const url = [
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`,
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
      `${BASE_URL}/trending/tv/day?api_key=${API_KEY}`
    ];
    promisesAll(url)
  }, [API_KEY, BASE_URL, promisesAll]);
  return (  
    <>
      <div>

        <main >
            <Pannerswiper />
          <div className="bg-black-main px-4 md:px-8 py-8 md:py-16">
            <Swipermovied title="Trending Movie" movies={trendingMovies}/>
            <Swipermovied title="Top Rated Movie" movies={topRatedMovies}/>
            <SwiperTVshow title="Trending TV" movies={trendingTV}/>
          </div>
        </main>
      </div>
    </>
  );
}