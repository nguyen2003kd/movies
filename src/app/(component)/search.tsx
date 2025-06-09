
type SearchMovie={
    urlmovies:string
    searchMovies:string
    searchEdit:(name:string)=>void
    clinkSearch:(url:string)=>void
}
const Search=({urlmovies,searchMovies,searchEdit,clinkSearch}:SearchMovie)=>{

      const url=urlmovies
    return(
        <>
        <form className="flex items-center relative rounded-full bg-black w-full md:w-fit lg:w-fit">
            <input type="text" value={searchMovies} onChange={(e)=>searchEdit(e.target.value)} placeholder="Enter keyword" name="keyword" className="outline-none border-none rounded-full lg:px-10 lg:py-3 px-6 py-2 bg-black placeholder-gray-500 text-white flex-1 md:flex-auto md:w-96"/>
            <button className="text-white 
            font-bold 
            text-sm 
            lg:px-10 lg:py-3    
            px-4
            rounded-full 
            bg-red-600 
            shadow-[0_0_20px_rgba(255,0,0,0.7),_0_0_20px_rgba(255,0,0,0.5)] 
            hover:shadow-[0_0_25px_rgba(255,0,0,0.9),_0_0_35px_rgba(255,0,0,0.6)] 
            hover:bg-red-700 
            transition 
            duration-300 py-1" onClick={()=>clinkSearch(url)} type="button">Search</button>
        </form>
        </>
    )
}
export default Search