import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings } from "../../services/apiSettings";
import toast from "react-hot-toast";

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateSettingsMutate } = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      toast.success("Settings edited successfully");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateSettingsMutate };
};
