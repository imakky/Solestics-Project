import { ComplexImageType, ImageType } from "@yext/pages/components";
import { getRuntime } from "@yext/pages/util";
import * as React from "react";
import { createContext, useEffect, useReducer, Dispatch } from "react";
import { deepEqual } from "../../util";
import { ProviderProps } from "./AppProvider";

export interface CartVariant {
  c_price: number;
  id: string;
  name: string;
  price: any ;
  size: string;
  photo?: ImageType | ComplexImageType;
}

export interface CartState {
  cartItems: {
    cartVariant: CartVariant;
    quantity: number;
  }[];
  totalPrice: number;
}

export enum CartActionTypes {
  AddItem,
  RemoveItem,
  SetCartFromStorage,
}

export interface SetCartFromStorage {
  type: CartActionTypes.SetCartFromStorage;
  payload: CartState;
}

export interface AddItem {
  type: CartActionTypes.AddItem;
  payload: { cartVariant: CartVariant; quantity: number };
}

export interface RemoveItem {
  type: CartActionTypes.RemoveItem;
  payload: { cartVariant: CartVariant };
}

export type CartActions = AddItem | RemoveItem | SetCartFromStorage;

export const cartReducer = (state: CartState, action: CartActions) => {
  // const itemInCart = state.cartItems.find(
  //   (item) =>
  //     item.cartVariant.id === action.payload.cartVariant.id
  // );
  switch (action.type) {
    case CartActionTypes.SetCartFromStorage:
      return action.payload;
    case CartActionTypes.AddItem:
      // eslint-disable-next-line no-case-declarations
      const itemToAdd = state.cartItems.find(
        (item) => item.cartVariant.id === action.payload.cartVariant.id
      );
      if (itemToAdd) {
        itemToAdd.quantity += action.payload.quantity;
      } else {
        state.cartItems.push({
          cartVariant: action.payload.cartVariant,
          quantity: action.payload.quantity,
        });
      }
      return { ...state, totalPrice: calculateTotalPrice(state.cartItems) };

    case CartActionTypes.RemoveItem:
      // eslint-disable-next-line no-case-declarations
      const itemToRemove = state.cartItems.find(
        (item) => item.cartVariant.id === action.payload.cartVariant.id
      );
      if (itemToRemove) {
        itemToRemove.quantity--;
        if (itemToRemove.quantity === 0) {
          state.cartItems = state.cartItems.filter(
            (item) => item.cartVariant.id !== action.payload.cartVariant.id
          );
        }
        return { ...state, totalPrice: calculateTotalPrice(state.cartItems) };
      } else {
        return state;
      }
    default:
      return state;
  }
};

const calculateTotalPrice = (
  cartItems: { cartVariant: CartVariant; quantity: number }[]
): number => {
  return (
    Math.round(
      cartItems
        .map((item) => (Number(item.cartVariant.price) ?? 0) * item.quantity)
        .reduce((a, b) => a + b, 0) * 100
    ) / 100
  );
};

export const CartContext = createContext<{
  cartState: CartState;
  dispatch: Dispatch<CartActions>;
}>({
  cartState: {
    cartItems: [],
    totalPrice: 0,
  },
  dispatch: () => null,
});

const CartProvider = ({ children }: ProviderProps) => {
  const [cartState, dispatch] = useReducer(cartReducer, {
    cartItems: [],
    totalPrice: 0,
  });

  // useEffect hook to parse the cart from local storage if not server side
  useEffect(() => {
    if (!getRuntime().isServerSide) {
      const storageCartString = localStorage.getItem("cart");
      if (storageCartString) {
        const storageCart = JSON.parse(storageCartString);
        dispatch({
          type: CartActionTypes.SetCartFromStorage,
          payload: storageCart,
        });
      }
    }
  }, [getRuntime().isServerSide]);

  useEffect(() => {
    if (!getRuntime().isServerSide) {
      if (
        !deepEqual(cartState, JSON.parse(localStorage.getItem("cart") ?? "{}"))
      ) {
        localStorage.setItem("cart", JSON.stringify(cartState));
      }
    }
  }, [cartState]);

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
