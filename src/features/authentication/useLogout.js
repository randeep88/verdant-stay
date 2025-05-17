import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: isLoggingOut, mutate: logoutMutate } = useMutation({
    mutationFn: logout,
    onSuccess: (user) => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
      toast.success("You are logged out");
    },
    onError: (err) => {
      toast.error("There is an error in logout");
      throw new Error(err);
    },
  });
  return { isLoggingOut, logoutMutate };
};
