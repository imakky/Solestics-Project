import * as React from "react";

interface ScreenOverlayProps {
  children?: React.ReactNode;
}

const ScreenOverlay = ({ children }: ScreenOverlayProps): JSX.Element => {
  return (
    <div className="fixed top-[84px] bottom-0 left-0 z-50 w-screen bg-white">
      {children}
    </div>
  );
};

export default ScreenOverlay;
