import React, { useState } from "react";
import logo from "../assets/logo5.png";
import { useLogin } from "../features/authentication/useLogin";
import Loader from "../ui/Loader";
import BtnLoader from "../ui/BtnLoader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoggingIn, loginMutate } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    loginMutate({ email, password });
  };

  return (
    <div className="bg-gray-50 w-full h-screen flex flex-col space-y-5 items-center justify-center">
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
      <h1 className="font-bold text-2xl">Login to your account</h1>
      <form
        className="flex font-semibold flex-col border items-center w-96 rounded-md bg-white p-6 space-y-4"
        onSubmit={handleLogin}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email address</label>
          <input
            disabled={isLoggingIn}
            className="py-1 w-80 focus:outline-none px-2 border-2 border-gray-700 border-opacity-20 rounded-md"
            onChange={(e) => setEmail(e.target.value)}
            value="verdant@gmail.com"
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            disabled={isLoggingIn}
            className="py-1 w-80 focus:outline-none px-2 border-2 border-gray-700 border-opacity-20 rounded-md"
            onChange={(e) => setPassword(e.target.value)}
            value="verdant"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <button
          disabled={isLoggingIn}
          type="submit"
          className={`${
            isLoggingIn
              ? `w-80 cursor-not-allowed bg-gray-300 opacity-60 text-black px-3 py-2 rounded-md transition-all`
              : `w-80 bg-indigo-500 active:scale-95 text-white px-3 py-2 rounded-md transition-all hover:bg-indigo-600`
          } `}
        >
          {isLoggingIn ? (
            <div className="flex items-center justify-center gap-2">
              <BtnLoader />
              <p>Logging in...</p>
            </div>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
