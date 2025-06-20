const Footer=()=>{
    return(
    <>
    <div className="relative h-100 lg:h-120 px-8 py-12 md:p-16 bg-no-repeat w-full bg-cover bg-center"
         style={{ backgroundImage: `url('/img/Poster-v2-resized-1-1024x499.jpg')` }}
            >
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-t from-transparent to-black z-[5] pointer-events-none"></div>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 max-w-4xl h-full mx-auto flex flex-col justify-around">
            <a href="" className="flex items-center justify-center hover:cursor-pointer group">
                <img src="https://calm-cendol-f3d19f.netlify.app/assets/tmovie-55621206.png" alt="phimoi" className="mr-2 md:mr-4 w-8 md:w-12"/>
                <h1 className="text-white font-semibold text-2xl md:text-4xl group-hover:text-red-600 group-hover:transition-color duration-400">PhimMoi</h1>
            </a>
            <div className="flex text-white font-semibold text-base md:text-2xl items-start justify-between flex-wrap -mx-2">
                <a href="" className="footer-item">Home</a>
                <a href="" className="footer-item">Live</a>
                <a href="" className="footer-item">You must watch</a>
                <a href="" className="footer-item">Contact us</a>
                <a href="" className="footer-item">FAQ </a>
                <a href="" className="footer-item">Recent release</a>
                <a href="" className="footer-item">Term of services</a>
                <a href="" className="footer-item">Premium</a>
                <a href="" className="footer-item">Top IMDB</a>
                <a href="" className="footer-item">About us</a>
                <a href="" className="footer-item">Pravacy policy</a>
            </div>
        </div>
    </div>
    </>
    )
}
export default Footer