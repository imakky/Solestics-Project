import * as React from "react";
import { Fragment, useContext, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  LocationActionType,
  LocationContext,
} from "./providers/LocationsProvider";
import {
  provideHeadless,
  SearchHeadlessProvider,
  useSearchActions,
} from "@yext/search-headless-react";
import GoogleLocationSearch from "./GoogleLocationSearch";
import { VerticalResults } from "@yext/search-ui-react";
import searchConfig from "../config/searchConfig";
import classNames from "classnames";
import LocationCard from "./search/cards/LocationCard";
import Location from "../types/locations";

const locationsSearcher = provideHeadless({
  ...searchConfig,
  verticalKey: "locations",
  headlessId: "location-searcher",
});

interface LocationSelectorDropdownProps {
  hidden?: boolean;
}
export const LocationSelectorDropdown = ({
  hidden = false,
}: LocationSelectorDropdownProps) => {
  const searchActions = useSearchActions();
  const { dispatch } = useContext(LocationContext);

  const { locationState } = useContext(LocationContext);

  useEffect(() => {
    if (locationState.userLocation?.latLong) {
      searchActions.setUserLocation(locationState.userLocation.latLong);
      searchActions.executeVerticalQuery();
    }
  }, [locationState.userLocation?.latLong]);

  const handleAllStoresClick = () => {
    dispatch({
      type: LocationActionType.SetAddressLine1,
      payload: { checkedLocation: { addressLine1: "ALL" } },
    });
  };

  return (
    // TODO: add loading icon when stores are loading, maybe use local storage if address doesn't change
    !hidden ? (
      <div className="h-[calc(100vh-170px)] overflow-y-auto pb-10">
        <div className="mx-4 flex items-center border-b py-4">
          <input
            type="radio"
            name="location"
            onClick={handleAllStoresClick}
            checked={locationState.checkedLocation?.addressLine1 === "ALL"}
            className="form-radio mr-3 text-orange  focus:outline-orange"
          />
          <label className="py-2.5 text-sm text-black">All Stores</label>
        </div>
        <VerticalResults<Location> CardComponent={LocationCard} />
      </div>
    ) : (
      <></>
    )
  );
};

const DeliveryPopover = () => {
  const { locationState } = useContext(LocationContext);
  const [addressInputOpen, setAddressInputOpen] = useState(true);

  const handleModalButtonClick = () => setAddressInputOpen(!addressInputOpen);

  const renderDeliveryFromAddress = () => {
    if (locationState.checkedLocation?.addressLine1) {
      return (
        <div>
          Delivery From:
          <span className="pl-1 text-dark-orange">
            {locationState.checkedLocation?.addressLine1}
          </span>
        </div>
      );
    } else {
      return (
        <div className="text-dark-orange hover:underline">
          Choose a location near you!
        </div>
      );
    }
  };

  return (
    <Popover className="relative z-20">
      {({ open, close }) => {
        useEffect(() => {
          if (open) {
            document.body.style.overflow = "hidden";
          }
          // cleanup function that runs when component unmounts and sets overflow back to normal
          return () => {
            document.body.style.overflow = "unset";
          };
        }, [open]);

        return (
          <>
            <div className="relative">
              <div
                className={classNames(
                  "flex w-full items-center justify-center  bg-light-orange py-4",
                  { "shadow-lg": !open }
                )}
              >
                <Popover.Button className="group inline-flex items-center focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2">
                  {renderDeliveryFromAddress()}
                </Popover.Button>
              </div>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 -translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-1"
            >
              <Popover.Panel className="absolute inset-x-0 z-30 transform ">
                <div
                  className="fixed -z-10 min-h-screen w-screen bg-gray-600 opacity-50"
                  onClick={() => close()}
                ></div>
                <div className="w-full bg-white md:mx-auto md:max-w-xl ">
                  <div className="grid grid-cols-2  py-4 ">
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
                      disabled={
                        !locationState.userLocation || !addressInputOpen
                      }
                    >
                      Available Stores
                    </button>
                  </div>
                  <SearchHeadlessProvider searcher={locationsSearcher}>
                    {addressInputOpen && <GoogleLocationSearch />}
                    <LocationSelectorDropdown hidden={addressInputOpen} />
                  </SearchHeadlessProvider>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        );
      }}
    </Popover>
  );
};

export default DeliveryPopover;
