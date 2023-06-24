import * as React from "react";

interface BottomButtonProps {
  label: string;
  handleClick: () => void;
}

const BottomButton = ({
  label,
  handleClick,
}: BottomButtonProps): JSX.Element => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 flex h-16 w-full items-center justify-center border-t bg-white">
      <button
        className="h-10 w-80 rounded bg-blue"
        onClick={() => handleClick()}
      >
        <p className="text-center text-base font-bold text-white">{label}</p>
      </button>
    </div>
  );
};

export default BottomButton;
