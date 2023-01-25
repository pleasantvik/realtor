import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ShowToast } from "utils/tools";

export const ContactOwner = ({ userRef, listing }) => {
  const [owner, setOwner] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const getOwner = async () => {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setOwner(docSnap.data());
      } else {
        ShowToast("ERROR", `Could not get owner's data`);
      }
    };

    getOwner();
  }, [userRef]);
  console.log(owner);
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <Fragment>
      <div className="flex flex-col w-full">
        <p className="">
          Contact {owner?.username} for the{" "}
          <span className="font-semibold italic">
            {listing?.propertyName.toLowerCase()}
          </span>
        </p>
        <div className="mt-3 mb-6">
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={handleMessageChange}
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white "
          ></textarea>
        </div>
        <a
          href={`mailto:${owner?.email}?Subject=${listing?.propertyName}&body=${message}`}
        >
          <button
            type="button"
            className="px-7 py-3 bg-[#101d2c] text-white font-medium text-sm uppercase rounded shadow-md hover:bg-[#162331] hover:shadow-lg mt-3 transition-all duration-150 ease-in-out w-full text-center  mb-6"
          >
            Send Message
          </button>
        </a>
      </div>
    </Fragment>
  );
};
