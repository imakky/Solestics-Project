import * as React from "react";
import {
  provideHeadless,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import searchConfig from "../config/searchConfig";
import { useContext, useState } from "react";
import classNames from "classnames";
import GoogleLocationSearch from "./GoogleLocationSearch";
import {
  LocationContext,
} from "./providers/LocationsProvider";

import { LocationSelectorDropdown } from "./DeliveryPopover";



const locationsSearcher = provideHeadless({
  ...searchConfig,
  verticalKey: "locations",
  headlessId: "location-searcher",
});

interface LocationModalProps {
  onClickOutOfModal?: () => void;
}

const LocationModal = ({ onClickOutOfModal }: LocationModalProps) => {
  const [addressInputOpen, setAddressInputOpen] = useState(true);

  const { locationState } = useContext(LocationContext);

  const handleModalButtonClick = () => setAddressInputOpen(!addressInputOpen);

  return (
    <>
      <div className="w-full bg-white md:mx-auto md:max-w-xl">
        <div className="grid grid-cols-2 py-4">
          <button
            className={classNames("mx-4 flex justify-center ", {
              "border-b-2 border-dark-orange": addressInputOpen,
            })}
            onClick={handleModalButtonClick}
            disabled={addressInputOpen}
          >
            <div>Delivery Address</div>
          </button>
          <button
            className={classNames("mx-4 flex justify-center ", {
              "border-b-2 border-dark-orange": !addressInputOpen,
              "text-gray-400": !locationState.userLocation,
            })}
            onClick={handleModalButtonClick}
            disabled={!locationState.userLocation || !addressInputOpen}
          >
            Available Stores
          </button>
        </div>
        <SearchHeadlessProvider searcher={locationsSearcher}>
          {addressInputOpen && <GoogleLocationSearch />}
          <LocationSelectorDropdown hidden={addressInputOpen} />
        </SearchHeadlessProvider>
      </div>
      <div
        className="fixed top-28 -z-10 h-full w-full bg-gray-600 opacity-50"
        onClick={onClickOutOfModal}
      ></div>
    </>
  );
};

export default LocationModal;
