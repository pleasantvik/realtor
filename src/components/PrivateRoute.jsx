import { useAuthStatus } from "hooks/useAuthStatus";
import React, { Fragment } from "react";
import { Navigate, Outlet } from "react-router";

export const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <h3>Loading....</h3>;
  }
  return (
    <Fragment>
      {loggedIn && <Outlet />}
      {!loggedIn && <Navigate to="/login" />}
    </Fragment>
  );
};
