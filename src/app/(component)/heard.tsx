"use client"
import { usePathname } from "next/navigation";
import { useEffect, useState } from 'react';
import Link from "next/link";

const Header = () => {
  const active  = usePathname();
  const [mainSegment,setMainSegment]=useState("")
    useEffect(() => {
    const segments = active.split('/').filter(Boolean);
    setMainSegment(segments[0]); // "movie"

    console.log('Từ đầu tiên trong URL:', mainSegment);
  }, [setMainSegment,active]);
  return (
    <header className="bg-black fixed z-999 bottom-0 right-0 left-0">
      <ul className="md:relative left-0 md:left-auto right-0 md:right-auto bottom-0 md:bottom-auto flex items-center justify-evenly bg-black-main md:bg-transparent py-2 md:py-4 -mx-4">
        <li className="px-4"><Link href="/" className={` ${active==='/'?'text-red-600 font-bold border-b-3 border-red-600':'text-white font-bold '}`}>Home</Link></li>
        <li className="px-4"><Link href="/movie" className={`${mainSegment==='movie'?'text-red-600 font-bold border-b-3 border-red-600':'text-white font-bold '}`} >Movies</Link></li>
        <li className="px-4"><Link href="/TVSeries" className={` ${mainSegment==='TVSeries'?'text-red-600 font-bold border-b-3 border-red-600':'text-white font-bold'}`}  >TV Series</Link></li>
      </ul>
    </header>
  );
};

export default Header;
