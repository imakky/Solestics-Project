import { Transition } from "@headlessui/react";
import * as React from "react";
import { RiCloseFill, RiCheckFill } from "react-icons/ri";

interface ToastMessageProps {
  message: string;
  onClose?: () => void;
  show?: boolean;
}

const ToastMessage = ({ message, onClose, show }: ToastMessageProps) => {
  return (
    <div className="fixed top-40 right-4 ">
      <Transition
        show={show}
        enter="transform transition ease-in-out duration-500 sm:duration-700"
        enterFrom="translate-x-full"
        enterTo="translate-x-30"
        leave="transform transition ease-in-out duration-500 sm:duration-700"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="rounded-lg bg-light-orange p-4 shadow-lg">
          <div className="flex items-center">
            <div className="pr-2 text-dark-orange">
              <RiCheckFill size={24} />
            </div>
            <div className="py-2 pr-16">
              <p className="text-xl font-semibold leading-5 text-dark-orange">
                {message}
              </p>
            </div>
            {onClose && (
              <button onClick={onClose}>
                <RiCloseFill size={24} />
              </button>
            )}
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default ToastMessage;
