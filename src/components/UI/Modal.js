import classes from "./Modal.module.css";
import React from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClickBackdrop} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalPosition = document.getElementById("overlay");

export default function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClickBackdrop={props.onClickBackdrop} />, portalPosition)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalPosition
      )}
    </>
  );
}
