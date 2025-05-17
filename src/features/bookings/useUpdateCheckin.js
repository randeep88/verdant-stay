import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCheckin } from "../../services/apiBookings";
import toast from "react-hot-toast";

export const useUpdateCheckin = () => {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateCheckinDetails } = useMutation({
    mutationFn: ({id, breakfast}) =>
      updateCheckin(id, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: () => {
      toast.success("Booking checked in successfully!");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to check in");
    },
  });

  return {
    isUpdating,
    updateCheckinDetails,
  };
};
