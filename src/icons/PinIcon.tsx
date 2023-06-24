import * as React from "react";
import { useState } from "react";

interface PinIconProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const PinIcon = ({ onMouseEnter, onMouseLeave }: PinIconProps): JSX.Element => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    onMouseEnter && onMouseEnter();
  };

  const handleMouseLeave = () => {
    setHovered(false);
    onMouseLeave && onMouseLeave();
  };

  return (
    <svg
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      width="36"
      height="36"
      viewBox="0 0 257 379"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_301_2)">
        <path
          d="M252.86 123C252.86 190.931 128.43 371 128.43 371C128.43 371 4 190.931 4 123C4 55.069 59.7093 0 128.43 0C197.151 0 252.86 55.069 252.86 123Z"
          fill={hovered ? "white" : "#F85E00"}
        />
      </g>
      <g filter="url(#filter1_d_301_2)">
        <path
          d="M252.86 123C252.86 190.931 128.43 371 128.43 371C128.43 371 4 190.931 4 123C4 55.069 59.7093 0 128.43 0C197.151 0 252.86 55.069 252.86 123Z"
          fill={hovered ? "white" : "#F85E00"}
        />
      </g>
      <circle cx="128" cy="145" r="54" fill={hovered ? "#F85E00" : "white"} />
      <defs>
        <filter
          id="filter0_d_301_2"
          x="0"
          y="0"
          width="256.86"
          height="379"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_301_2"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_301_2"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_301_2"
          x="0"
          y="0"
          width="256.86"
          height="379"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_301_2"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_301_2"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default PinIcon;
