import React from "react";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

const UpdateSettingForm = () => {
  const { settings = {}, error } = useSettings();
  const {
    breakfastPrice,
    minBookingLength,
    maxBookingLength,
    maxGuestPerBooking,
  } = settings;

  const { isUpdating, updateSettingsMutate } = useUpdateSettings();

  const handleUpdate = (e, field) => {
    const { value } = e.target;
    if (!value) return;
    updateSettingsMutate({ [field]: value });
  };

  if (error) {
    console.log(error);
    throw new Error(error);
  }

  return (
    <div className="w-full h-full flex items-center bg-white">
      <form className="w-[550px] space-y-4 font-semibold text-[15px]">
        <div className="flex items-center justify-between">
          <label htmlFor="minNight">Minimum nights/bookings</label>
          <div className="flex flex-col items-start">
            <input
              disabled={isUpdating}
              defaultValue={minBookingLength}
              onBlur={(e) => handleUpdate(e, "minBookingLength")}
              id="minNight"
              className="py-2 w-72 focus:outline-none px-2 focus:ring-1 ring-gray-700 ring-opacity-25 border-2 border-gray-700 border-opacity-20 rounded-md"
              type="number"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="maxNight">Maximum nights/bookings</label>
          <div className="flex flex-col items-start">
            <input
              disabled={isUpdating}
              defaultValue={maxBookingLength}
              onBlur={(e) => handleUpdate(e, "maxBookingLength")}
              id="maxNight"
              className="py-2 w-72 focus:outline-none px-2 focus:ring-1 ring-gray-700 ring-opacity-25 border-2 border-gray-700 border-opacity-20 rounded-md"
              type="number"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="maxGuest">Maximum guests/bookings</label>
          <div className="flex flex-col items-start">
            <input
              disabled={isUpdating}
              defaultValue={maxGuestPerBooking}
              onBlur={(e) => handleUpdate(e, "maxGuestPerBooking")}
              id="maxGuest"
              className="py-2 w-72 focus:outline-none px-2 focus:ring-1 ring-gray-700 ring-opacity-25 border-2 border-gray-700 border-opacity-20 rounded-md"
              type="number"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="breakfastPrice">Breakfast Price</label>
          <div className="flex flex-col items-start">
            <input
              disabled={isUpdating}
              defaultValue={breakfastPrice}
              onBlur={(e) => handleUpdate(e, "breakfastPrice")}
              id="breakfastPrice"
              className="py-2 w-72 focus:outline-none px-2 focus:ring-1 ring-gray-700 ring-opacity-25 border-2 border-gray-700 border-opacity-20 rounded-md"
              type="number"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateSettingForm;
