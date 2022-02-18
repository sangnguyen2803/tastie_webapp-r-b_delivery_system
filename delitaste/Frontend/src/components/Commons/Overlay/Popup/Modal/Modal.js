import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";

const portalRoot = document.getElementById("portal-root");

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/fontawesome-free-solid";

import "./Modal.scss";

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

const Modal = ({ isOpen, close, width, height, title, children }) => {
  const ref = useRef(null);

  const disableNextClick = () => {
    const listener = (evt) => {
      evt.stopPropagation();
      document.removeEventListener("click", listener, true);
    };
    document.addEventListener("click", listener, true);
  };

  useOnClickOutside(ref, () => {
    close();
  });

  if (!isOpen) return null;
  return (
    <div className="modal-darken-transparent-background">
      <div
        className="modal-container"
        ref={ref}
        style={{
          width: `${width}%`,
          height: `${height}px`,
          marginLeft: `-${width / 2}%`,
          marginTop: `-${height / 2}px`,
        }}
      >
        <div className="modal-header-row">
          <div className="modal-header-title">{title}</div>
          <FontAwesomeIcon
            className="modal-header-close-icon"
            onClick={close}
            icon={faTimes}
          />
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
