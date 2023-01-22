import { DashboardLayout } from "components/DashboardLayout";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { Spinner } from "components/Spinner";
import { ListingItem } from "components/ListingItem";

export const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const fetchUserListing = useCallback(async () => {
    //Get the listing Ref
    try {
      setLoading(true);
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth?.currentUser?.uid),
        orderBy("timestamp", "desc")
      );

      const querySnap = await getDocs(q);

      let listings = [];
      querySnap.forEach((doc) =>
        listings.push({
          id: doc.id,
          data: doc.data(),
        })
      );
      setListing(listings);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [auth]);
  useEffect(() => {
    fetchUserListing();
  }, [fetchUserListing]);

  console.log(listing, "listing");
  return (
    <DashboardLayout>
      {loading && <Spinner />}
      <div className="flex flex-col justify-center items-center w-full">
        {!loading && (
          <Fragment>
            <h2 text="text-2xl text-center font-semibold">My Listing</h2>
            <ul>
              {listing?.map((list) => (
                <ListingItem item={list} key={list.id} id={list.id} />
              ))}
            </ul>
          </Fragment>
        )}
      </div>
    </DashboardLayout>
  );
};
