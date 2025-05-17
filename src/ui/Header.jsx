import React from "react";
import { useLogout } from "../features/authentication/useLogout";
import { HiOutlineLogout, HiOutlineUser } from "react-icons/hi";
import BtnLoader from "../ui/BtnLoader";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { logoutMutate, isLoggingOut } = useLogout();
  return (
    <div className="h-16 select-none bg-white border-b border-gray-100 w-full text-black flex items-center justify-end gap-5 pe-10">
      <div className="flex items-center gap-3">
        {user.user_metadata.avatar ? (
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <img src={user.user_metadata.avatar} />
          </div>
        ) : (
          <Avatar className="scale-90" />
        )}
        <span className="font-semibold text-gray-700">
          {user.user_metadata.fullname}
        </span>
      </div>
      <div className="relative inline-block group">
        <button
          onClick={() => navigate("/account")}
          className="hover:bg-indigo-50 p-3 active:scale-95 transition-all rounded-full"
        >
          <HiOutlineUser className="scale-150 text-indigo-600" />
        </button>
        <span className="mt-2 absolute left-1/2 -translate-x-1/2 top-full mb-2 hidden group-hover:block bg-indigo-500 opacity-80 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
          Account
        </span>
      </div>
      <div className="relative inline-block group">
        <button
          className="hover:bg-indigo-50 p-3 active:scale-95 transition-all rounded-full"
          onClick={logoutMutate}
        >
          {isLoggingOut ? (
            <div className="flex items-center gap-2">
              <BtnLoader />
            </div>
          ) : (
            <HiOutlineLogout className="scale-150 text-indigo-600" />
          )}
        </button>
        <span className="mt-2 absolute left-1/2 -translate-x-1/2 top-full mb-2 hidden group-hover:block bg-indigo-500 opacity-80 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
          Logout
        </span>
      </div>
    </div>
  );
};

export default Header;
