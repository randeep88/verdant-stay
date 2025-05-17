import React from "react";
import BtnLoader from "./BtnLoader";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "../features/users/useUpdateUser";
import toast from "react-hot-toast";

const UpdatePassword = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm();

  const { isUpdating, updateUserMutate } = useUpdateUser();

  const onSubmit = ({ password }) => {
    updateUserMutate(
      { password },
      {
        onSuccess: () => {
          reset;
        },
      }
    );
  };

  return (
    <div className="bg-white w-[700px] flex flex-col items-center select-none justify-center p-10 rounded-lg font-semibold">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between w-[550px] mb-4">
          <label htmlFor="password">
            New password <br />{" "}
            <span className="text-sm text-gray-500">(min 8 characters)</span>
          </label>
          <div className="flex flex-col items-start">
            <input
              disabled={isUpdating}
              id="password"
              className="py-2 w-72 focus:outline-none px-2 focus:ring-1 ring-gray-700 ring-opacity-25 border-2 border-gray-700 border-opacity-20 rounded-md"
              type="number"
              {...register("password", {
                required: "This is the required field",
                minLength: {
                  value: 8,
                  message: "Password needs a minimum of 8 characters",
                },
              })}
            />
            {errors?.password?.message && (
              <span className="text-red-500 bg-red-50 rounded-full text-xs px-2 mt-1 py-1">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between w-[550px]">
          <label htmlFor="repeatPassword">Repeat Password</label>
          <div className="flex flex-col items-start">
            <input
              disabled={isUpdating}
              id="repeatPassword"
              className="py-2 w-72 focus:outline-none px-2 focus:ring-1 ring-gray-700 ring-opacity-25 border-2 border-gray-700 border-opacity-20 rounded-md"
              type="number"
              {...register("repeatPassword", {
                required: "This is the required field",
                validate: (value) =>
                  value === getValues().password || "Password needs to match",
              })}
            />
            {errors?.repeatPassword?.message && (
              <span className="text-red-500 bg-red-50 rounded-full text-xs px-2 mt-1 py-1">
                {errors.repeatPassword.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-5 justify-end w-full mt-5 font-semibold">
          <button
            disabled={isUpdating}
            type="reset"
            onClick={() => reset()}
            className={`${
              isUpdating
                ? `cursor-not-allowed px-3 py-2 text-[15px] rounded-md transition-all border-2 border-gray-700 border-opacity-15 text-black opacity-60`
                : `px-3 active:scale-95 py-2 text-[15px] rounded-md transition-all border-2 border-gray-700 border-opacity-15 text-black hover:bg-opacity-5 hover:bg-gray-700`
            }`}
          >
            Cancel
          </button>
          <button
            disabled={isUpdating}
            type="submit"
            className={`${
              isUpdating
                ? `cursor-not-allowed bg-indigo-400 opacity-60 text-white text-[15px] px-3 py-2 rounded-md transition-all`
                : `bg-indigo-500 active:scale-95 text-[15px] text-white px-3 py-2 rounded-md transition-all hover:bg-indigo-600`
            }`}
          >
            {isUpdating ? (
              <div className="flex items-center gap-2">
                <BtnLoader />
                <p>Updating password...</p>
              </div>
            ) : (
              "Update password"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
