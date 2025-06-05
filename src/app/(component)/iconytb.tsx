const Iconyst=()=>{
    return(
        <div className="relative w-full h-72 2xl:h-80 rounded-3xl bg-center bg-no-repeat bg-cover group/poster  after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:rounded-3xl hover:after:bg-black/60 after:transition after:ease-in-out after:duration-300">
        <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-4 px-8 bg-red-main rounded-full shadow-btn z-10 text-white text-xl scale-50 opacity-0 transition ease-in-out duration-300 group-hover/poster:opacity-100 group-hover/poster:scale-100 hover:shadow-btn-hover hover:shadow-[0_0_40px_rgba(255,0,0,0.9),_0_0_50px_rgba(255,0,0,0.6)] 
        hover:bg-red-700  bg-red-600 
        shadow-[0_0_20px_rgba(255,0,0,0.7),_0_0_35px_rgba(255,0,0,0.5)]  ">
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z">
            </path>
          </svg>
        </button>
      </div>
    )
}
export default Iconyst