import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

export default function HeaderCartButton(props) {
  const [btnAnimated, setBtnAnimated] = useState(false);
  const cartCtx = useContext(CartContext);

  // Calculating total items like this because one item can be in various quantity
  const totalItems = cartCtx.items.reduce(
    (currentValue, currentItem) => currentValue + currentItem.amount,
    0
  );

  const btnClasses = `${classes.button} ${btnAnimated ? classes.bump : ""}`;
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnAnimated(true);

    const timer = setTimeout(() => {
      setBtnAnimated(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);
  return (
    <button onClick={props.onClick} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalItems}</span>
    </button>
  );
}
