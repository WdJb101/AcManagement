import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import PopUp from "../popup/PopUp";
import SideBar from "../Sidebar/SideBar";
import { FaBars } from "react-icons/fa";
import { TfiClose } from "react-icons/tfi";
import logo from "../../assets/logo/main-logo.png";

import { MdOutlineLogin } from "react-icons/md";
const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="">
      <div className="w-full  shadow-md md:hidden bg-white flex justify-between z-[5000] items-center p-4 fixed top-0 left-0">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="text-2xl">
            {isSidebarOpen ? <TfiClose /> : <FaBars />}
          </button>
        </div>
        <div className="flex items-center">
          <div className="mr-4">
            <img src={logo} alt="Logo" className="h-8" />
          </div>
          <div>
            <button className="bg-[#004282] text-white px-2 py-1 rounded-md">
              <MdOutlineLogin className="text-xl" />
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          transform: isSidebarOpen ? "translateX(0)" : "translateX(-200%)",
        }}
        className={`bg-[#f9fdfd] fixed top-0 left-0 md:hidden block h-full w-[100px] transition-transform duration-300 ease-in-out z-40`}
      >
        <SideBar />
      </div>

     <div className="flex">
     <div style={{ width: "100px" }} className="md:block hidden">
        <SideBar />
      </div>

      <div
        className={`flex-1 transition-all duration-300 md:pt-0   bg-[#F4F5F9] pt-[64px]`} 
      >
        <Outlet />
      </div>
     </div>
    </div>
  );
};

export default AdminLayout;
