import React from "react";
import { Route, Routes } from "react-router-dom";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Home } from "./pages/Home";
import { Offers } from "./pages/Offers";
import { Profile } from "./pages/Profile";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/sign-in" element={<Signin />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};
