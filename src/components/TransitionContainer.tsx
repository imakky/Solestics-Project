import { Transition } from "@headlessui/react";
import * as React from "react";

interface TransitionContainerProps {
  children?: React.ReactNode;
  show?: boolean;
}

const TransitionContainer = ({
  children,
  show = true,
}: TransitionContainerProps) => {
  return (
    <Transition
      show={show}
      enter="transition-opacity duration-50"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
};

export default TransitionContainer;
