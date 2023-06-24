import * as React from "react";
import { useContext, useState } from "react";
import Counter from "./Counter";
import {
  CartActionTypes,
  CartContext,
  CartVariant,
} from "./providers/CartProvider";

export interface ProductCounterProps {
  cartVariant: CartVariant;
  addedToCart?: () => void;
}

const ProductCounter = ({ cartVariant, addedToCart }: ProductCounterProps) => {
  console.log(cartVariant,"cartVariant");
  const { cartState, dispatch } = useContext(CartContext);
  const [displaySum, setDisplaySum] = useState(
    cartState.cartItems.find((item) => item.cartVariant.id === cartVariant.id)
      ?.quantity ?? 1
  );

  const handleDisplaySumChange = (quantity: number) => {
    setDisplaySum(displaySum + quantity);
  };

  const handleAddToCart = () => {
    addedToCart && addedToCart();
    dispatch({
      type: CartActionTypes.AddItem,
      payload: { cartVariant, quantity: displaySum },
    });
  };

  return (
    <div className="flex min-h-[40px]">
      <Counter
        count={displaySum}
        handleCountChange={handleDisplaySumChange}
        minusDisabled={displaySum === 1}
      />
      <button
        className="ml-6  w-52 rounded bg-blue"
        onClick={() => handleAddToCart()}
      >
        <p className="text-center text-base font-bold text-white">
          Add to cart - ₹{(cartVariant.price * displaySum)}
        </p>
      </button>
    </div>
  );
};

export default ProductCounter;
