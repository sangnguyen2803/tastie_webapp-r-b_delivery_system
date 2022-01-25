import { useState, useEffect, Fragment } from "react";

import ReactDOM from "react-dom";
import "./DialogBox.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/fontawesome-free-solid";

import { removeDialogBox } from "store/actions/UIComponentAction/DialogBoxAction";
import { propTypes } from "react-map-gl-geocoder";

const DialogBox = ({ width, height, close, dialog, removeDialogBox }) => {
  const dialogStyling = {
    width: width || "400px",
    height: height || "200px",
  };
  return ReactDOM.createPortal(
    dialog.loadDialogBox ? (
      <Fragment>
        <div
          className="darken-transparent-background"
          onClick={() => {
            removeDialogBox();
          }}
        >
          <div
            className="dialog-wrapper"
            onClick={(e) => e.stopPropagation()}
            style={dialogStyling}
          >
            <div className="header-row">
              <div className="header-title">{dialog.messageDialogHeader}</div>
              <FontAwesomeIcon
                className="header-close-icon"
                icon={faTimes}
                onClick={() => {
                  removeDialogBox();
                }}
              />
            </div>
            <div className="content">{dialog.messageDialogContent}</div>
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment></Fragment>
    ),
    document.getElementById("portal-root")
  );
};
DialogBox.propTypes = {
  dialog: PropTypes.object.isRequired,
  removeDialogBox: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  dialog: state.UIAlertReducers,
});
export default connect(mapStateToProps, { removeDialogBox })(DialogBox);
