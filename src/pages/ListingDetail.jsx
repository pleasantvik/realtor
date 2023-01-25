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
import { FaShare } from "react-icons/fa";

export const ListingDetail = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const { type, listingId } = useParams();
  console.log(type, listingId);

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
    </main>
  );
};
