import * as React from "react";

import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// TODO: create a way for the dropdown to have a no sort label
interface DropdownProps<T> {
  customCssClasses?: {
    menu: string;
  };
  options: {
    label: string;
    sort: T;
  }[];
  onSortChange?: (sort: T) => void;
}
// Generic type 'DropdownProps<T>' requires 1 type argument(s)

const SortingDropdown = <T,>({
  customCssClasses,
  options,
  onSortChange,
}: DropdownProps<T>) => {
  const [currentSort, setCurrentSort] = useState(options[0]);

  // TODO: use effect that calls a callback when the currentSort changes
  React.useEffect(() => {
    onSortChange && onSortChange(currentSort.sort);
  }, [currentSort]);

  return (
    <Menu
      as="div"
      className={twMerge(
        "relative inline-block text-left",
        customCssClasses?.menu
      )}
    >
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:ring-offset-gray-100">
          {currentSort.label}
          <BiChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {/* map through the options and return a Menu.Item for each except for the option that is the currentSort */}
            {options
              .filter((option) => option.label !== currentSort.label)
              .map((option) => (
                <Menu.Item key={option.label}>
                  {({ active }) => (
                    <button
                      onClick={() => setCurrentSort(option)}
                      className={classNames(
                        active ? "bg-light-orange" : "",
                        "block w-full px-4 py-2 text-left text-sm text-gray-700"
                      )}
                    >
                      {option.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default SortingDropdown;
