
"use client"
import Pannerswiper from "./(component)/pannerSwiper";
import Swipermovied from "./(component)/swiperMovies";
import SwiperTVshow from "./(component)/swiperTVshow";
import { useState } from "react";
import { useEffect } from "react";
type Movie = {
  id: number;
  title: string;
  release_date: string;
  backdrop_path: string;
  overview: string;
};
type TVShow = {
  id: number;
  name: string;
  first_air_date: string;
  backdrop_path: string;
  overview: string;
};
export default function Home() {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const url=[
  `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`,
  `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
  `${BASE_URL}/trending/tv/day?api_key=${API_KEY}`
]
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [trendingTV, setTrendingTV] = useState<TVShow[]>([]);
  useEffect(() => {
    if (!API_KEY || !BASE_URL) {
      console.error("API_KEY hoặc BASE_URL không được định nghĩa trong .env");
      return;
    }
    Promise.all(url.map(url => fetch(url).then(res => res.json())))
      .then(results => {
        // results là mảng 3 phần tử, mỗi phần tử có thể có trường `results` chứa mảng phim/TV
        setTrendingMovies(results[0].results || []);
        setTopRatedMovies(results[1].results || []);
        setTrendingTV(results[2].results || []);
      })
      .catch(error => {
        console.error('Có lỗi xảy ra:', error);
      });
  }, [API_KEY, BASE_URL]);
  return (  
    <>
      <div>

        <main className="flex-1">
          <div>
            <Pannerswiper />
          </div>
          <div className="m-5">
            <Swipermovied title="Trending Movie" movies={trendingMovies}/>
          </div>
          <div className="m-5">
            <Swipermovied title="Top Rated Movie" movies={topRatedMovies}/>
          </div>
          <div className="m-5">
            <SwiperTVshow title="Trending TV" movies={trendingTV}/>
          </div>
        </main>
      </div>
    </>
  );
}