import Header from "./(component)/heard";
import Footer from "./(component)/footer";
import Pannerswiper from "./(component)/pannerSwiper";
import Swipermovied from "./(component)/swiperMovies";
export default function Home() {
  return (
    <>
      <div className="bg-black min-h-screen  static">
        <Header/>
        <main className="flex-1">
          <div>
            <Pannerswiper />
          </div>
          <div className="m-5">
            <Swipermovied/>
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}