import { Fragment } from "react";
import foodImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

export default function Header(props) {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Food App</h1>
        <HeaderCartButton onClick={props.toggleCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={foodImage} alt="delicious food" />
      </div>
    </Fragment>
  );
}
