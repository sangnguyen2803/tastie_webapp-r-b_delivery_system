import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/fontawesome-free-solid";
import "./Modal.scss";

const Modal = (props) => {
  return (
    <div className="darken-transparent-background">
      <div
        className="modal-container"
        style={{
          width: `${props.width}px`,
          height: `${props.height}px`,
          marginLeft: `-${props.width / 2}px`,
          marginTop: `-${props.height / 2}px`,
        }}
      >
        {props.component}
      </div>
    </div>
  );
};

export default Modal;
