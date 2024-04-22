import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
// hooks
import useAuth from "../hooks/useAuth";
// components
import Login from "../pages/auth/Login";
// ----------------------------------------------------------------------

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      // @ts-ignore
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
