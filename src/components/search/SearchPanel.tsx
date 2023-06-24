import * as React from "react";
import SearchBar from "./SearchBar";

const SearchPanel = () => {
  return (
    <div className="absolute left-4 right-4 z-[100] flex flex-col items-center ">
      <div className="h-full w-[420px]">
        <div
          className="my-8 flex flex-col items-center rounded-xl bg-light-orange/90  
        "
        >
          <div className="my-8 w-full bg-orange  px-14 py-2 text-center text-3xl font-semibold text-red 2xl:px-20 ">
            Solestics
            <p className="py-2 text-base text-black">
              Shop best and trendy shoes.
            </p>
          </div>
          {/* <div className="w-full px-8">
            <SearchBar customCssClasses={{}} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
