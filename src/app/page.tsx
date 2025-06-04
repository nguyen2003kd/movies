import Header from "./(component)/heard";
import Pannerswiper from "./(component)/pannerSwiper";
import Swipermovied from "./(component)/swiperMovies";
export default function Home() {
  return (
    <>
      <div className="bg-black min-h-screen  static">
        <main className="flex-1">
          <div>
            <Pannerswiper />
          </div>
          <div className="m-5">
            <Swipermovied/>
          </div>
        </main>
        <div className="sticky z-999 bottom-0 right-0">
          <Header />
        </div>
      </div>
    </>
  );
}