import React from "react";
import logo from "../assets/logo5.png";
import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineHomeModern,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

const Sidebar = () => {
  return (
    <div className="bg-white border-r border-gray-100 w-2/12 select-none">
      <div className="flex flex-col mt-5 space-y-1 items-center justify-center">
        <img
          src={logo}
          className="w-24 text-center select-none"
          alt="The Verdant Stay"
        />
        <p className="text-gray-800 text-sm uppercase font-semibold tracking-widest select-none">
          The Verdant Stay
        </p>
      </div>
      <div className="mt-10 flex flex-col items-center justify-center m-2 gap-3">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "transition-all bg-indigo-50 p-2 w-full text-left px-5 rounded-lg"
              : "transition-all hover:bg-indigo-200 hover:bg-opacity-10 p-2 w-full text-gray-800 rounded-lg text-left px-5"
          }
        >
          {({ isActive }) => (
            <span className="flex items-center gap-4 font-semibold text-gray-800">
              <HiOutlineHome
                className={
                  isActive
                    ? "scale-150 text-indigo-600"
                    : "scale-150 opacity-70"
                }
              />
              Home
            </span>
          )}
        </NavLink>

        <NavLink
          to="/bookings"
          className={({ isActive }) =>
            isActive
              ? "transition-all bg-indigo-50 p-2 w-full text-left px-5 rounded-lg"
              : "transition-all hover:bg-indigo-200 hover:bg-opacity-10 p-2 w-full text-gray-800 rounded-lg text-left px-5"
          }
        >
          {({ isActive }) => (
            <span className="flex items-center gap-4 font-semibold text-gray-800">
              <HiOutlineCalendarDays
                className={
                  isActive
                    ? "scale-150 text-indigo-600"
                    : "scale-150 opacity-70"
                }
              />
              Bookings
            </span>
          )}
        </NavLink>

        <NavLink
          to="/cabins"
          className={({ isActive }) =>
            isActive
              ? "transition-all bg-indigo-50 p-2 w-full text-left px-5 rounded-lg"
              : "transition-all hover:bg-indigo-200 hover:bg-opacity-10 p-2 w-full text-gray-800 rounded-lg text-left px-5"
          }
        >
          {({ isActive }) => (
            <span className="flex items-center gap-4 font-semibold text-gray-800">
              <HiOutlineHomeModern
                className={
                  isActive
                    ? "scale-150 text-indigo-600"
                    : "scale-150 opacity-70"
                }
              />
              Cabins
            </span>
          )}
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive
              ? "transition-all bg-indigo-50 p-2 w-full text-left px-5 rounded-lg"
              : "transition-all hover:bg-indigo-200 hover:bg-opacity-10 p-2 w-full text-gray-800 rounded-lg text-left px-5"
          }
        >
          {({ isActive }) => (
            <span className="flex items-center gap-4 font-semibold text-gray-800">
              <HiOutlineUsers
                className={
                  isActive
                    ? "scale-150 text-indigo-600"
                    : "scale-150 opacity-70"
                }
              />
              Users
            </span>
          )}
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "transition-all bg-indigo-50 p-2 w-full text-left px-5 rounded-lg"
              : "transition-all hover:bg-indigo-200 hover:bg-opacity-10 p-2 w-full text-gray-800 rounded-lg text-left px-5"
          }
        >
          {({ isActive }) => (
            <span className="flex items-center gap-4 font-semibold text-gray-800">
              <HiOutlineCog6Tooth
                className={
                  isActive
                    ? "scale-150 text-indigo-600"
                    : "scale-150 opacity-70"
                }
              />
              Settings
            </span>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
