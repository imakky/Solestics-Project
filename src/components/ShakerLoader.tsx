import * as React from "react";
import ShakerIcon from "../icons/ShakerIcon";

export const ShakerLoader = () => (
  <div className="-z-10 flex h-96 w-full items-center justify-center">
    <div className="rotate-20 animate-shaker">
      <ShakerIcon />
    </div>
  </div>
);
