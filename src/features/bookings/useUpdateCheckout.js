import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCheckin, updateCheckout } from "../../services/apiBookings";
import toast from "react-hot-toast";

export const useUpdateCheckout = () => {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateCheckoutDetails } = useMutation({
    mutationFn: (id) => updateCheckout(id),
    onSuccess: () => {
      toast.success(`Booking checked out successfully`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to check out");
    },
  });

  return {
    isUpdating,
    updateCheckoutDetails,
  };
};
