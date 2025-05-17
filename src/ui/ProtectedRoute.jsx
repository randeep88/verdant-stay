import React, { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isPending, user, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isPending) navigate("/login");
  }, [isAuthenticated, isPending, navigate]);

  if (isPending)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader />
      </div>
    );

  if (isAuthenticated) return <div>{children}</div>;
};

export default ProtectedRoute;
