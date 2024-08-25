const Heading = ({ children }) => {
  return (
    <div className="bg-gradient-to-r from-[#004282] to-[#0073a8] text-center py-3 md:py-4 rounded-lg shadow-lg">
      <h1 className="text-2xl md:text-4xl text-white font-bold tracking-wide drop-shadow-lg">
        {children}
      </h1>
      <div className="mt-2 h-1 w-16 md:w-24 bg-white mx-auto rounded-full"></div>
    </div>
    //     <div className="text-center py-3 md:py-4 rounded-lg shadow-lg">
    //   <h1 className="text-2xl md:text-4xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#004282] to-[#0073a8] drop-shadow-lg">
    //     {children}
    //   </h1>
    //   <div className="mt-2 h-1 w-16 md:w-24 bg-gradient-to-r from-[#004282] to-[#0073a8] mx-auto rounded-full"></div>
    // </div>
  );
};

export default Heading;
