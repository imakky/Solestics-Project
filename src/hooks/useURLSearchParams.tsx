import { useState, useEffect } from "react";
import { getRuntime } from "@yext/pages/util";

const getURLSearchParams = () => {
  if (!getRuntime().isServerSide) {
    return new URLSearchParams(window.location.search);
  } else {
    return;
  }
};

export const useURLSearchParams = () => {
  const [urlSearchParams, setUrlSearchParams] = useState(getURLSearchParams);

  useEffect(() => {
    const onChange = () => {
      setUrlSearchParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener("popstate", onChange);
    return () => {
      window.removeEventListener("popstate", onChange);
    };
  }, [urlSearchParams]);

  return urlSearchParams;
};

export default useURLSearchParams;
