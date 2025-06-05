
const WatchButtons = () => {
  return (
    <div className="gap-4">
      <a
        href="btn-lg btn-primary mr-4"  
        className="
          text-white 
          font-bold 
          text-sm 
          py-2
          px-6 
          rounded-full 
          bg-red-600 
          shadow-[0_0_15px_rgba(255,0,0,0.7),_0_0_30px_rgba(255,0,0,0.5)] 
          hover:shadow-[0_0_25px_rgba(255,0,0,0.9),_0_0_35px_rgba(255,0,0,0.6)] 
          hover:bg-red-700 
          transition 
          duration-300
        "
      >
        Watch now
      </a>
    </div>
  );
};

export default WatchButtons;
