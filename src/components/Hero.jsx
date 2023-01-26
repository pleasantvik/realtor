import React from "react";
import logo from "resources/images/logo.png";
import bbc from "resources/images/logo-bbc.png";
import forbes from "resources/images/logo-forbes.png";
import bi from "resources/images/logo-bi.png";
import techcrunch from "resources/images/logo-techcrunch.png";

export const Hero = () => {
  return (
    <header className="header flex flex-col py-4">
      <div className="flex flex-col items-center">
        <img src={logo} alt="logo" className="w-[4.5rem]" />
        <h3 className="uppercase font-semibold text-[#c69963] mt-6">
          Your own home
        </h3>
        <h1 className="text-white">The ultimate personal freedom</h1>
      </div>

      <div className="my-4 before:border-t flex before:flex-1 items-center before:border-[#aaa] after:border-t after:flex-1  after:border-[#aaa] text-white">
        <p className="text-center font-semibold mx-4">As seen on</p>
      </div>
      <div className="flex sm:flex-row flex-col justify-around items-center whitespace-nowrap space-y-6 sm:space-y-0">
        <img src={bbc} alt="seen on logo 1" className="h-[2.5rem]" />
        <img src={forbes} alt="seen on logo 1" className="h-[2.5rem]" />
        <img src={techcrunch} alt="seen on logo 1" className="h-[2.5rem]" />
        <img src={bi} alt="seen on logo 1" className="h-[2.5rem]" />
      </div>
    </header>
  );
};
