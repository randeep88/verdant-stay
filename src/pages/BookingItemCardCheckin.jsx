import React, { useState } from "react";
import { formatDateDay } from "../utils/formatDate";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { countryCodeToFlag } from "../utils/countryCodeToFlag";
import check from "../assets/check.svg";
import uncheck from "../assets/uncheck.svg";
import yellowRupee from "../assets/amount.svg";
import greenRupee from "../assets/green-amount.svg";
import observation from "../assets/observation.svg";
import { formatDateTime, formatToINR } from "../utils/formatToINR";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateCheckin } from "../features/bookings/useUpdateCheckin";
import { useBookingItemCheckin } from "../features/bookings/useBookingItem";
import Loader from "../ui/Loader";
import { useSettings } from "../features/settings/useSettings";

const BookingItemCardCheckin = () => {
  const { updateCheckinDetails } = useUpdateCheckin();

  const navigate = useNavigate();

  const [confirm, setConfirm] = useState(false);
  const [addBreakfastPrice, setAddBreakfastPrice] = useState(false);

  const { isPending: isCheckingin, checkinDetails } = useBookingItemCheckin();
  const { isPending: isSetting, settings } = useSettings();

  const isWorking = isCheckingin || isSetting;

  if (isWorking) return <Loader />;

  const { breakfastPrice } = settings;

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
  } = checkinDetails;

  let totalBreakfastPrice = breakfastPrice * numGuests;

  const cabinName = cabins?.name || "Unknown Cabin";
  const cabinPrice = cabins?.regularPrice || "Unknown Cabin Price";
  const guestName = guests?.fullName || "Unknown Guest";
  const email = guests?.email || "No email";
  const countryFlag = guests?.countryFlag || "";
  const nationalID = guests?.nationalID || "No ID";

  let totalAmount = totalPrice + totalBreakfastPrice;

  const handleUpdateStatus = () => {
    if (addBreakfastPrice) {
      updateCheckinDetails({
        id,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: totalBreakfastPrice,
          totalPrice: totalAmount,
        },
      });
    } else {
      updateCheckinDetails({
        id,
        breakfast: {},
      });
    }
    navigate("/bookings");
  };

  return (
    <div>
      <div>
        <div className="flex items-center justify-between w-full mb-5 select-none">
          <div className="flex items-center gap-3">
            <h1 className="font-bold text-3xl text-gray-800">
              Check in booking #{id}
            </h1>
            {status === "unconfirmed" && (
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full uppercase text-xs font-semibold">
                {status}
              </span>
            )}
            {status === "checked in" && (
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full uppercase text-xs font-semibold">
                {status}
              </span>
            )}
            {status === "checked out" && (
              <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full uppercase text-xs font-semibold">
                {status}
              </span>
            )}
          </div>
          <button
            onClick={() => navigate(-1)}
            className="me-10 transition-all active:scale-95 hover:bg-blue-100 p-1 px-2 rounded-full text-sm font-semibold text-blue-600"
          >
            &larr; Back
          </button>
        </div>
      </div>
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

        <div className="bg-white py-5 px-10 flex flex-col justify-center gap-5 rounded-b-lg">
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
                  &nbsp; {formatToINR(totalAmount)} ({formatToINR(cabinPrice)}
                  cabin + {formatToINR(totalBreakfastPrice)} breakfast)
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

        {/* want to add breakfast */}
        {!hasBreakfast && (
          <div className="p-5 px-10 rounded-md bg-white mt-5 flex items-center gap-3">
            <input
              onChange={() => setAddBreakfastPrice((set) => !set)}
              className="scale-150"
              type="checkbox"
              checked={addBreakfastPrice}
              id="addBreakfast"
            />
            <label
              className="font-semibold"
              htmlFor="addBreakfast"
            >{`Want to add breakfast for ${formatToINR(
              totalBreakfastPrice
            )}`}</label>
          </div>
        )}

        {/* confirm amount paid */}
        <div className="p-5 px-10 rounded-md bg-white mt-5 flex items-center gap-3">
          <input
            onChange={() => setConfirm((set) => !set)}
            checked={confirm}
            className="scale-150"
            type="checkbox"
            id="confirmCheckin"
          />
          {!addBreakfastPrice ? (
            <label
              className="font-semibold"
              htmlFor="confirmCheckin"
            >{`I confirm that ${guestName} has paid the total amount of ${formatToINR(
              totalPrice
            )}`}</label>
          ) : (
            <label
              className="font-semibold"
              htmlFor="confirmCheckin"
            >{`I confirm that ${guestName} has paid the total amount of ${formatToINR(
              totalAmount
            )} (${formatToINR(totalPrice)} + ${formatToINR(
              totalBreakfastPrice
            )})`}</label>
          )}
        </div>

        <div className="mt-5 text-right space-x-3 flex items-center justify-end mb-10">
          {confirm ? (
            <button
              onClick={handleUpdateStatus}
              className="bg-indigo-500 active:scale-95 border-2 border-indigo-500 hover:border-indigo-600 text-[15px] text-white px-3 py-2 rounded-md transition-all hover:bg-indigo-600"
            >
              Check in booking #{id}
            </button>
          ) : (
            <button
              disabled={!confirm}
              className="cursor-not-allowed border-2 border-indigo-400 bg-indigo-400 opacity-60 text-white text-[15px] px-3 py-2 rounded-md transition-all"
            >
              Check in booking #{id}
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
    </div>
  );
};

export default BookingItemCardCheckin;
