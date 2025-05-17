import React from "react";
import { useForm } from "react-hook-form";
import BtnLoader from "../ui/BtnLoader";
import Loader from "../ui/Loader";
import { useSignup } from "../features/authentication/useSignup";
const SignupForm = () => {
  const { isSigningIn, signupMutate } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const onSubmit = ({ fullname, email, password }) => {
    signupMutate(
      { fullname, email, password },
      {
        onSettled: reset,
      }
    );
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[550px] space-y-4 font-semibold text-[15px] select-none"
      >
        <div className="flex items-center justify-between">
          <label htmlFor="fullname">Full Name</label>
          <div className="flex flex-col items-start">
            <input
              disabled={isSigningIn}
              id="fullname"
              className="py-2 w-72 focus:outline-none px-2 focus:ring-1 ring-gray-700 ring-opacity-25 border-2 border-gray-700 border-opacity-20 rounded-md"
              type="text"
              {...register("fullname", {
                required: "This is the required field",
              })}
            />
            {errors?.fullname?.message && (
              <span className="text-red-500 bg-red-50 rounded-full text-xs px-2 mt-1 py-1">
                {errors.fullname.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="email">Email Address</label>
          <div className="flex flex-col items-start">
            <input
              disabled={isSigningIn}
              id="email"
              className="py-2 w-72 focus:outline-none px-2 focus:ring-1 ring-gray-700 ring-opacity-25 border-2 border-gray-700 border-opacity-20 rounded-md"
              type="email"
              {...register("email", {
                required: "This is the required field",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please provide a valid email address",
                },
              })}
            />
            {errors?.email?.message && (
              <span className="text-red-500 bg-red-50 rounded-full text-xs px-2 mt-1 py-1">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="password">Password (min 8 characters)</label>
          <div className="flex flex-col items-start">
            <input
              disabled={isSigningIn}
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
        <div className="flex items-center justify-between">
          <label htmlFor="repeatPassword">Repeat Password</label>
          <div className="flex flex-col items-start">
            <input
              disabled={isSigningIn}
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

        <div className="flex items-center justify-end w-full">
          <div className="flex gap-5 mt-3 justify-end w-full">
            <button
              disabled={isSigningIn}
              type="reset"
              className={`${
                isSigningIn
                  ? `cursor-not-allowed px-3 py-2 text-[15px] rounded-md transition-all border-2 border-gray-700 border-opacity-15 text-black opacity-60`
                  : `px-3 active:scale-95 py-2 text-[15px] rounded-md transition-all border-2 border-gray-700 border-opacity-15 text-black hover:bg-opacity-5 hover:bg-gray-700`
              }`}
            >
              Cancel
            </button>
            <button
              disabled={isSigningIn}
              type="submit"
              className={`${
                isSigningIn
                  ? `cursor-not-allowed bg-indigo-400 opacity-60 text-white text-[15px] px-3 py-2 rounded-md transition-all`
                  : `bg-indigo-500 active:scale-95 text-[15px] text-white px-3 py-2 rounded-md transition-all hover:bg-indigo-600`
              } `}
            >
              {isSigningIn ? (
                <div className="flex items-center gap-2">
                  <BtnLoader />
                  <p>Creating new user...</p>
                </div>
              ) : (
                "Create new user"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
