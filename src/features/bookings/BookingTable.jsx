import React from "react";
import { useBookings } from "./useBookings";
import BookingRow from "./BookingRow";

const BookingTable = ({ filteredBookings }) => {
  const { bookings = {}, error } = useBookings();

  if (error) {
    throw new Error(error);
  }

  return (
    <div>
      <div>
        <div className="flex select-none flex-col justify-between border-2 border-gray-200 transition-all relative w-full rounded-lg">
          <div className="flex items-center justify-between font-bold w-full bg-gray-100 transition-all relative rounded-t-lg py-4">
            <div className="ms-10 w-1/12 text-center text-[15px]">CABIN</div>
            <div className="w-1/6 text-center text-[15px]">
              <div>GUEST</div>
            </div>
            <div className="w-1/5 text-center text-[15px]">
              <div>DATE</div>
            </div>
            <div className="w-1/6 text-center text-[15px]">
              <div>STATUS</div>
            </div>
            <div className="w-1/6 text-center text-[15px]">
              <div>AMOUNT</div>
            </div>
            <div className="w-1/6 text-center text-[15px]"></div>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="text-center font-semibold text-gray-500 pb-4 py-3">
              No Bookings available for now
            </div>
          ) : (
            (filteredBookings || []).map((booking) => (
              <BookingRow booking={booking} key={booking.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingTable;
