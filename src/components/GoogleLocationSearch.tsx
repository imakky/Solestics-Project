import * as React from "react";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from "react-google-places-autocomplete";
import {
  LocationActionType,
  LocationContext,
} from "./providers/LocationsProvider";
import { useContext } from "react";

const GOOGLE_API_KEY = import.meta.env.YEXT_PUBLIC_GOOGLE_API_KEY;

const GoogleLocationSearch = () => {
  const { dispatch } = useContext(LocationContext);

  const handleSelect = (data: any) => {
    geocodeByPlaceId(data.value.place_id)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        dispatch({
          type: LocationActionType.SetUserLocation,
          payload: {
            userLocation: {
              displayName: data.label.split(",")[0],
              latLong: { latitude: lat, longitude: lng },
            },
          },
        });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
  return (
    <GooglePlacesAutocomplete
      apiKey={GOOGLE_API_KEY}
      selectProps={{
        onChange: handleSelect,
        styles: {
          container: (provided: any) => ({
            ...provided,
            maxWidth: "320px",
            margin: "0 auto",
            paddingBottom: "1rem",
            borderColor: "black",
          }),
          dropdownIndicator: (provided: any) => ({
            ...provided,
            display: "none",
          }),
          menu: (provided: any) => ({
            ...provided,
            padding: "0",
            marginTop: "0",
          }),
        },
      }}
    />
  );
};

export default GoogleLocationSearch;
