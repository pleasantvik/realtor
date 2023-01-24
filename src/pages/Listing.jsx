import { DashboardLayout } from "components/DashboardLayout";
import { db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { Spinner } from "components/Spinner";
import { ListingItem } from "components/ListingItem";
import { useNavigate } from "react-router-dom";
import { ShowToast } from "utils/tools";

export const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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

  const onDelete = async (id) => {
    console.log(id, "Delete");
    if (window.confirm("Are you sure you want to delete")) {
      // Delete functionality from firebase:
      // DeleteDoc takes the db the collection name and the id of it to delete
      await deleteDoc(doc(db, "listings", id));

      // update
      const updatedListings = listing.filter((item) => item.id !== id);

      setListing(updatedListings);

      ShowToast("SUCCESS", "Item successfully deleted");
    }
  };
  const onEdit = (id) => {
    navigate(`/edit-listing/${id}`);
  };

  console.log(listing, "listing");
  return (
    <DashboardLayout>
      {loading && <Spinner />}
      <div className="flex flex-col justify-center items-center w-full">
        {!loading && (
          <Fragment>
            <h2 text="text-2xl text-center font-semibold uppercase">
              My Listing
            </h2>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6 space-x-5">
              {listing?.map((list) => (
                <ListingItem
                  item={list?.data}
                  key={list.id}
                  id={list?.id}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))}
            </ul>
          </Fragment>
        )}
      </div>
    </DashboardLayout>
  );
};
