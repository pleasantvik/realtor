import { Slider } from "components/Slider";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ListingItem } from "components/ListingItem";

export const Home = () => {
  const [offerListing, setOfferListing] = useState(null);
  const [rentListing, setRentListing] = useState(null);
  const [saleListing, setSaleListing] = useState(null);

  //OFFERS LISTING
  useEffect(() => {
    const fecthOfferListing = async () => {
      try {
        //Get ref
        const docRef = collection(db, "listings");
        //Create query
        const q = query(
          docRef,
          where("offer", "==", "yes"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        //execute the query
        const querySnap = await getDocs(q);

        let listing = [];
        querySnap.forEach((doc) => {
          return listing.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setOfferListing(listing);
      } catch (error) {
        console.log(error);
      }
    };

    fecthOfferListing();
  }, []);

  //Rent
  useEffect(() => {
    const fecthListing = async () => {
      try {
        //Get ref
        const docRef = collection(db, "listings");
        //Create query
        const q = query(
          docRef,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        //execute the query
        const querySnap = await getDocs(q);

        let listing = [];
        querySnap.forEach((doc) => {
          return listing.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setRentListing(listing);
      } catch (error) {
        console.log(error);
      }
    };

    fecthListing();
  }, []);

  //SALE
  useEffect(() => {
    const fecthListing = async () => {
      try {
        //Get ref
        const docRef = collection(db, "listings");
        //Create query
        const q = query(
          docRef,
          where("type", "==", "sale"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        //execute the query
        const querySnap = await getDocs(q);

        let listing = [];
        querySnap.forEach((doc) => {
          return listing.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setSaleListing(listing);
      } catch (error) {
        console.log(error);
      }
    };

    fecthListing();
  }, []);

  return (
    <div>
      <Slider />
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {offerListing && offerListing.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold uppercase">
              Recent offers
            </h2>
            <Link to="/offers">
              <button className="px-3 text-sm text-[#c69963] hover:text-[#e69436] transition-all duration-200 ease-in-out uppercase">
                Show more offers
              </button>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6 space-x-5">
              {offerListing.map((list) => (
                <ListingItem item={list?.data} key={list.id} id={list?.id} />
              ))}
            </ul>
          </div>
        )}
        {rentListing && rentListing.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold uppercase">
              Places for rent
            </h2>
            <Link to="/category/rent">
              <button className="px-3 text-sm text-[#c69963] hover:text-[#e69436] transition-all duration-200 ease-in-out uppercase">
                Show more
              </button>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6 space-x-5">
              {rentListing.map((list) => (
                <ListingItem item={list?.data} key={list.id} id={list?.id} />
              ))}
            </ul>
          </div>
        )}

        {saleListing && saleListing.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold uppercase">
              Places for Sale
            </h2>
            <Link to="/category/sale">
              <button className="px-3 text-sm text-[#c69963] hover:text-[#e69436] transition-all duration-200 ease-in-out uppercase">
                Show more
              </button>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6 space-x-5">
              {saleListing.map((list) => (
                <ListingItem item={list?.data} key={list.id} id={list?.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
