import { useAuthStatus } from "hooks/useAuthStatus";
import React, { Fragment } from "react";
import { Navigate, Outlet } from "react-router";
import { Spinner } from "./Spinner";

export const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <Spinner />;
  }
  return (
    <Fragment>
      {loggedIn && <Outlet />}
      {!loggedIn && <Navigate to="/login" />}
    </Fragment>
  );
};
