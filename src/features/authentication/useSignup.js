import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useSignup = () => {

  const { isPending: isSigningIn, mutate: signupMutate } = useMutation({
    mutationFn: ({ fullname, email, password }) =>
      signup({ fullname, email, password }),
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account created successfully. Please verify the new account from user's email address"
      );
    },
  });
  return { isSigningIn, signupMutate };
};
