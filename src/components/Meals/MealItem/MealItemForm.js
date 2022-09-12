import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
const MealItemForm = (props) => {
  const amountInputRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      setTimeout(() => {
        setAmountIsValid(true)
      }, 1000);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          type: "number",
          id: "amount_" + props.mealId,
          min: 1,
          // max: 5,
          step: 1,
          defaultValue: 1,
        }}
      />
      <button>Add to Cart</button>
      {!amountIsValid && <p>Enter Valid Amount</p>}
    </form>
  );
};
export default MealItemForm;
