import React, { useState } from "react";
import loginBg from "../Login/assets/backgroundDot.png";
import loginsubstract from "../Login/assets/Subtracts.png";
import { PiHandWavingFill } from "react-icons/pi";
import TypeIcon from "../../shared/Icon/TypeIcon";
import { Link } from "react-router-dom";
import { IoIosEye } from "react-icons/io";

const Login = () => {
  let [password, setPassword] = useState(true);
  let [email, setEmail] = useState(true);

  let handleEyepassword = () => {
    setPassword(!password);
  };
  let handleEyeEmail = () => {
    setEmail(!email);
  };

  return (
    <div
      className="w-full h-lvh bg-cover bg-no-repeat bg-center relative overflow-x-hidden"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      {/*##############--------- form starts------############### */}
      <div className="md:py-[200px] py-5 form_animation">
        <div className=" md:py-[100px] md:px-[76px] p-5 bg-[#fafafa] min-w-[200px] md:w-[555px] mx-auto rounded-xl">
          <div className=" text_animation">
            <h2 className="text-4xl text-primary font-bold  text-center pb-10">
              WeeCash
            </h2>
            <div>
              <div className="flex items-center gap-1 text_animation">
                <p className="text-sm text-ash font-normal ">Welcome back!</p>
                <span className="text-[#ffcf4a] text-base">
                  <PiHandWavingFill />
                </span>
              </div>
              <h2 className="text-[22px] text-black font-bold pb-[34px] text_animation">
                Login to your account
              </h2>

              <div className="md:w-[350px] w-full px-2">
                <div className="pb-5 text_animation">
                  <label className="text-xs text-black font-semibold capitalize">
                    User Credential 1
                  </label>
                  <div className="relative pt-1">
                    <input
                      type={!email ? "email" : "password"}
                      className="w-full rounded-[4px] border-[#D8D8D8] border p-3 placeholder:text-xs placeholder:text-[#757575] placeholder:font-normal outline-[#757575]"
                      placeholder="Please enter your email"
                    />

                    {email ? (
                      <span
                        className="text-[#757575] text-xl absolute top-[50%] right-4 -translate-y-[50%]"
                        onClick={() => handleEyeEmail()}
                      >
                        <TypeIcon type="eyClose" />
                        {/* <IoIosEye /> */}
                      </span>
                    ) : (
                      <span
                        className="text-[#757575] text-xl absolute top-[50%] right-4 -translate-y-[50%]"
                        onClick={() => handleEyeEmail()}
                      >
                        <TypeIcon type="eyeopen" />
                      </span>
                    )}
                  </div>
                </div>
                <div className=" pb-5 text_animation">
                  <label className="text-xs text-black font-semibold capitalize">
                    User Credential 2
                  </label>
                  <div className="relative pt-1">
                    <input
                      type={!password ? "text" : "password"}
                      className="w-full rounded-[4px] border-[#D8D8D8] border p-3 placeholder:text-xs placeholder:text-[#757575] placeholder:font-normal outline-[#757575]"
                      placeholder="Please enter password"
                    />
                    {password ? (
                      <span
                        className="text-[#757575] text-xl absolute top-[50%] right-4 -translate-y-[50%]"
                        onClick={() => handleEyepassword()}
                      >
                        <TypeIcon type="eyClose" />
                        {/* <IoIosEye /> */}
                      </span>
                    ) : (
                      <span
                        className="text-[#757575] text-xl absolute top-[50%] right-4 -translate-y-[50%]"
                        onClick={() => handleEyepassword()}
                      >
                        <TypeIcon type="eyeopen" />
                      </span>
                    )}
                  </div>
                </div>
                <div className="bg-primary hover:bg-black text-center rounded-[4px]  text_animation">
                  <button className="text-white text-base font-bold py-[14px] ">
                    login
                  </button>
                </div>
                <div className="pt-5">
                  <Link to="popup">
                    <span className="text-xs text-[#00B8FF] hover:text-[#0a96cd] font-normal border-b border-[#00B8FF] ">
                      Forget Password?
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*##############--------- form ends------############### */}

      {/*##############--------- animation  left-[-6%]ends------############### */}
      <div className="w-[709px] h-[709px] bg-[#0063E6] rounded-full absolute left-[-25%] top-[20%] -translate-x-2/4 -translate-y-2/4 login_animation lg:block hidden">
        <div className="size-14 bg-[#2196F3] rounded-full absolute top-2/4  left-0 -translate-x-2/4 -translate-y-2/4"></div>
      </div>

      <div className="size-[200px] bg-[rgba(0,140,255,0.7)] absolute right-[8%] bottom-[-7%] -translate- -translate-y-0  login_animation2 lg:block hidden"></div>

      <div className="size-[200px] bg-[rgba(0,140,255,0.7)] absolute right-[4%] bottom-[-13%] login_animation2 lg:block hidden"></div>

      <div className="size-[200px] bg-[rgba(0,140,255,0.7)] absolute right-[-0%] bottom-[-20%] -translate- -translate-y-0  login_animation2 lg:block hidden"></div>

      <div className="absolute top-[-45%] right-[-30%] login_animation3 lg:block hidden">
        <picture>
          <img src={loginsubstract} alt="login animation" />
        </picture>
      </div>

      {/*##############--------- animation ends------############### */}
    </div>
  );
};

export default Login;
