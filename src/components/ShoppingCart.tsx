import * as React from "react";
import { useContext } from "react";
import { CartActionTypes, CartContext } from "./providers/CartProvider";
import { Image } from "@yext/pages/components";
import { v4 as uuid } from "uuid";
import Counter from "./Counter";
import PlaceholderIcon from "../icons/PlaceholderIcon";

const ShoppingCart = () => {
  const { cartState, dispatch } = useContext(CartContext);
  console.log(cartState,"ShoppingCart");
  console.log("Cart");
  const getItemCount = (cartVariantId: string) => {
    return (
      cartState && cartState.cartItems.find((item) => item.cartVariant.id === cartVariantId)
        ?.quantity || 0
    );
  };

  const handleCountChange = (quantity: number, cartVariantId?: string) => {
    const cartVariant = cartState && cartState.cartItems.find(
      (item) => item.cartVariant.id === cartVariantId
    )?.cartVariant;
    if (cartVariant) {
      if (cartVariantId && getItemCount(cartVariantId) + quantity === 0) {
        dispatch({
          type: CartActionTypes.RemoveItem,
          payload: { cartVariant },
        });
      } else {
        dispatch({
          type: CartActionTypes.AddItem,
          payload: { cartVariant, quantity },
        });
      }
    }
  };

  return cartState.cartItems.length === 0 ? (
    <div className="flex justify-center py-8 ">
      <p className="text-2xl font-bold">Your cart is empty</p>
    </div>
  ) : (
    <>
      <div className="flex h-16 w-full items-center  justify-center border-b border-orange">
        <h1 className="py-8 text-2xl font-bold text-dark-orange">Your Cart</h1>
      </div>
      <div className="flex flex-col">
        {cartState && cartState.cartItems.map((item) => (
          <>
          {console.log(item,"item")}
          <div
            key={uuid()}
            className="flex flex-row items-center justify-between py-4"
          >
            <div className="flex flex-row items-center">
              {item.cartVariant.photo && (
                <div className="w-16 px-2 md:w-24">
                  {/* TODO: Add Placeholder Image */}
                  <Image image={item.cartVariant.photo} />
                </div>
              )}
              <div className="ml-4 flex flex-col">
                <p className="text-sm line-clamp-2 md:text-base">
                  {item.cartVariant.name}
                </p>
                <p className="text-sm md:text-base">
                  ${item.cartVariant.price}
                </p>
                <p className="text-sm md:text-base">{item.cartVariant.size}</p>
              </div>
            </div>
            <Counter
              count={getItemCount(item.cartVariant.id)}
              handleCountChange={handleCountChange}
              id={item.cartVariant.id}
            />
          </div>
          </>
        ))}
      </div>
      <div className="border-toast-orange flex h-16 w-full  items-center justify-center border-b">
        <p className="text-2xl font-bold text-dark-orange">Order Summary</p>
      </div>
      <div className="flex w-full justify-between py-2">
        <p className="font-bold">Subtotal</p>
        <p className="font-bold">{`$${cartState.totalPrice}`}</p>
      </div>
    </>
  );
};

export default ShoppingCart;
