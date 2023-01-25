import { db } from "../firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { Fragment, useEffect, useState } from "react";
import { Spinner } from "components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { useNavigate } from "react-router-dom";

export const Slider = () => {
  const [listings, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleNavigate = (detail) => {
    navigate(`/category/${detail?.data?.type}/${detail?.id}`);
  };
  //Initialize the swiper
  SwiperCore.use([Autoplay, Navigation, Pagination]);

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, "listings");

      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));

      const querySnap = await getDocs(q);

      let items = [];
      querySnap.forEach((doc) => {
        return items.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListing(items);
      setLoading(false);
    };
    fetchListings();
  }, []);
  console.log(listings);
  const renderList = (
    <Swiper
      slidesPerView={1}
      navigation
      pagination={{ type: "progressbar" }}
      effect="fade"
      modules={[EffectFade]}
      autoplay={{ delay: 3000 }}
    >
      {listings?.map((item) => (
        <SwiperSlide key={item?.id} onClick={() => handleNavigate(item)}>
          <div
            className="w-full h-[300px] overflow-hidden cursor-pointer relative"
            style={{
              background: `url(${item?.data?.imgUrls[0]}) center no-repeat`,
              backgroundSize: "cover",
            }}
          ></div>
          <p className="absolute text-white px-7 py-3 rounded-br-3xl uppercase left-1 top-3 font-medium max-w-[90%] bg-[#101d2c] shadow-lg italic">
            {item?.data?.propertyName}
          </p>
          <p className="absolute text-white px-7 py-3 rounded-tr-3xl uppercase left-1 bottom-3 font-medium max-w-[90%] bg-[#e69436] shadow-lg italic">
            ${item?.data?.discountPrice ?? item?.data?.price}
            {item?.data?.type === "rent" && " / month"}
          </p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
  return (
    <div>
      {loading && <Spinner />}
      {!loading && listings.length === 0 && <p>No listing</p>}
      {!loading && listings.length > 0 && <Fragment>{renderList}</Fragment>}
    </div>
  );
};
