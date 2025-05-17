import React from "react";
import Statistics from "./Statistics";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "./TodayActivity";

const DashboardLayout = ({ bookings, numDays, confirmedStays, cabins }) => {
  return (
    <div className="flex select-none flex-col items-start gap-10 justify-around mt-10 font-semibold text-gray-700 px-10">
      <Statistics
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabins={cabins}
      />
      <div className="w-full h-80 flex items-center gap-10 justify-between">
        <TodayActivity />
        <DurationChart confirmedStays={confirmedStays} />
      </div>
      <SalesChart bookings={bookings} numDays={numDays} />
    </div>
  );
};

export default DashboardLayout;
