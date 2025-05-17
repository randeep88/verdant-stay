import React from "react";
import { useTodayActivity } from "./useTodayActivity";
import Loader from "../../ui/Loader";
import TodayItem from "./TodayItem";

const TodayActivity = () => {
  const { isLoading, activities = [], error } = useTodayActivity();
  if (error) {
    return (
      <div className="bg-white rounded-md select-none w-full h-80 flex items-center justify-center text-red-500">
        Error loading activities: {error.message}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md select-none w-full h-80">
      <h1 className="text-xl ps-5 pt-5 mb-5 font-bold">Today</h1>
      <div className="h-60 overflow-y-auto px-5 scrollbar-none">
        {isLoading ? (
          <Loader />
        ) : activities.length > 0 ? (
          <div>
            {activities.map((activity) => (
              <TodayItem
                activity={activity}
                key={activity.id || activity.created_at || Math.random()} // Fallback keys
              />
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center font-semibold text-gray-500">
            No activity today...
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayActivity;
