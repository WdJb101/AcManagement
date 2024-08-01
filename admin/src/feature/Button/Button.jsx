import React from "react";

const Button = ({ title }) => {
  return (
    <>
      <button className="px-[28px] py-[14px] border-[#E5E7EB] border hover:bg-primary hover:text-white rounded-lg duration-300">
        {title}
      </button>
    </>
  );
};

export default Button;
