import React from "react";
import DashboardOperations from "../features/dashboard/DashboardOperations";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import { useRecentBookings } from "../features/dashboard/useRecentBookings";
import Loader from "../ui/Loader";
import { useRecentStays } from "../features/dashboard/useRecentStays";
import { useCabins } from "../features/cabins/useCabins.js";

const Dashboard = () => {
  const { isPending, bookings } = useRecentBookings();
  const { isPending: isLoading, confirmedStays, numDays } = useRecentStays();
  const { isPending: isLoading2, cabins } = useCabins();

  if (isPending || isLoading || isLoading2) return <Loader />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl text-gray-800 select-none">
          Dashboard
        </h1>
        <DashboardOperations />
      </div>
      <DashboardLayout
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabins={cabins}
      />
    </div>
  );
};

export default Dashboard;
