import * as React from "react";
import { CardComponent, CardProps } from "@yext/search-ui-react";
import Location from "../../../types/locations";
import {
  LocationActionType,
  LocationContext,
} from "../../providers/LocationsProvider";
import { useContext } from "react";

const metersToMiles = (meters: number) => {
  const miles = meters * 0.000621371;
  return miles.toFixed(2);
};

const LocationMapCard: CardComponent<Location> = ({
  result,
}: CardProps<Location>) => {
  const { address, id, slug } = result.rawData;

  const { dispatch, locationState } = useContext(LocationContext);

  const handleRadioClick = () => {
    if (address.line1) {
      dispatch({
        type: LocationActionType.SetAddressLine1,
        payload: {
          checkedLocation: {
            addressLine1: address.line1,
          },
        },
      });
    }
  };

  return (
    <div className="flex justify-between bg-white p-4">
      <div>
        <p className="text-sm font-bold text-black">{address.line1}</p>
        <p className="text-sm font-bold text-black">
          {address.city}, {address.region}, {address.postalCode}{" "}
        </p>
        <p className="mt-1 text-xs italic text-slate-500">
          {/* TODO: maybe add to the Pages module */}
          {metersToMiles(result.distanceFromFilter ?? result.distance ?? 0)} mi
        </p>
        <a
          // target="_blank"
          href={slug}
          className="text-blue-700 text-xs hover:underline"
          rel="noreferrer"
        >
          View Location
        </a>
      </div>
      <div className="flex gap-1 align-baseline">
        <p className="text-sm">Delivery Location: </p>
        <input
          type="radio"
          name="location"
          value={id}
          onChange={handleRadioClick}
          checked={
            address.line1 === locationState.checkedLocation?.addressLine1
          }
          className="form-radio mr-3 mt-0.5  text-orange focus:outline-orange"
        />
      </div>
    </div>
  );
};

export default LocationMapCard;
