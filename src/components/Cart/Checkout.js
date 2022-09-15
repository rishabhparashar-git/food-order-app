import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveCharsLong = (value) => value.trim().length === 5;

export default function Checkout(props) {
  const [formValidity, setFormValidity] = useState({
    name: true,
    postalCode: true,
    city: true,
    street: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = isFiveCharsLong(enteredPostalCode);

    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      setFormValidity({
        name: enteredNameIsValid,
        postalCode: enteredPostalCodeIsValid,
        city: enteredCityIsValid,
        street: enteredStreetIsValid,
      });
      return;
    }
    props.confirmHandler({
      name: enteredName,
      postalCode: enteredPostalCode,
      city: enteredCity,
      street: enteredStreet,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formValidity.name ? "" : classes.invalid
  } `;

  const streetControlClasses = `${classes.control} ${
    formValidity.street ? "" : classes.invalid
  } `;
  const postalCodeControlClasses = ` ${classes.control} ${
    formValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlClasses = ` ${classes.control} ${
    formValidity.city ? "" : classes.invalid
  } `;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          placeholder={!formValidity.name && "Enter Valid Name"}
        />
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          ref={streetInputRef}
          type="text"
          id="street"
          placeholder={!formValidity.street && "Enter Valid street"}
        />
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          ref={postalCodeInputRef}
          type="text"
          id="postal"
          placeholder={!formValidity.name && "Postal Code must be of 5 digits"}
        />
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input
          ref={cityInputRef}
          type="text"
          id="city"
          placeholder={!formValidity.city && "Enter Valid City"}
        />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.closeCheckout}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
}
