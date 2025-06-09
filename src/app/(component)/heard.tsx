"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from 'react';
import Link from "next/link";

const Header = () => {
  const active = usePathname();
  const [mainSegment, setMainSegment] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Lấy phần đầu URL
  useEffect(() => {
    const segments = active.split('/').filter(Boolean);
    setMainSegment(segments[0]);
  }, [active]);

  // Lắng nghe scroll để đổi màu nền header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Gỡ sự kiện khi unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`px-8 flex justify-center fixed w-full z-50 ease-in-out py-0 md:py-2
      ${isScrolled ? 'bg-black' : 'bg-transparent'}`}>
      <div className="max-w-screen-2xl flex justify-between items-center w-full">
        <Link className="hidden md:flex items-center hover:cursor-pointer group" href="/">
          <img src="https://calm-cendol-f3d19f.netlify.app/assets/tmovie-55621206.png" alt="Logo" className="mr-4 w-8 md:w-12" />
          <h1 className="text-white font-semibold text-2xl md:text-4xl group-hover:text-red-main group-hover:transition-custom">PhimMoi</h1>
        </Link>

        <div className="fixed md:relative left-0 md:left-auto right-0 md:right-auto bottom-0 md:bottom-auto flex items-center justify-evenly bg-black md:bg-transparent py-2 md:py-4 -mx-4">
          <div className="px-4">
            <Link href="/" className={`${active === '/' ? 'nav-item active' : 'nav-item'}`}>Home</Link>
          </div>
          <div className="px-4">
            <Link href="/movie" className={`${mainSegment === 'movie' ? 'nav-item active' : 'nav-item'}`}>Movies</Link>
          </div>
          <div className="px-4">
            <Link href="/TVSeries" className={`${mainSegment === 'TVSeries' ? 'nav-item active' : 'nav-item'}`}>TV Series</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
