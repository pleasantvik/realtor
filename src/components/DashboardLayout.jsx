import React from "react";
import { NavLink } from "react-router-dom";
import { Slide } from "react-awesome-reveal";

export const DashboardLayout = (props) => {
  const sideBar = [
    {
      text: "Profile",
      linkTo: "/profile",
    },
    {
      text: "Listing",
      linkTo: "/listing",
    },
    // {
    //   text: "sahand",
    //   linkTo: "/sahand",
    // },
    {
      text: "Create",
      linkTo: "/create-listing",
    },
  ];
  return (
    <div className="flex max-w-6xl flex-col sm:flex-row">
      <div className=" bg-[#101d2c]   text-[#f6f7f9]">
        <ul className="flex sm:flex-col justify-around mt-10 px-10">
          {sideBar.map((item) => (
            <li key={item.linkTo} className="uppercase mb-4">
              <NavLink
                to={item.linkTo}
                className={(navData) =>
                  navData.isActive ? "border-b-[3px] text-[#f9f7f6] mb-3" : ""
                }
              >
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <main className="justify-center w-full mt-10">
        <Slide>{props.children}</Slide>
      </main>
    </div>
  );
};
