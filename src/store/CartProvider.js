import { useEffect, useReducer } from "react";
import CartContext from "./cart-context";

const ACTIONS = { ADD: "ADD-ITEM", REMOVE: "REMOVE-ITEM" };

const defaultCartState = { items: [], totalAmount: 0 };
const cartReducerFunction = (previousCartState, action) => {
  switch (action.actionToDo) {
    case ACTIONS.ADD:
      //  because we don't want to mutate the the previous state but to create a new state
      // so using concat as concat returns a new array
      // and not push because push mutates the original one.
      console.log(previousCartState.items);
      console.log(typeof previousCartState.items);
      const updatedTotalAmount =
        previousCartState.totalAmount + action.item.price * action.item.amount;

      // below will contain index of the item if it exist otherwise -1
      const existingCartItemIndex = previousCartState.items.findIndex(
        (item) => item.id === action.item.id
      );
      // below will contain item if it already exist otherwise null
      const existingCartItem = previousCartState.items[existingCartItemIndex];

      let updatedItem;
      let updatedItems = [...previousCartState.items];

      if (existingCartItem) {
        updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems.push(action.item);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };

    case ACTIONS.REMOVE:
      let currentItems = [...previousCartState.items];
      let totalAmount = previousCartState.totalAmount;
      for (const item of currentItems) {
        if (item.id === action.id) {
          if (item.amount > 1) {
            item.amount -= 1;
          } else {
            currentItems = currentItems.filter((item) => item.id !== action.id);
          }
          totalAmount = totalAmount - item.price;
          break;
        }
      }

      // below use is a cleanup function in useEffect LEARN MORE about it
      return {
        items: currentItems,
        totalAmount: totalAmount,
      };
  }
};

export default function CartProvider(props) {
  const [cartState, dispatchCartState] = useReducer(
    cartReducerFunction,
    defaultCartState
  );
  const addItemHandler = (item) => {
    dispatchCartState({ actionToDo: ACTIONS.ADD, item: item });
  };
  const removeItemHandler = (id) => {
    dispatchCartState({ actionToDo: ACTIONS.REMOVE, id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

// This is just a helper Component it can be omitted completely
// Everything that's done here can be impplemented wherever cart-context is required
