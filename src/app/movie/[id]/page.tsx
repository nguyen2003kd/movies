"use client"
import { useParams } from "next/navigation";
import { useEffect } from "react";
import {useStoreDetail} from "../../(store)/store"
const Detail=()=>{
    const { id } = useParams();
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const {detailmovies,cast,trailer,promisesAll}=useStoreDetail((state)=>state)
    const DEFAULT_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w1280";
    const url=[ `${BASE_URL}/movie/${id}?api_key=${API_KEY}`,
                `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`,
                `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`,
                `${BASE_URL}/trending/tv/day?api_key=${API_KEY}`
    ]
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
                style={{backgroundImage: `url('${DEFAULT_IMAGE_BASE_URL}${detailmovies?.backdrop_path}')`}}
            >
                <div className="flex items-start -mx-4 max-h-fit">
                    <div className="px-4 flex-1 flex flex-col justify-between -my-2 lg:-my-4">
                        <h2 className="py-2 lg:py-4 font-bold text-white text-3xl md:text-5xl lg:text-7xl">
                            {detailmovies?.original_title}
                        </h2>
                        <div className="py-4 flex flex-wrap items-center -mx-1">
                            {detailmovies?.genres.map((item,index)=>(
                            <div key={index} className="px-1 mb-4">
                                <span className="bg-black px-4 py-1 border-2 border-white rounded-full text-white text-xs lg:text-sm">{item.name}</span>
                            </div>
                            ))}
                        </div>
                        <p className="py-2 lg:py-4 text-white text-xs md:text-sm lg:text-base">The wildly funny and touching story of a lonely Hawaiian girl and the fugitive alien who helps to mend her broken family.</p>
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
            </div>
        </>
    )
}
export default Detail