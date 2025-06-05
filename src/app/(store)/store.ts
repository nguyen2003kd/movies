import { create } from 'zustand';
type Store = {
    trailerUrl:string|null;
    isDialogOpen:boolean
    movies: {
        id: number;
        title: string;
        release_date: string;
        backdrop_path: string;
        overview: string;
      }[];
    fetchpannerSwiper:(url:string)=>void
    openDialog:(url:string)=>void
    closeDialog:()=>void
  };
type Movie={
    id: number;
    title: string;
    release_date: string;
    backdrop_path: string;
    overview: string;
}
type TVShow = {
    id: number;
    name: string;
    first_air_date: string;
    backdrop_path: string;
    overview: string;
  };
type Homestore={
    trendingMovies:Movie[]
    topRatedMovies:Movie[]
    trendingTV:TVShow[]
    promisesAll:(url:string[])=>void
};
type Moviestore={
    movies: Movie[];
    more: number;
    movieUrl: string;
    setUrl: (url: string) => void;
    fetchMovie: (url?: string) => Promise<void>;
    viewMore: () => void;
};
export const useStore=create<Store>((set)=>({
    movies:[],
    trailerUrl:null,
    isDialogOpen:false,
    openDialog : async(url:string) => {
        const res= await fetch(url)
        const data= await res.json()
        const trailer = data.results.find(
          (vid: { type: string; site: string; key: string }) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        if (trailer) {
          set({trailerUrl:`https://www.youtube.com/embed/${trailer.key}`});
          set({isDialogOpen:true});
        } else {
          alert("Không tìm thấy trailer.");
        }
      },
      closeDialog :() => {
        set({isDialogOpen:false});
        set({trailerUrl:null});
      },
      fetchpannerSwiper: async (url)=>{
        fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error("Lỗi khi gọi API");
          return res.json();
        })
        .then((data) => {
          const moviesData = data.results.slice(0, 3);
          set({ movies: moviesData })
        })
        .catch((error) => {
          console.error(error);
        });
    }
}));

export const useStorehome= create<Homestore>((set) => ({
  trendingMovies:[],
  topRatedMovies:[],
  trendingTV:[],
  promisesAll:async(url:string[])=>{
    Promise.all(url.map(url => fetch(url).then(res => res.json())))
    .then(results => {
      // results là mảng 3 phần tử, mỗi phần tử có thể có trường `results` chứa mảng phim/TV
      set({trendingMovies:results[0].results || []});
      set({topRatedMovies:results[1].results || []});
      set({trendingTV:results[2].results || []});
    })
    .catch(error => {
      console.error('Có lỗi xảy ra:', error);
    });
  }
}))
export const useStoremovie =create<Moviestore>((set,get)=>({
    movies:[],
    more:1,
    movieUrl:"",
    setUrl: (url: string) => set({ movieUrl: url }),
    fetchMovie: async (url) => {
        const fetchUrl = url || get().movieUrl;
        let page = 1;
        const allMovies: Movie[] = [];
        if (!fetchUrl) {
          console.warn("Chưa có URL");
          return;
        }
    
        set({ movieUrl: fetchUrl });
    
        try {
            do {
                const res = await fetch(`${url}&page=${page}`);
                const data = await res.json();
            
                if (!res.ok) throw new Error("Lỗi API: " + data.status_message);
                allMovies.push(...data.results);
                page++
              } while (page <= get().more);
              set({ movies: allMovies });
        }
        catch (error) {
            console.error(error);
          }
      },
      viewMore: async () => {
        if (!get().movieUrl) {
          console.warn("Không có URL để fetch thêm dữ liệu");
          return;
        }
        set({ more: get().more + 1 });
        await get().fetchMovie(get().movieUrl);
      },
}))
