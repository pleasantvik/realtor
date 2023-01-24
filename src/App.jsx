import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Home } from "./pages/Home";
import { Offers } from "./pages/Offers";
import { Profile } from "./pages/Profile";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { PrivateRoute } from "components/PrivateRoute";
import { Listing } from "pages/Listing";
import { CreateListing } from "pages/CreateListing";
import { EditListing } from "pages/EditListing";
import { ListingDetail } from "pages/ListingDetail";
// import { Create } from "pages/createList";

export const App = () => {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing" element={<Listing />} />

        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        {/* <Route path="/sahand" element={<PrivateRoute />}>
          <Route path="/sahand" element={<Create />} />
        </Route> */}
        <Route path="/create-listing" element={<PrivateRoute />}>
          <Route path="/create-listing" element={<CreateListing />} />
        </Route>
        <Route path="/edit-listing" element={<PrivateRoute />}>
          <Route path="/edit-listing/:id" element={<EditListing />} />
        </Route>
        <Route path="/login" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/category/:type/:listingId" element={<ListingDetail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Fragment>
  );
};
