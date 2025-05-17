import React from "react";
import { formatToINR } from "../../utils/formatToINR.js";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

const Statistics = ({ bookings, confirmedStays, numDays, cabins }) => {
  const numBookings = bookings.length;
  const cabinCount = cabins.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays.length;
  const occupancy =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4 bg-white p-5 rounded-md">
        <HiOutlineBriefcase className="text-6xl p-3 text-sky-500 bg-sky-100 rounded-full" />
        <div>
          <p className="text-sm text-gray-700 uppercase">bookings</p>
          <p className="text-2xl">{numBookings}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 bg-white p-5 rounded-md">
        <HiOutlineBanknotes className="text-6xl p-3 text-green-500 bg-green-100 rounded-full" />
        <div>
          <p className="text-sm text-gray-700 uppercase">sales</p>
          <p className="text-2xl">{formatToINR(sales)}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 bg-white p-5 rounded-md">
        <HiOutlineCalendarDays className="text-6xl p-3 text-violet-500 bg-violet-100 rounded-full" />
        <div>
          <p className="text-sm text-gray-700 uppercase">check ins</p>
          <p className="text-2xl">{checkins}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 bg-white p-5 rounded-md">
        <HiOutlineChartBar className="text-6xl p-3 text-yellow-500 bg-yellow-100 rounded-full" />
        <div>
          <p className="text-sm text-gray-700 uppercase">occupancy rate</p>
          <p className="text-2xl">{Math.round(occupancy * 100)}%</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
