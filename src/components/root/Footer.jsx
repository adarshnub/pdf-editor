import React from "react";

const Footer = () => {
  const fullYear = new Date().getFullYear();
  return (
    <div className="sticky top-0 w-full flex justify-center items-center py-6 bg-[#46c6e9] px-4 md:px-10 h-[12rem]">
      
     
      <div className="border border-x-0 border-b-0 border-t-white text-center opacity-20" />
      <p className="pt-4 text-center opacity-70">
        Copyright &copy; {fullYear} &middot;  @dev_adarsh
      </p>
    </div>

  
  );
};

export default Footer;
