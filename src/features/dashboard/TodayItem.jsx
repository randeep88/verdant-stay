import React from "react";
import { countryCodeToFlag } from "../../utils/countryCodeToFlag";
import BtnLoader from "../../ui/BtnLoader";
import { useUpdateCheckout } from "../bookings/useUpdateCheckout";
import { useNavigate } from "react-router-dom";

const TodayItem = ({ activity }) => {
  const { id, status, guests, numNights } = activity;
  console.log(activity);
  const navigate = useNavigate();

  const { isUpdating: isCheckingOut, updateCheckoutDetails } =
    useUpdateCheckout();

  const handleUpdateCheckin = () => {
    navigate(`/checkin/${id}`);
  };

  const handleUpdateCheckout = () => {
    updateCheckoutDetails(id);
  };

  return (
    <div className="border-b border-gray-100 py-3 flex items-center justify-between">
      <div className="w-24 font-semibold">
        {status === "unconfirmed" && (
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full uppercase text-xs font-semibold">
            arriving
          </span>
        )}
        {status === "checked-in" && (
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full uppercase text-xs font-semibold">
            departing
          </span>
        )}
      </div>
      <div className="flex items-center justify-start w-44 font-semibold">
        <p className="me-3">{countryCodeToFlag(guests.countryFlag)}</p>
        <p>{guests.fullName}</p>
      </div>
      <div className="w-20 font-semibold">{numNights} nights</div>
      <div>
        {status === "unconfirmed" && (
          <button
            onClick={handleUpdateCheckin}
            className="text-xs w-24 bg-indigo-500 p-2 hover:bg-indigo-600 text-white rounded-md active:scale-95 transition-all uppercase"
          >
            Check in
          </button>
        )}
        {status === "checked-in" && (
          <button
            disabled={isCheckingOut}
            onClick={handleUpdateCheckout}
            className="text-xs w-24 bg-indigo-500 p-2 hover:bg-indigo-600 text-white rounded-md active:scale-95 transition-all uppercase"
          >
            {isCheckingOut ? (
              <div className="flex items-center justify-center">
                <BtnLoader />
              </div>
            ) : (
              "Check out"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default TodayItem;
