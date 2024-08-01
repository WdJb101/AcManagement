import React from "react";

const Input = ({ type, placeholder, onChange, onClick }) => {
  return (
    <>
      <input
        type={type}
        className="w-full py-[14px] px-[16px] border border-[#E5E7EB] rounded-[8px] placeholder:text-[#C6C8CA] placeholder:text-base placeholder:font-medium outline-[#C6C8CA]"
        placeholder={placeholder}
        onChange={onChange}
        onClick={onClick}
      />
    </>
  );
};

export default Input;
