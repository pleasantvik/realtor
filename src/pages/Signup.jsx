import React, { useState } from "react";
import { useFormik } from "formik";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { signup } from "utils/schema";

import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import loginImg from "resources/images/lock.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Oauth } from "components/Oauth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ShowToast } from "utils/tools";

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const navigate = useNavigate();

  const handlePasswordShow = () => {
    setShowPassword(!showPassword);
  };
  const handlePasswordShowConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signup,
    onSubmit: (values) => {
      console.log(values);
      onSubmitForm(values);
    },
  });

  const onSubmitForm = async (values) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      updateProfile(auth.currentUser, {
        displayName: values.username,
      });
      const user = userCredential.user;
      console.log(user);

      const formDataCopy = { ...values };
      // console.log(formDataCopy, "FormData");

      delete formDataCopy.confirmPassword;
      delete formDataCopy.password;
      // console.log(formDataCopy, "FormData");

      formDataCopy.timeStamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/");
      ShowToast("SUCCESS", "User account created successfully");
    } catch (error) {
      console.log(error.message);
      ShowToast("ERROR", error.message);
    }
  };

  return (
    <section className="bg-gray-200">
      <h1 className="text-3xl text-center pt-6 font-bold">Create an Account</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] md:mb-6 mb-12">
          <img
            src={loginImg}
            alt="A cage under lock"
            className="w-[80%] mx-auto rounded-2xl"
          />
        </div>
        <div className="w-[80%] mx-auto md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-2">
              <label
                htmlFor="username"
                className="text-[#c69963] font-semibold"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                {...formik.getFieldProps("username")}
                placeholder="Username"
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-red-500">{formik.errors.username}</div>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="text-[#c69963] font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                {...formik.getFieldProps("email")}
                placeholder="Email address"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500">{formik.errors.email}</div>
              )}
            </div>
            <div className="relative mb-6">
              <label
                htmlFor="password"
                className="text-[#c69963] font-semibold"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                {...formik.getFieldProps("password")}
                placeholder="Password"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 absolute">
                  {formik.errors.password}
                </div>
              )}
              {!showPassword && (
                <AiFillEyeInvisible
                  className="absolute top-[55%] right-3 cursor-pointer"
                  onClick={handlePasswordShow}
                />
              )}
              {showPassword && (
                <AiFillEye
                  className="absolute bottom-4 right-3 cursor-pointer"
                  onClick={handlePasswordShow}
                />
              )}
            </div>
            <div className="relative mb-6">
              <label
                htmlFor="confirmPassword"
                className="text-[#c69963] font-semibold"
              >
                Confirm Password
              </label>
              <input
                type={showPasswordConfirm ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                {...formik.getFieldProps("confirmPassword")}
                placeholder="Confirm Password"
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className="text-red-500 absolute">
                    {formik.errors.confirmPassword}
                  </div>
                )}
              {!showPasswordConfirm && (
                <AiFillEyeInvisible
                  className="absolute top-[55%] right-3 cursor-pointer"
                  onClick={handlePasswordShowConfirm}
                />
              )}
              {showPasswordConfirm && (
                <AiFillEye
                  className="absolute bottom-4 right-3 cursor-pointer"
                  onClick={handlePasswordShowConfirm}
                />
              )}
            </div>
            <div className="flex justify-between flex-col sm:flex-row whitespace-nowrap text-sm sm:text-lg mb-6">
              <p>
                Already have an account?
                <Link
                  to="/sign-in"
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                >
                  Sign in
                </Link>
              </p>
              {/* <p>
                <Link
                  to="/forgot-password"
                  className="text-[#c69963] hover:text-[#b28451] transition duration-200 ease-in-out font-bold"
                >
                  Forgot password
                </Link>
              </p> */}
            </div>
            <button
              type="submit"
              className="w-full bg-[#101d2c] text-[#f9f7f6] px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-[#162331] transition duration-200 ease-in-out hover:shadow-lg"
            >
              Sign up
            </button>
            <div className="my-4 before:border-t flex before:flex-1 items-center before:border-[#aaa] after:border-t after:flex-1  after:border-[#aaa]">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <Oauth />
          </form>
        </div>
      </div>
    </section>
  );
};
