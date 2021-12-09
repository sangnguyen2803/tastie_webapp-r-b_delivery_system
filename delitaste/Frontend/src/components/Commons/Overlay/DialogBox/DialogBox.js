import { useState, useEffect, Fragment } from "react";
import "./DialogBox.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/fontawesome-free-solid";

const DialogBox = ({ width, height, close, dialog }) => {
  const dialogStyling = {
    width: width || "400px",
    height: height || "200px",
  };

  return dialog.loadingDialogBox ? (
    <Fragment>
      <div className="darken-transparent-background">
        <div className="dialog-wrapper" style={dialogStyling}>
          <div className="header-row">
            <div className="header-title">{dialog.dialogBoxTitle}</div>
            <FontAwesomeIcon
              className="header-close-icon"
              icon={faTimes}
              onClick={close}
            />
          </div>
          <div className="content">{dialog.dialogBoxMessage}</div>
        </div>
      </div>
    </Fragment>
  ) : (
    <Fragment></Fragment>
  );
};
DialogBox.propTypes = {
  dialog: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  dialog: state.UIAlertReducers,
});
export default connect(mapStateToProps)(DialogBox);
