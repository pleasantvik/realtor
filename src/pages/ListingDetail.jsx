import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Spinner } from "components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";

import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { ContactOwner } from "components/ContactOwner";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export const ListingDetail = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [contactOwner, setContactOwner] = useState(false);
  const { type, listingId } = useParams();
  const auth = getAuth();
  console.log(type, listingId);
  const position = [listing?.geolocation?.lat, listing?.geolocation?.lng];

  SwiperCore.use([Autoplay, Navigation, Pagination]);

  const handleShareLinkCopied = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareLinkCopied(true);
    console.log("uncopied");

    setTimeout(() => {
      setShareLinkCopied(false);
      console.log("copied");
    }, 2000);
  };

  const handleContactOwner = () => {
    setContactOwner(true);
  };

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };

    fetchListing();
  }, [listingId]);
  console.log(listing, "DETAIL");
  if (loading) {
    return <Spinner />;
  }
  return (
    <main className="relative">
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listing?.imgUrls?.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${item}) center no-repeat `,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        onClick={handleShareLinkCopied}
        className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center"
      >
        <FaShare className="text-lg text-slate-500 " />
      </div>
      {shareLinkCopied && (
        <p className="fixed top-[20%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2">
          Link copied
        </p>
      )}

      <article className="flex flex-col md:flex-row max-w-6xl lg:mx-auto m-4 p-4 rounded-lg  shadow-lg bg-white lg:space-x-5">
        <section className="  w-full   mb-2">
          <h2 className="text-2xl font-bold mb-3 text-[#162331]">
            {listing?.propertyName} &mdash; $
            {listing?.offer
              ? listing?.discountPrice
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing?.price
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing?.type === "rent" && "/ month"}
          </h2>
          <p className="flex items-center mt-6 mb-3 font-semibold">
            <FaMapMarkerAlt className="text-[#c69963] mr-1" />
            {listing?.address}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p className="bg-red-800 w-full max-w-[200px] text-white p-1 rounded-md text-center font-semibold shadow-md ">
              {listing?.type === "rent" ? "Rent" : "Sale"}
            </p>
            {listing?.offer && (
              <p className="bg-green-800 w-full max-w-[200px] text-white p-1 rounded-md text-center font-semibold shadow-md">
                ${listing?.price - listing?.discountPrice}
              </p>
            )}
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description &mdash; </span>
            <span>{listing?.description}</span>
          </p>
          <ul className="flex space-x-2 items-center lg:space-x-10 text-sm font-semibold">
            <li className="font-bold text-xs flex items-center whitespace-nowrap">
              <FaBed className="text-lg mr-1 text-[#c69963]" />
              {listing?.beds > 1 ? `${listing?.beds} Beds ` : "1 bed"}
            </li>
            <li className="font-bold text-xs flex items-center whitespace-nowrap">
              <FaBath className="text-lg mr-1 text-[#c69963]" />
              {listing?.bathrooms > 1
                ? `${listing?.bathrooms} Baths `
                : "1 Bath"}
            </li>
            <li className="font-bold text-xs flex items-center whitespace-nowrap">
              <FaParking className="text-lg mr-1 text-[#c69963]" />
              {listing?.parks === "yes" ? `Parking Spot` : "No Parking"}
            </li>
            <li className="font-bold text-xs flex items-center whitespace-nowrap">
              <FaChair className="text-lg mr-1 text-[#c69963]" />
              {listing?.furnished === "yes" ? `Furnished ` : "Not Furnished"}
            </li>
          </ul>
          {listing.userRef === auth.currentUser?.uid && (
            <div className="mt-6">
              {!contactOwner && (
                <button
                  className="px-7 py-3 bg-[#101d2c] text-white font-medium text-sm uppercase rounded shadow-md hover:bg-[#162331] hover:shadow-lg mt-3 transition-all duration-150 ease-in-out w-full text-center  "
                  onClick={handleContactOwner}
                >
                  Contact Owner
                </button>
              )}
              {contactOwner && (
                <ContactOwner userRef={listing?.userRef} listing={listing} />
              )}
            </div>
          )}
        </section>
        <div className="w-full h-[200px] md:h-[400px]  z-10 overflow-x-hidden">
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>{listing?.address}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </article>
    </main>
  );
};
