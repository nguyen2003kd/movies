import { create } from 'zustand';
type Store = {
    trailerUrl:string|null;
    isDialogOpen:boolean
    movies: {
        id: number;
        title: string;
        release_date: string;
        backdrop_path: string;
        poster_path:string
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
    poster_path:string;
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
    searchMovies:string,
    setUrl: (url: string) => void;
    fetchMovie: (url?: string) => Promise<void>;
    viewMore: () => void;
    searchEdit:(search:string)=>void
    clinkSearch:(url:string)=>void
};
type Tvseriesstore={
    moviesTV: TVShow[];
    more: number;
    movieUrl: string;
    searchMovies:string,
    setUrl: (url: string) => void;
    fetchMovie: (url?: string) => Promise<void>;
    viewMore: () => void;
    searchEdit:(search:string)=>void
    clinkSearch:(url:string)=>void
}

type detailStore={
  smilar:Movie[]
  detailmovies:{
      backdrop_path:string,
      original_title:string,
      overview:string,
      poster_path:string,
      genres:{
        name:string
      }[],
  } | null,
  cast:{
    name:string;
    profile_path:string;
    known_for_department:string;
  }[],
  trailer:{
    name:string;
    key:string
  }[],
  promisesAll:(url:string[])=>void
  
}
type DetailTV={
  smilar:TVShow[],
   detailtv:{
      backdrop_path:string,
      original_name:string,
      overview:string,
      poster_path:string,
      genres:{
        name:string
      }[],
  } | null,
    cast:{
    name:string;
    profile_path:string;
    known_for_department:string;
  }[],
    trailer:{
    name:string;
    key:string
  }[],
  promisesAll:(url:string[])=>void

}
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
    searchMovies:"",
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
      searchEdit:async (search:string)=>{
        set({searchMovies:search})
      },
      clinkSearch:async (url:string)=>{
        const { searchMovies, fetchMovie } = get()
        set({more:1})
        if(get().searchMovies){
          await fetchMovie(`${url}&query=${(searchMovies)}`);
        }
      }
      
}))
export const useStoreTV =create<Tvseriesstore>((set,get)=>({
    moviesTV:[],
    more:1,
    movieUrl:"",
    searchMovies:"",
    setUrl: (url: string) => set({ movieUrl: url }),
    fetchMovie: async (url) => {
        const fetchUrl = url || get().movieUrl;
        let page = 1;
        const allMovies: TVShow[] = [];
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
              set({ moviesTV: allMovies });
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
      searchEdit:async (search:string)=>{
        set({searchMovies:search})
      },
      clinkSearch:async (url:string)=>{
        const { searchMovies, fetchMovie } = get()
        set({more:1})
        if(get().searchMovies){
          await fetchMovie(`${url}&query=${(searchMovies)}`);
        }
      }
}))
export const useStoreDetail=create<detailStore>((set)=>({
  detailmovies: null,
  cast:[],
  trailer:[],
  smilar:[],
  promisesAll:async(url:string[])=>{
  Promise.all(url.map(url => fetch(url).then(res => res.json())))
  .then(results => {
    set({detailmovies:results[0]});
    set({cast: (results[1]?.cast?.filter((item: { known_for_department: string }) => item.known_for_department === "Acting").slice(0, 6 )) || []});
    set({trailer:results[2].results.filter((vid: { type: string; site: string; key: string }) => vid.type === "Trailer" && vid.site === "YouTube")|| []});
    set({smilar:results[3].results})
  })
  .catch(error => {
    console.error('Có lỗi xảy ra:', error);
  });
}
}))

export const useStoreDetailTV=create<DetailTV>((set)=>({
  detailtv: null,
  cast:[],
  trailer:[],
  smilar:[],
  promisesAll:async(url:string[])=>{
  Promise.all(url.map(url => fetch(url).then(res => res.json())))
  .then(results => {
    set({detailtv:results[0]});
    set({cast: (results[1]?.cast?.filter((item: { known_for_department: string }) => item.known_for_department === "Acting").slice(0, 6 )) || []});
    set({trailer:results[2].results.filter((vid: { type: string; site: string; key: string }) => vid.type === "Trailer" && vid.site === "YouTube")|| []});
    set({smilar:results[3].results})
  })
  .catch(error => {
    console.error('Có lỗi xảy ra:', error);
  });
}
}))