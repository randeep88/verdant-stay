import React from "react";
import { formatDateDay } from "../utils/formatDate";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { countryCodeToFlag } from "../utils/countryCodeToFlag";
import check from "../assets/check.svg";
import uncheck from "../assets/uncheck.svg";
import yellowRupee from "../assets/amount.svg";
import greenRupee from "../assets/green-amount.svg";
import observation from "../assets/observation.svg";
import { formatDateTime, formatToINR } from "../utils/formatToINR";
import { useNavigate } from "react-router-dom";
import { useUpdateCheckout } from "../features/bookings/useUpdateCheckout";
import Loader from "../ui/Loader";

const BookingItemCard = ({ booking }) => {
  const { isUpdating, updateCheckoutDetails } = useUpdateCheckout();
  const {
    id,
    status,
    created_at,
    cabins,
    guests,
    startDate,
    endDate,
    numGuests,
    totalPrice,
    numNights,
    hasBreakfast,
    extrasPrice,
    observations,
    isPaid,
  } = booking;

  const navigate = useNavigate();

  const cabinName = cabins?.name || "Unknown Cabin";
  const cabinPrice = cabins?.regularPrice || "Unknown Cabin Price";
  const guestName = guests?.fullName || "Unknown Guest";
  const email = guests?.email || "No email";
  const countryFlag = guests?.countryFlag || "";
  const nationalID = guests?.nationalID || "No ID";

  if (isUpdating) return <Loader />;

  return (
    <div className="rounded-lg overflow-hidden select-none">
      <div className="bg-indigo-500 text-white p-4 px-10 flex items-center justify-between font-semibold">
        <div className="flex items-center gap-4">
          <HiOutlineHomeModern className="scale-150" />
          <p>
            {numNights} night(s) in Cabin {cabinName}
          </p>
        </div>
        <p>
          {formatDateDay(startDate)} &mdash; {formatDateDay(endDate)}
        </p>
      </div>

      <div className="bg-white py-5 px-10 rounded-b-lg flex flex-col justify-center gap-5">
        <div className="flex items-center gap-3 font-semibold">
          <span>
            {countryCodeToFlag(countryFlag)} &nbsp; {guestName} +{" "}
            {numGuests - 1} guest(s)
          </span>
          <span className="opacity-60">&bull;</span>
          <span className="text-gray-400">Email: {email}</span>
          <span className="opacity-60">&bull;</span>
          <span className="text-gray-400">National ID: {nationalID}</span>
        </div>

        <div className="flex items-center font-semibold">
          <img src={observation} />
          <span> &nbsp; Observations</span>
          <span className="text-gray-500">&nbsp; {observations}</span>
        </div>

        <div className="flex items-center font-semibold">
          {hasBreakfast ? <img src={check} /> : <img src={uncheck} />}
          <span> &nbsp; Breakfast included? </span>
          <span className="text-gray-500">
            &nbsp; {hasBreakfast ? "Yes" : "No"}
          </span>
        </div>

        <div
          className={`${
            isPaid
              ? `mt-3 flex items-center justify-between text-green-800 font-semibold bg-green-300/50 rounded-md p-4 px-10`
              : `mt-3 flex items-center justify-between text-yellow-800 font-semibold bg-yellow-300/50 rounded-md p-4 px-10`
          }`}
        >
          <div className="flex items-center gap-2">
            {isPaid ? <img src={greenRupee} /> : <img src={yellowRupee} />}
            <p>Total price</p>
            {hasBreakfast ? (
              <p>
                &nbsp; {formatToINR(totalPrice)} ({formatToINR(cabinPrice)}
                cabin + {formatToINR(extrasPrice)} breakfast)
              </p>
            ) : (
              <p>&nbsp; {formatToINR(totalPrice)}</p>
            )}
          </div>
          <div>
            <p className="font-bold uppercase text-sm">
              {isPaid ? "paid" : "will pay at property"}
            </p>
          </div>
        </div>

        <p className="text-right text-sm font-semibold text-gray-400">
          Booked on {formatDateTime(created_at)}
        </p>
      </div>
      <div className="mt-5 text-right space-x-3">
        {status === "checked in" ? (
          <button
            onClick={() => {
              updateCheckoutDetails(id);
              navigate("/bookings")
            }}
            className="bg-indigo-500 active:scale-95 border-2 border-indigo-500 hover:border-indigo-600 text-[15px] text-white px-3 py-2 rounded-md transition-all hover:bg-indigo-600"
          >
            Check out
          </button>
        ) : (
          <button
            onClick={() => navigate(`/checkin/${id}`)}
            className="bg-indigo-500 active:scale-95 border-2 border-indigo-500 hover:border-indigo-600 text-[15px] text-white px-3 py-2 rounded-md transition-all hover:bg-indigo-600"
          >
            Check in
          </button>
        )}
        <button
          onClick={() => navigate(-1)}
          className="px-3 active:scale-95 py-2 text-[15px] rounded-md transition-all border-2 border-gray-700 border-opacity-15 text-black hover:bg-opacity-5 hover:bg-gray-700"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default BookingItemCard;
