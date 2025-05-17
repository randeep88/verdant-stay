import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { getToday } from "../../utils/helper";

export const useRecentStays = () => {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : isNaN(Number(searchParams.get("last")))
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    isPending,
    data: stays = [],
    error,
  } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate, getToday({ end: true })), // Pass end of today
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  // console.log({
  //   numDays,
  //   queryDate,
  //   today: getToday({ end: true }),
  //   stays,
  //   confirmedStays,
  //   error,
  // });

  return { isPending, stays, confirmedStays, numDays, error };
};
