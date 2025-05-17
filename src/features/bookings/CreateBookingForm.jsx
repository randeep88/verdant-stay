import React from "react";
import { useForm } from "react-hook-form";
import BtnLoader from "../../ui/BtnLoader";
import { HiOutlineXMark } from "react-icons/hi2";

const CreateBookingForm = ({ setIsOpenModal }) => {
  const { register, formState = { errors } } = useForm();

  let isWorking = Boolean(false);

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className="flex select-none flex-col items-right justify-between pb-5 w-full">
      <div className="m-5 -mb-1 flex justify-end">
        <button onClick={handleCloseModal} disabled={isWorking}>
          <HiOutlineXMark
            className={`${
              isWorking
                ? `text-4xl border border-gray-300 bg-gray-200 transition-all p-2 rounded-lg`
                : `active:scale-95 text-4xl border border-gray-300 hover:bg-gray-200 transition-all p-2 rounded-lg`
            }`}
          />
        </button>
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-10">
        <form className="w-[500px] space-y-4 font-semibold text-[15px]">
          <div className="flex items-center justify-between ">
            <label htmlFor="selectCabin">Select Cabin</label>
            <div className="flex flex-col items-start">
              <div className="relative inline-block rounded-s-md rounded-e-md">
                <select
                  disabled={isWorking}
                  className="py-2 w-72 focus:outline-none px-2 focus:ring-1 ring-gray-700 ring-opacity-25 border-2 border-gray-700 border-opacity-20 rounded-md appearance-none"
                  id="selectCabin"
                >
                  <option>--Select--</option>
                  <option value="">001</option>
                  <option value="">002</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {/* {errors?.selectCabin?.message && (
              <span className="text-red-500 bg-red-100 rounded-full text-xs px-2 mt-1 py-1">
                {errors.selectCabin.message}
              </span>
            )} */}
            </div>
          </div>
          <div className="flex items-center justify-between ">
            <label htmlFor="selectGuest">Select Guest</label>
            <div className="flex flex-col items-start">
              <div className="relative inline-block rounded-s-md rounded-e-md">
                <select
                  disabled={isWorking}
                  className="py-2 w-72 focus:outline-none px-2 focus:ring-1 ring-gray-700 ring-opacity-25 border-2 border-gray-700 border-opacity-20 rounded-md appearance-none"
                  id="selectGuest"
                >
                  <option>--Select--</option>
                  <option value="">Randeep Singh</option>
                  <option value="">Suraj Kumar</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {/* {errors?.selectGuest?.message && (
              <span className="text-red-500 bg-red-100 rounded-full text-xs px-2 mt-1 py-1">
                {errors.selectGuest.message}
              </span>
            )} */}
            </div>
          </div>
          <div className="flex items-center justify-between ">
            <label htmlFor="startDate">Start Date</label>
            <div className="flex flex-col items-start">
              <input
                disabled={isWorking}
                id="startDate"
                {...register("startDate", {
                  required: "This is a required field!",
                })}
                className="py-2 w-72 focus:outline-none px-2 focus:ring-1 ring-gray-700 ring-opacity-25 border-2 border-gray-700 border-opacity-20 rounded-md"
                type="date"
              />
              {/* {errors?.startDate?.message && (
              <span className="text-red-500 bg-red-100 rounded-full text-xs px-2 mt-1 py-1">
                {errors.startDate.message}
              </span>
            )} */}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="endDate">End Date</label>
            <div className="flex flex-col items-start">
              <input
                disabled={isWorking}
                id="endDate"
                {...register("endDate", {
                  required: "This is a required field!",
                })}
                className="py-2 w-72 focus:outline-none px-2 focus:ring-1 ring-gray-700 ring-opacity-25 border-2 border-gray-700 border-opacity-20 rounded-md"
                type="date"
              />
              {/* {errors?.endDate?.message && (
              <span className="text-red-500 bg-red-100 rounded-full text-xs px-2 mt-1 py-1">
                {errors.endDate.message}
              </span>
            )} */}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="status">Status</label>
            <div className="flex flex-col items-start">
              <input
                disabled={isWorking}
                id="status"
                {...register("status", {
                  required: "This is a required field!",
                })}
                className="py-2 w-72 focus:outline-none px-2 focus:ring-1 ring-gray-700 ring-opacity-25 border-2 border-gray-700 border-opacity-20 rounded-md"
                type="text"
              />
              {/* {errors?.status?.message && (
              <span className="text-red-500 bg-red-100 rounded-full text-xs px-2 mt-1 py-1">
                {errors.status.message}
              </span>
            )} */}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="amount">Amount</label>
            <div className="flex flex-col items-start">
              <input
                disabled={isWorking}
                id="amount"
                {...register("amount", {
                  required: "This is a required field!",
                })}
                className="py-2 w-72 focus:outline-none px-2 focus:ring-1 ring-gray-700 ring-opacity-25 border-2 border-gray-700 border-opacity-20 rounded-md"
                type="text"
              />
              {/* {errors?.amount?.message && (
              <span className="text-red-500 bg-red-100 rounded-full text-xs px-2 mt-1 py-1">
                {errors.amount.message}
              </span>
            )} */}
            </div>
          </div>
          <div className="flex items-center justify-end w-full">
            <div className="flex gap-5 justify-end w-full">
              <button
                disabled={isWorking}
                type="reset"
                onClick={() => setIsOpenModal(false)}
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
                    ? `cursor-not-allowed bg-gray-300 opacity-60 text-[15px] text-black px-3 py-2 rounded-md transition-all`
                    : `bg-indigo-500 active:scale-95 text-[15px] text-white px-3 py-2 rounded-md transition-all hover:bg-indigo-600`
                } `}
              >
                {isWorking ? (
                  <div className="flex items-center gap-2">
                    <BtnLoader />
                    <p>Creating new booking...</p>
                  </div>
                ) : (
                  "Create new booking"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBookingForm;
