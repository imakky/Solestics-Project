import * as React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export interface CounterProps {
  count: number;
  handleCountChange: (count: number, id?: string) => void;
  minusDisabled?: boolean;
  plusDisabled?: boolean;
  id?: string;
}

const Counter = ({
  count,
  handleCountChange,
  minusDisabled,
  plusDisabled,
  id,
}: CounterProps) => {
  return (
    <div className="flex w-28 border">
      <button
        className="flex w-1/3 items-center justify-center disabled:opacity-30"
        disabled={minusDisabled}
        onClick={() => handleCountChange(-1, id)}
      >
        <AiOutlineMinus size={24} />
      </button>
      <div className="flex w-1/3 items-center justify-center text-xl">
        {count}
      </div>
      <button
        className="flex w-1/3 items-center justify-center"
        onClick={() => handleCountChange(1, id)}
        disabled={plusDisabled}
      >
        <AiOutlinePlus size={24} />
      </button>
    </div>
  );
};

export default Counter;
