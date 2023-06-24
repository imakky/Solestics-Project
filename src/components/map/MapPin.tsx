import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { CardComponent, CardProps } from "@yext/search-ui-react";
import Location from "../../types/locations";
import PinIcon from "../../icons/PinIcon";

// TODO: add to Pages module
const MapPin: CardComponent<Location> = ({ result }: CardProps<Location>) => {
  const [showCard, setShowCard] = useState(false);
  const { address } = result.rawData;
  return (
    // TODO: edit in the Pages module
    <div className="relative">
      <Transition
        show={showCard}
        enter="transition-opacity duration-750"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute -inset-x-24 bottom-12 z-50 h-24 w-60 gap-5 rounded-md bg-white p-4 align-middle shadow-sm shadow-stone-400/5">
          <div className="my-auto mx-auto flex flex-row">
            <div className="my-auto">
              <h3 className="text-lg font-normal">{result.name}</h3>
              <div className="font-sans text-stone-500">
                <p className="text-xs">
                  {address?.line1}, {address?.line2}
                </p>
                <p className="text-xs">
                  {address?.city}, {address?.region}, {address?.postalCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
      <PinIcon
        onMouseEnter={() => setShowCard(true)}
        onMouseLeave={() => setShowCard(false)}
      />
    </div>
  );
};

export default MapPin;
