type namebutton={
  name:string
}
const TrailerButtons = ({name}:namebutton) => {
  return (
    <div className="gap-4 ml-3">
      <a
        href="/movie/950387/trailer"
        className="
          text-white 
          font-bold 
          text-sm 
          py-2
          px-6 
          rounded-full 
          border 
          border-white 
          hover:bg-white 
          hover:text-black 
          transition 
          duration-300
        "
      >
        {name}
      </a>
    </div>
  );
};

export default TrailerButtons;
