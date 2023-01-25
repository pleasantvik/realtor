import React, { useEffect } from "react";
import { useState } from "react";

import { db } from "../firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { ShowToast } from "utils/tools";
import { Spinner } from "components/Spinner";
import { ListingItem } from "components/ListingItem";
import { useParams } from "react-router-dom";

export const Categories = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchListing, setLastFetchListing] = useState(null);
  const { type } = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingRef = collection(db, "listings");

        const q = query(
          listingRef,
          where("type", "==", `${type}`),
          orderBy("timestamp", "desc"),
          limit(2)
        );

        const querySnap = await getDocs(q);
        const lastVisibleList = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchListing(lastVisibleList);
        let items = [];
        querySnap.forEach((doc) => {
          return items.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListing(items);
        setLoading(false);
      } catch (error) {
        ShowToast("ERROR", "Could not fetch listing");
        setLoading(false);
      }
    };

    fetchListing();
  }, [type]);

  const handleFetchMore = async () => {
    try {
      const listingRef = collection(db, "listings");

      const q = query(
        listingRef,
        where("type", "==", `${type}`),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchListing),
        limit(2)
      );

      const querySnap = await getDocs(q);
      const lastVisibleList = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchListing(lastVisibleList);
      let items = [];
      querySnap.forEach((doc) => {
        return items.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListing((prev) => [...prev, ...items]);
      setLoading(false);
    } catch (error) {
      ShowToast("ERROR", "Could not fetch listing");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-3">
      {loading && <Spinner />}
      <h1 className="text-3xl text-center uppercase font-bold">
        {type === "rent" ? "Places for Rent" : "Places for sale"}
      </h1>
      {!loading && listing.length === 0 && <p>No offer available</p>}
      {!loading && listing && listing.length > 0 && (
        <div className="">
          <main>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6 space-x-5">
              {listing.map((list) => (
                <ListingItem item={list?.data} key={list.id} id={list?.id} />
              ))}
            </ul>
          </main>
          {lastFetchListing && (
            <div className="flex justify-center items-center">
              <button
                onClick={handleFetchMore}
                className="bg-[#101d2c] px-3 py-1.5 text-white border border-gray-300 mt-6 mb-6 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus::shadow-lg active:shadow-lg transition duration-200 ease-in-out 
                "
              >
                Load More
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
