import React from "react";
import { ReactComponent as Loader } from "resources/svg/spinner.svg";

export const Spinner = () => {
  return (
    <div className="flex bg-black bg-opacity-50 items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-50">
      <div>
        <Loader className="h-24" />
      </div>
    </div>
  );
};
