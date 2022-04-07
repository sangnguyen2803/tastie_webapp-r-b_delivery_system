import { useState, useEffect, Fragment } from "react";

import "../DialogBox/DialogBox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/fontawesome-free-solid";

const DialogBoxHandlers = (visibility, ...rest) => {
  const dialogStyling = {
    width: rest.width || "400px",
    height: rest.height || "200px",
  };
  visibility && (
    <Fragment>
      <div className="darken-transparent-background" onClick={rest.close}>
        <div
          className="dialog-wrapper"
          onClick={(e) => e.stopPropagation()}
          style={dialogStyling}
        >
          <div className="header-row">
            <div className="header-title">{rest.headText || "Error"}</div>
            <FontAwesomeIcon
              className="header-close-icon"
              icon={faTimes}
              onClick={rest.close}
            />
          </div>
          {rest.children}
        </div>
      </div>
    </Fragment>
  );
};
export default DialogBoxHandlers;
