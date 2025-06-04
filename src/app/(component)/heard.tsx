"use client"
import { useState } from "react";
const Header = () => {
    const [active,setActive]=useState("Home")
  return (
    <header className="bg-black">
      <ul className="flex items-center justify-between m-4 p-2">
        <li><a className={` ${active==='Home'?'text-red-600 font-bold border-b-3 border-red-600':'text-white font-bold '}`} onClick={() => setActive('Home')}>Home</a></li>
        <li><a className={`${active==='Movies'?'text-red-600 font-bold border-b-3 border-red-600':'text-white font-bold '}`} onClick={() => setActive('Movies')}>Movies</a></li>
        <li><a className={` ${active==='TV Series'?'text-red-600 font-bold border-b-3 border-red-600':'text-white font-bold'}`} onClick={() => setActive('TV Series')}>TV Series</a></li>
      </ul>
    </header>
  );
};

export default Header;
