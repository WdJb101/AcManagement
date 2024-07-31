import React from "react";

import { Outlet } from "react-router-dom";

import PopUp from "../popup/PopUp";
import SideBar from "../Sidebar/SideBar";

const AdminLayout = () => {
  return (
    <>
      <div className="grid grid-cols-12 bg-[#f9fdfd] h-screen">
        <div className="col-span-2">
          <SideBar />
        </div>
        <div className="col-span-10">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
