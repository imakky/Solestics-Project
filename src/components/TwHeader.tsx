import * as React from "react";
import { Fragment, useContext, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import DeliveryPopover from "./DeliveryPopover";
import { FaShoppingBasket } from "react-icons/fa";
import { CartContext } from "./providers/CartProvider";
import SearchBar from "./search/SearchBar";
import SearchIcon from "../icons/SearchIcon";
import ScreenOverlay from "./ScreenOverlay";
import { v4 as uuid } from "uuid";

const solutions = [
  {
    name: "Casuals",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "/casuals",
    // icon: ChartBarIcon,
  },
  {
    name: "Formals",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "/formals",
    // icon: CursorArrowRaysIcon,
  },
  {
    name: "Loafers",
    description: "Your customers' data will be safe and secure.",
    href: "/loafers",
    // icon: ShieldCheckIcon,
  },
  {
    name: "Sports",
    description: "Connect with third-party tools that you're already using.",
    href: "/sports",
  },
];
interface HeaderProps {
  hideLocationPicker?: boolean;
}

const Header = ({ hideLocationPicker }: HeaderProps) => {
  const [totalCartItems, setTotalCartItems] = useState(0);
  const { cartState } = useContext(CartContext);
  const [searchOpen, setSearchOpen] = useState(false);
console.log(cartState,"cartState");
  const toggleSearch = () => setSearchOpen(!searchOpen);

  useEffect(() => {
    setTotalCartItems(
      cartState.cartItems
        .map((item) => item.quantity)
        .reduce((a, b) => a + b, 0)
    );
  }, [cartState]);

  return (
    <>
      <Popover className="relative bg-orange">
        {searchOpen && (
          <ScreenOverlay>
            <SearchBar
              customCssClasses={{
                searchBarContainer: "py-6 px-3 lg:py-0 lg:px-0",
              }}
            />
          </ScreenOverlay>
        )}
        <div className="grid grid-cols-3 px-4 py-6 sm:px-6 md:grid-cols-2 md:space-x-10 lg:flex lg:justify-between ">
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-red hover:bg-light-orange  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red">
              <span className="sr-only">Open menu</span>
              <AiOutlineMenu className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="flex items-center space-x-8 place-self-center">
            <a className="flex" href="/">
              <span className="sr-only">Toast</span>
              <p className="text-3xl font-semibold text-red md:block">Solestics</p>
            </a>
            <div className="hidden space-x-6 md:flex">
              <a className="text-black" href="/casuals">
                Casuals
              </a>
              <a className="text-black" href="/formals">
                Formals
              </a>
              <a className="text-black" href="/loafers">
                Loafers
              </a>
              <a className="text-black" href="/sports">
                Sports
              </a>
            </div>
            <div className="z-50 hidden w-full lg:flex">
              <SearchBar customCssClasses={{ searchBarContainer: "mb-0" }} />
            </div>
          </div>
          <div className="flex space-x-1.5 place-self-end">
            <div className="lg:hidden">
              <button
                className="flex h-8 w-8 items-center text-red"
                onClick={toggleSearch}
              >
                {searchOpen ? <AiOutlineClose size={30} /> : <SearchIcon />}
              </button>
            </div>
            <a href="/cart">
              <div className="relative">
                <FaShoppingBasket className="mr-3 text-red" size={30} />
                {totalCartItems > 0 && (
                  <div className="absolute -bottom-0.5 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red text-xxs font-bold text-white">
                    {totalCartItems}
                  </div>
                )}
              </div>
            </a>
          </div>
        </div>
        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 z-50 origin-top-left transform p-2 transition md:hidden"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg  bg-light-orange shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <a className="flex" href="/">
                      <span className="sr-only">Toast</span>
                      <p className="text-3xl font-semibold text-red md:block">
                        TOAST
                      </p>
                    </a>
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md  p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red">
                      <span className="sr-only">Close menu</span>
                      <AiOutlineClose className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-6">
                    {solutions.map((item) => (
                      <a
                        key={uuid()}
                        href={item.href}
                        className="-m-3 flex items-center rounded-lg py-3 "
                      >
                        <div className="ml-4 text-base font-bold text-gray-900">
                          {item.name}
                        </div>
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      {/* {!hideLocationPicker && <DeliveryPopover />} */}
    </>
  );
};

export default Header;
