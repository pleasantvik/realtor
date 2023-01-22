import React from "react";

export const ListingItem = ({ item }) => {
  console.log(item, "ITEM");
  return <div>{item.data?.address}</div>;
};
