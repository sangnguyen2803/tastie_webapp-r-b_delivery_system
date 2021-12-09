import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";

const portalRoot = document.getElementById("portal-root");

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/fontawesome-free-solid";

import "./Modal.scss";

const Modal = ({ isOpen, close, width, height, title, children }) => {
  const contentRef = useRef(null);
  /*
  useEffect(() => {
   
    
    if (!isOpen) return;
    function listener(event) {
      if (contentRef.current?.contains(event.target)) return;

      close();
    }

    window.addEventListener("click", listener);
    return () => {
      window.removeEventListener("click", listener);
    };
  }, [isOpen]);
  */

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="darken-transparent-background">
      <div
        className="modal-container"
        style={{
          width: `${width}%`,
          height: `${height}px`,
          marginLeft: `-${width / 2}%`,
          marginTop: `-${height / 2}px`,
        }}
      >
        <div className="header-row">
          <div className="header-title">{title}</div>
          <FontAwesomeIcon
            className="header-close-icon"
            onClick={close}
            icon={faTimes}
          />
        </div>
        <div className="content">{children}</div>
      </div>
    </div>,
    portalRoot
  );
};

export default Modal;
