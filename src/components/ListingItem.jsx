import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { MdLocationOn, MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

export const ListingItem = ({ item, id, onEdit, onDelete }) => {
  console.log(item.type, "ITEM");
  console.log(id, "ITEM");
  return (
    <li className="flex flex-col justify-between items-center hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 relative m-[10px]">
      <Link to={`/category/${item.type}/${id}`} className="contents">
        <img
          src={item?.imgUrls[0]}
          alt=""
          className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
          loading="lazy"
        />
        <Moment
          className="absolute top-2 left-2 bg-[#101d2c] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg"
          fromNow
        >
          {item?.timestamp?.toDate()}
        </Moment>
        <div className="w-full p-[10px]">
          <div className=" flex items-center space-x-1">
            <MdLocationOn className="h-4 w-4 text-[#c69966]" />
            <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">
              {item?.address}
            </p>
          </div>
          <p className="font-semibold m-0 text-xl truncate ">
            {item?.propertyName}
          </p>
          <p className="text[#457b90] mt-2 font-semibold">
            $
            {item?.offer === "yes"
              ? item?.discountPrice
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : item?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {item?.type === "rent" && "/ month"}
          </p>
          <div className=" flex items-center mt[10px] space-x-3">
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">
                {item?.beds > 1 ? `${item?.beds} Beds ` : "1 bed"}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">
                {item?.bathrooms > 1 ? `${item?.bathrooms} Baths ` : "1 Bath"}
              </p>
            </div>
          </div>
        </div>
      </Link>
      {onDelete && (
        <FaTrash
          className="absolute right-3 bottom-3 h-[14px] cursor-pointer text-red-600"
          onClick={() => onDelete(id)}
        />
      )}
      {onEdit && (
        <MdEdit
          className="absolute right-7 bottom-3 h-[14px] cursor-pointer"
          onClick={() => onEdit(id)}
        />
      )}
    </li>
  );
};
