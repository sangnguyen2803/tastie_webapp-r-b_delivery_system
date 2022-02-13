import { useState, useEffect, Fragment } from "react";

import ReactDOM from "react-dom";
import "./DialogBox.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/fontawesome-free-solid";

import { removeDialogBox } from "store/actions/UIComponentAction/DialogBoxAction";
import { propTypes } from "react-map-gl-geocoder";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import Button from "components/Commons/Button/Button";

const DialogBox = ({
  visibility,
  headerText,
  bodyText,
  cancelOptionText,
  confirmOptionText,
  confirmOptionHandler,
  close,
  width,
  height,
}) => {
  const dialogStyling = {
    width: width || "400px",
    height: height || "200px",
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
              <div className="header-title">{headerText || "Error"}</div>
              <FontAwesomeIcon
                className="header-close-icon"
                icon={faTimes}
                onClick={close}
              />
            </div>
            <div className="content">{bodyText || "Error"}</div>
            <ButtonGroup float="flex-end" gap={5} mgRight={5}>
              <Button
                color={"black"}
                bgColor={"#ECECEC"}
                justifyContent={"center"}
                gap={"10px"}
                width={80}
                height={30}
                label={cancelOptionText || "Cancel"}
                onClick={() => {
                  close();
                }}
              />
              <Button
                color={"white"}
                bgColor={"#800000"}
                justifyContent={"center"}
                gap={"10px"}
                width={80}
                height={30}
                label={confirmOptionText || "OK"}
                onClick={confirmOptionHandler}
              />
            </ButtonGroup>
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
