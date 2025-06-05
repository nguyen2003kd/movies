type ButtonTrailerProps = {
  name: string;
  onClick: () => void;
};
const TrailerButtons = ({ name, onClick }: ButtonTrailerProps) => {
  return (
    <div className="gap-4 ml-3">
      <a
        className="
          text-white 
          font-bold 
          text-sm 
          py-2
          px-5 
          rounded-full 
          border 
          border-white 
          hover:bg-white 
          hover:text-black 
          transition 
          duration-300
        "
        onClick={onClick}
      >
        {name}
      </a>
    </div>
  );
};

export default TrailerButtons;
