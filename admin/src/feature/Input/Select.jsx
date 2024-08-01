import React from "react";

const Select = ({ children }) => {
  return (
    <>
      <select className="w-full flex justify-between outline outline-[#E5E7EB] outline-1 py-[14px] px-[16px] border border-[#E5E7EB] rounded-[8px] placeholder:text-[#C6C8CA] placeholder:text-base placeholder:font-medium  ">
        {children}
      </select>
    </>
  );
};

export default Select;
