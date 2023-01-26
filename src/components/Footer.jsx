import React from "react";
import logo from "resources/images/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-[#101d2c] border-b shadow-sm sticky top-0 z-40 mt-[4.5rem]">
      <div className="flex flex-col items-center justify-center p-4">
        <img src={logo} alt="logo" className="h-[2.5rem]" />
        <p className="text-white font-bold mt-[2rem]">
          Adedayo Victor &copy; 2023
        </p>
      </div>
    </footer>
  );
};
