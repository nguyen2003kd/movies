"use client"
import { useState } from "react";
const Header = () => {
    const [active,setActive]=useState("Home")
  return (
    <header className="bg-black fixed z-999 bottom-0 right-0 left-0">
      <ul className="md:relative left-0 md:left-auto right-0 md:right-auto bottom-0 md:bottom-auto flex items-center justify-evenly bg-black-main md:bg-transparent py-2 md:py-4 -mx-4">
        <li className="px-4"><a className={` ${active==='Home'?'text-red-600 font-bold border-b-3 border-red-600':'text-white font-bold '}`} onClick={() => setActive('Home')}>Home</a></li>
        <li className="px-4"><a className={`${active==='Movies'?'text-red-600 font-bold border-b-3 border-red-600':'text-white font-bold '}`} onClick={() => setActive('Movies')}>Movies</a></li>
        <li className="px-4"><a className={` ${active==='TV Series'?'text-red-600 font-bold border-b-3 border-red-600':'text-white font-bold'}`} onClick={() => setActive('TV Series')}>TV Series</a></li>
      </ul>
    </header>
  );
};

export default Header;
