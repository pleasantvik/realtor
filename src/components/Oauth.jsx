import React from "react";
import { FcGoogle } from "react-icons/fc";

export const Oauth = () => {
  return (
    <button className="flex w-full justify-center items-center bg-red-600 text-[#f6f7f9] px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-200 ease-in-out rounded">
      <FcGoogle className="text-2xl bg-[#f6f7f9] mr-2 rounded-full" />
      Sign in with Google
    </button>
  );
};
