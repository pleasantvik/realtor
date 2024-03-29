import { db } from "../firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { ShowToast } from "utils/tools";
import { useNavigate } from "react-router-dom";

export const Oauth = () => {
  const navigate = useNavigate();

  const onGoogleClick = async () => {
    console.log("Google");
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      //Check if user exist
      const docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef);

      //If user does not exist, add user to firestore
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          username: user.displayName,
          email: user.email,
          timeStamp: serverTimestamp(),
        });
      }

      navigate("/");
      ShowToast("SUCCESS", `Welcome on board ${user.displayName}`);

      console.log(user, "USER");
    } catch (error) {
      ShowToast("ERROR", error.message);
    }
  };
  return (
    <button
      onClick={onGoogleClick}
      className="flex w-full justify-center items-center bg-red-600 text-[#f6f7f9] px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-200 ease-in-out rounded"
      type="button"
    >
      <FcGoogle className="text-2xl bg-[#f6f7f9] mr-2 rounded-full" />
      Sign in with Google
    </button>
  );
};
