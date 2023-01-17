import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "resources/images/logo.png";

export const Header = () => {
  return (
    <div className="bg-[#101d2c] border-b shadow-sm sticky top-0 z-50">
      <header className=" p-4 flex justify-between items-center max-w-6xl mx-auto">
        <div>
          <Link to="/">
            <img src={logo} alt="Nexter Logo" className="h-5 cursor-pointer" />
          </Link>
        </div>
        <nav>
          <ul className="md:space-x-8 flex space-x-4 font-semibold text-sm text-gray-400">
            <li className={`font-semibold text-sm `}>
              <NavLink
                to="/"
                className={(navData) =>
                  navData.isActive ? "border-b-[3px] text-[#f9f7f6] mb-3" : ""
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/offers"
                className={(navData) =>
                  navData.isActive ? "border-b-[3px] text-[#f9f7f6] mb-3" : ""
                }
              >
                Offer
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={(navData) =>
                  navData.isActive ? "border-b-[3px] text-[#f9f7f6]" : ""
                }
              >
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};
