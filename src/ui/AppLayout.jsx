import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "../App.css";

const AppLayout = () => {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <div className="h-16 text-white">
          <Header />
        </div>

        <div className="flex-1 bg-gray-50 custom-scrollbar overflow-auto py-3 px-7">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
