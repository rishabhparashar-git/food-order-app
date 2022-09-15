import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

export default function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-learning-a0dcf-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartCtx = useContext(CartContext);
  function toggleCheckout() {
    setIsCheckout((prev) => !prev);
  }
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItems = (
    <ul className={classes["cart-item"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.toggleCart} className={classes["button-alt"]}>
        Close
      </button>
      {cartCtx.items.length ? (
        <button onClick={toggleCheckout} className={classes.button}>
          Order
        </button>
      ) : (
        ""
      )}
    </div>
  );
  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`$${cartCtx.totalAmount.toFixed(2)}`}</span>
      </div>
      {isCheckout ? (
        <Checkout
          confirmHandler={submitOrderHandler}
          closeCheckout={toggleCheckout}
        />
      ) : (
        ""
      )}

      {!isCheckout && modalActions}
    </>
  );
  const submittingContent = (
    <p className={classes.paraText}>Submitting Your Order Please Wait !!</p>
  );
  const didSubmitContent = (
    <>
      <p className={classes.paraText}>
        Submitted !! Your Order is now being prepared : ){" "}
      </p>
      <button onClick={props.toggleCart} className={classes.button}>
        Close
      </button>
    </>
  );
  return (
    <Modal onClickBackdrop={props.toggleCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && submittingContent}
      {didSubmit && didSubmitContent}
    </Modal>
  );
}
