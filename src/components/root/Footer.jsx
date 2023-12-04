import React from "react";

const Footer = () => {
  const fullYear = new Date().getFullYear();
  return (
    <div className=" w-full  flex justify-center items-center  bg-[#c5aee8] px-4 md:px-10 h-[12rem]">
      
     
      {/* <div className=" text-center opacity-20" /> */}
      <p className="pt-4 text-center opacity-70">
        Copyright &copy; {fullYear} &middot;  @dev_adarsh
      </p>
    </div>

  
  );
};

export default Footer;
