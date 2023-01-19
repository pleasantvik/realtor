import { getAuth } from "@firebase/auth";
import { useFormik } from "formik";
import React, { Fragment } from "react";
import { useNavigate } from "react-router";
import { updateProfile } from "utils/schema";
import { ShowToast } from "utils/tools";

export const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const formik = useFormik({
    initialValues: {
      username: auth?.currentUser?.displayName,
      email: auth?.currentUser?.email,
    },
    validationSchema: updateProfile,
  });

  const onLogoutHandler = () => {
    auth.signOut();
    navigate("/");
    ShowToast("SUCCESS", "Logout successfully");
  };
  return (
    <Fragment>
      <section className="flex flex-col justify-center items-center max-w-6xl mx-auto">
        <h1 className="text-3xl text-center mt-6 font-bold ">My Profile</h1>
        <div className="mt-6 w-full  sm:w-[70%] md:w-[50%] px-3 mx-auto">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="text-[#c69963] font-semibold ">
                Username
              </label>
              <input
                type="text"
                disabled
                id="username"
                name="username"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                {...formik.getFieldProps("username")}
                placeholder="Email address"
                autoComplete="off"
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-red-500">{formik.errors.username}</div>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="text-[#c69963] font-semibold">
                Email
              </label>
              <input
                disabled
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                {...formik.getFieldProps("email")}
                placeholder="Email address"
                autoComplete="off"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500">{formik.errors.email}</div>
              )}
            </div>

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center ">
                Do you want to edit your profile?
                <span className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer">
                  Edit
                </span>
              </p>
              <p
                onClick={onLogoutHandler}
                className="text-[#c69963] hover:text[#6d5d4b] cursor-pointer transition ease-in-out duration-200"
              >
                Sign out
              </p>
            </div>
          </form>
        </div>
      </section>
    </Fragment>
  );
};
