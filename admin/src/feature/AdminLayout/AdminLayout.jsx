import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";

const AdminLayout = () => {
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-2 bg-[#f9fdfd]">
          <SideBar />
        </div>
        <div className="col-span-10 bg-[]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
