import { useState, useEffect, Fragment } from "react";

import ReactDOM from "react-dom";
import "./DialogBox.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/fontawesome-free-solid";

const DialogBox = ({ visibility, close, ...rest }) => {
  const dialogStyling = {
    width: rest.width || "400px",
    height: rest.height || "200px",
  };
  return ReactDOM.createPortal(
    visibility ? (
      <Fragment>
        <div className="darken-transparent-background" onClick={close}>
          <div
            className="dialog-wrapper"
            onClick={(e) => e.stopPropagation()}
            style={dialogStyling}
          >
            <div className="header-row">
              <div className="header-title">{rest.headerText || "Error"}</div>
              <FontAwesomeIcon
                className="header-close-icon"
                icon={faTimes}
                onClick={close}
              />
            </div>
            {rest.children}
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment></Fragment>
    ),
    document.getElementById("portal-root")
  );
};
export default DialogBox;
