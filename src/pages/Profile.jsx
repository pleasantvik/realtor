import { getAuth, updateProfile } from "@firebase/auth";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../firebase";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { updateProfile as updateProfileSchema } from "utils/schema";
import { ShowToast } from "utils/tools";
import { DashboardLayout } from "components/DashboardLayout";

export const Profile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const formik = useFormik({
    initialValues: {
      username: auth?.currentUser?.displayName,
      email: auth?.currentUser?.email,
    },
    validationSchema: updateProfileSchema,
    onSubmit: (values) => {
      onSubmitForm(values);
    },
  });

  const onLogoutHandler = () => {
    auth.signOut();
    navigate("/");
    ShowToast("SUCCESS", "Logout successfully");
  };

  const onEditHandler = () => {
    setEditProfile(!editProfile);
  };

  const onSubmitForm = async (values) => {
    try {
      //Update display name in firebase auth
      if (auth.currentUser.displayName !== values.username) {
        await updateProfile(auth.currentUser, { displayName: values.username });
      }

      //update display name in firestore

      const docRef = doc(db, "users", auth.currentUser.uid);

      await updateDoc(docRef, {
        username: values.username,
      });

      ShowToast("SUCCESS", "Profile updated successfully");
    } catch (error) {
      ShowToast("ERROR", error.message);
    }
  };

  return (
    <DashboardLayout>
      <section className="flex flex-col justify-center items-center w-full">
        <h1 className="text-3xl text-center  font-bold uppercase">
          <span className="text-[#c69963] italic ">
            {`${auth.currentUser.displayName}'s`}
          </span>{" "}
          Profile
        </h1>
        <div className="mt-6 w-full  sm:w-[70%] md:w-[50%] px-3 mx-auto">
          <form>
            <div className="mb-6">
              <label htmlFor="email" className="text-[#c69963] font-semibold ">
                Username
              </label>
              <input
                type="text"
                disabled={!editProfile}
                id="username"
                name="username"
                className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out ${
                  editProfile && "bg-red-200 focus:bg-red-200"
                }`}
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
                disabled={!editProfile}
                type="email"
                id="email"
                name="email"
                className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out ${
                  editProfile && "bg-red-200 focus:bg-red-200"
                }`}
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
                <span
                  onClick={() => {
                    editProfile && formik.handleSubmit();
                    onEditHandler();
                  }}
                  className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
                >
                  {!editProfile ? "Edit" : "Apply Change"}
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
    </DashboardLayout>
  );
};
