import React from "react";
import { useNavigate } from "react-router-dom";
import BookingItemCard from "./BookingItemCard";
import Loader from "../ui/Loader";
import { useBookingItem } from "../features/bookings/useBookingItem";

const BookingItem = () => {
  const navigate = useNavigate();
  const { booking, isPending, error } = useBookingItem();

  if (isPending) return <Loader />;
  if (!booking) return <div>No booking found</div>;
  if (error) return <div>Error: {error}</div>;

  console.log(booking);

  const { id, status } = booking;

  return (
    <div>
      <div className="flex items-center justify-between w-full mb-5 select-none">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-3xl text-gray-800">Booking #{id}</h1>
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
      <BookingItemCard booking={booking} />
    </div>
  );
};

export default BookingItem;
