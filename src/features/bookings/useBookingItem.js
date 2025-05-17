import { useQuery } from "@tanstack/react-query";
import { getBooking, getBookings } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export const useBookingItem = () => {
  const { bookingId } = useParams();

  const {
    isPending,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { isPending, booking, error };
};

export const useBookingItemCheckin = () => {
  const { checkinId } = useParams();

  const {
    isPending,
    data: checkinDetails,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => getBooking(checkinId),
    retry: false,
  });

  return { isPending, checkinDetails, error };
};
