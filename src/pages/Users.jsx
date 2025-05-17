import React from "react";
import SignupForm from "../ui/SignupForm";

const Users = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl select-none text-gray-800">
        Create a new user
      </h1>
      <div className="bg-white w-[700px] flex items-center justify-center p-10 mt-10 rounded-lg">
        <SignupForm />
      </div>
    </div>
  );
};

export default Users;
