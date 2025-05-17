import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser } from "../../services/apiAuth";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateUserMutate } = useMutation({
    mutationFn: ({ fullname, password, avatar }) =>
      updateUser({ fullname, password, avatar }), // Pass as object
    onSuccess: ({ user }) => {
      toast.success("Account updated successfully");
      queryClient.setQueryData("user", user);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update account");
    },
  });

  return { isUpdating, updateUserMutate };
};
