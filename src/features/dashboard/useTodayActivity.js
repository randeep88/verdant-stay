import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export const useTodayActivity = () => {
  const {
    isLoading,
    data: activities = [],
    error,
  } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  if (error) {
    console.error("Error fetching today's activity:", error);
  }

  return { isLoading, activities, error };
};
