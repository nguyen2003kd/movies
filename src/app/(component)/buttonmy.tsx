type MyButtonProps = {
  // children: React.ReactNode;
  href?: string;
  Click?: () => void;
  name:string
};

const MyButton: React.FC<MyButtonProps> = ({ href, Click,name}) =>  {
  if(href){
  return (
    <div className="gap-4 ml-3">
      <a
        href={`${href}`}
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
          hover:text-red-500
          transition 
          duration-300
        "
      >
        {name}
      </a>
    </div>
  );
}
  if(Click){
  return(
    <div className="gap-4 ml-3">
    <button
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
        hover:text-red-500
        transition 
        duration-300
      "
      onClick={Click}
    >
      {name}
    </button>
  </div>
  )
  }
};

export default MyButton;
  