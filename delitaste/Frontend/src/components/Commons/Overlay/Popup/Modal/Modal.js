import ReactDOM from "react-dom";
import { useState, useEffect, useRef, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faCartPlus,
  faTimes,
} from "@fortawesome/fontawesome-free-solid";
import "./Modal.scss";

const portalRoot = document.getElementById("portal-root");

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

const Modal = ({ openModal, closeModal, ...rest }) => {
  const ref = useRef(null);
  const disableNextClick = () => {
    const listener = (evt) => {
      evt.stopPropagation();
      document.removeEventListener("click", listener, true);
    };
    document.addEventListener("click", listener, true);
  };
  useOnClickOutside(ref, () => {
    closeModal();
  });

  const ModalContainerStyle = {
    width: rest.widthPX ? `unset` : `${rest.width}%`,
    widthPX: `${rest.width}px`,
    height: rest.heightAuto ? "auto" : `${rest.height}px`,
    marginLeft: rest.widthPX ? `-${rest.widthPX / 2}px` : `-${rest.width / 2}%`,
    marginTop: `-${rest.height / 2 - 20}px`,
  };
  const ModalInnerStyle = {
    padding: rest.padding || "2% 2%",
  };
  const ModalOutterBackgroundStyle = {
    marginTop: rest.transparentUnderNavbar ? 90 : 0,
    background: `rgba(0, 0, 0, ${rest.transparent || 0.8})`,
    top: rest.distanceFromTop,
  };
  const HeaderStyle = {
    backgroundColor: rest.headerColor ? rest.headerColor : "",
  };
  const CartContainerStyle = {
    opacity: rest.opacity || "1",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 6px",
    width: `${rest.cartWidth}px`,
    height: rest.cartHeightAuto ? "auto" : `${rest.cartHeight}px`,
    top: `${rest.cartPositionTop}px`,
    left: "unset",
    right: `${
      rest.cartPositionRight +
      window.innerWidth -
      document.documentElement.clientWidth
    }px`,
    overflowY: "scroll",
  };
  if (!openModal) return null;
  return !rest.useCartUI ? (
    <div
      className="modal-darken-transparent-background"
      style={ModalOutterBackgroundStyle}
    >
      <div className="modal-container" style={ModalContainerStyle} ref={ref}>
        <div className="modal-header-row" style={HeaderStyle}>
          <div className="modal-header-title">{rest.title}</div>
          <FontAwesomeIcon
            className="modal-header-close-icon"
            onClick={closeModal}
            icon={faTimes}
          />
        </div>
        <div className="modal-content" style={ModalInnerStyle}>
          {rest.children}
        </div>
      </div>
    </div>
  ) : (
    <Fragment>
      <div
        className="modal-cart modal-darken-transparent-background"
        style={ModalOutterBackgroundStyle}
      >
        <div className="modal-container" style={CartContainerStyle} ref={ref}>
          {!rest.hideCloseButton && (
            <Fragment>
              <div className="modal-cart-header-wrapper">
                <FontAwesomeIcon
                  className="modal-cart-header-icon"
                  onClick={closeModal}
                  icon={faTimes}
                />
                {rest.showCartTitle && (
                  <div className="modal-cart-header-title">
                    <span>Cart items • {rest.cartQuantity || 0} item</span>
                  </div>
                )}
              </div>
            </Fragment>
          )}
          <div className="modal-content" style={ModalInnerStyle}>
            {rest.children}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
