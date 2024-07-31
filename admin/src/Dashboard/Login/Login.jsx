import React from "react";
import loginBg from "../Login/assets/backgroundDot.png";
import { PiHandWavingFill } from "react-icons/pi";
import TypeIcon from "../../shared/Icon/TypeIcon";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div
      className="w-full h-lvh bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="py-[214px]">
        <div className=" py-[100px] px-[76px] bg-[#fafafa] w-[555px] mx-auto rounded-xl">
          <div className="">
            <h2 className="text-4xl text-primary font-bold  text-center pb-10">
              WeeCash
            </h2>
            <div>
              <div className="flex items-center gap-1 ">
                <p className="text-sm text-ash font-normal ">Welcome back!</p>
                <span className="text-[#ffcf4a] text-base">
                  <PiHandWavingFill />
                </span>
              </div>
              <h2 className="text-[22px] text-black font-bold pb-[34px]">
                Login to your account
              </h2>

              <div>
                <div className="pb-5">
                  <label className="text-xs text-black font-semibold capitalize">
                    email
                  </label>
                  <div className="w-[350px] pt-1">
                    <input
                      type="email"
                      className="w-full rounded-[4px] border-[#D8D8D8] border p-3 placeholder:text-xs placeholder:text-[#757575] placeholder:font-normal outline-[#757575]"
                      placeholder="Please enter your email"
                    />
                  </div>
                </div>
                <div className="pb-5">
                  <label className="text-xs text-black font-semibold capitalize">
                    password
                  </label>
                  <div className="w-[350px] pt-1">
                    <input
                      type="password"
                      className="w-full rounded-[4px] border-[#D8D8D8] border p-3 placeholder:text-xs placeholder:text-[#757575] placeholder:font-normal outline-[#757575]"
                      placeholder="Please enter your email"
                    />
                    <TypeIcon type="eyClose" />
                  </div>
                </div>
                <div className="bg-primary text-center rounded-[4px] ">
                  <button className="text-white text-base font-bold py-[14px] ">
                    login
                  </button>
                </div>
                <div className="pt-5">
                  <Link>
                    <span className="text-xs text-[#00B8FF] font-normal border-b border-[#00B8FF] ">
                      Forget Password?
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
