import React, { useState } from "react";
import { useForm } from "react-hook-form";
import BtnLoader from "./BtnLoader";
import { useUpdateUser } from "../features/users/useUpdateUser";
import Loader from "../ui/Loader";
import { useUser } from "../features/authentication/useUser";
import UpdatePassword from "./updatePassword";

const UpdateSettingForm = () => {
  const { isUpdating, updateUserMutate } = useUpdateUser();
  const {
    isPending,
    user: {
      email,
      user_metadata: { fullname: currentFullname, avatar: currentAvatar },
    },
  } = useUser();
  console.log(currentAvatar);

  const [fullname, setFullname] = useState(currentFullname);
  const [avatar, setAvatar] = useState(null);

  const isWorking = isUpdating || isPending;

  const handleUserUpdation = (e) => {
    e.preventDefault();
    if (!fullname) return;
    updateUserMutate(
      { fullname, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  };

  if (isPending) return <Loader />;
  return (
    <div>
      <h1 className="text-xl font-semibold mt-10 mb-5">Update user data</h1>

      <div className="bg-white w-[700px] flex items-center justify-center p-10 rounded-lg select-none">
        <form
          onSubmit={handleUserUpdation}
          className="w-[550px] space-y-4 font-semibold text-[15px]"
        >
          <div className="flex items-center justify-between">
            <label htmlFor="email">Email address</label>
            <div className="flex flex-col items-start">
              <input
                disabled
                defaultValue={email}
                id="email"
                className="cursor-not-allowed py-2 w-72 focus:outline-none px-2 focus:ring-1 ring-gray-700 ring-opacity-25 border-2 border-gray-700 border-opacity-20 rounded-md"
                type="email"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="fullname">Full Name</label>
            <div className="flex flex-col items-start">
              <input
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                defaultValue={currentFullname}
                disabled={isWorking}
                id="fullname"
                className="py-2 w-72 focus:outline-none px-2 focus:ring-1 ring-gray-700 ring-opacity-25 border-2 border-gray-700 border-opacity-20 rounded-md"
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="avatar">Avatar image</label>
            <div className="flex flex-col items-start">
              <input
                onChange={(e) => setAvatar(e.target.files[0])}
                disabled={isWorking}
                accept="image/*"
                id="avatar"
                className={`${
                  isWorking
                    ? `py-2 w-72 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-[15px] file:font-semibold file:bg-gray-200 file:text-gray-600`
                    : `py-2 w-72 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-[15px] file:font-semibold file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200 transition-all`
                }`}
                type="file"
              />
            </div>
          </div>

          <div className="flex gap-5 justify-end w-full mt-5">
            <button
              disabled={isWorking}
              type="reset"
              onClick={() => {
                setAvatar(null);
                setFullname(currentFullname);
              }}
              className={`${
                isWorking
                  ? `cursor-not-allowed px-3 py-2 text-[15px] rounded-md transition-all border-2 border-gray-700 border-opacity-15 text-black opacity-60`
                  : `px-3 active:scale-95 py-2 text-[15px] rounded-md transition-all border-2 border-gray-700 border-opacity-15 text-black hover:bg-opacity-5 hover:bg-gray-700`
              }`}
            >
              Cancel
            </button>
            <button
              disabled={isWorking}
              type="submit"
              className={`${
                isWorking
                  ? `cursor-not-allowed bg-indigo-400 opacity-60 text-white text-[15px] px-3 py-2 rounded-md transition-all`
                  : `bg-indigo-500 active:scale-95 text-[15px] text-white px-3 py-2 rounded-md transition-all hover:bg-indigo-600`
              }`}
            >
              {isWorking ? (
                <div className="flex items-center gap-2">
                  <BtnLoader />
                  <p>Updating account...</p>
                </div>
              ) : (
                "Update account"
              )}
            </button>
          </div>
        </form>
      </div>
      <div>
        <h1 className="text-xl font-semibold mt-10 mb-5">Update password</h1>
        <UpdatePassword />
      </div>
    </div>
  );
};

export default UpdateSettingForm;
