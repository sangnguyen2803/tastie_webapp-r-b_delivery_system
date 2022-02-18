import { useState, useEffect, Fragment } from "react";
import "style/Common.scss";
const Button = ({
  disabled,
  buttonType,
  type,
  onClick,
  width,
  height,
  radius,
  color,
  bgColor,
  fontSize,
  prefix,
  surfix,
  label,
  left,
  right,
  bglight,
  border,
  justifyContent,
  gap,
}) => {
  const buttonStyling = {
    marginLeft: `${left}px` || "10px",
    marginRight: `${right}px` || "10px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: justifyContent || "space-evenly",
    alignItems: "center",
    width: width || "80px",
    height: height || "30px",
    borderRadius: radius || "0px",
    backgroundColor:
      bgColor ||
      (buttonType === "primary" ? "#940000" : bglight ? "#F5F5F5" : "#666666"),
    cursor: "pointer",
    border: border || "none",
    gap: gap || "5px",
  };
  const buttonStylingDisabled = {
    marginLeft: `${left}px` || "10px",
    marginRight: `${right}px` || "10px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: justifyContent || "space-evenly",
    alignItems: "center",
    width: width || "80px",
    height: height || "30px",
    borderRadius: radius || "2px",
    backgroundColor: "white",
    cursor: "not-allowed",
    border: border || "none",
    gap: gap || "5px",
  };
  const buttonTextStyling = {
    color: color || "white",
    fontSize: fontSize || "13px",
  };

  const buttonTextStylingDisabled = {
    color: "#B6B6B6",
    fontSize: fontSize || "13px",
  };
  return (
    <Fragment>
      {disabled ? (
        <div
          className="cs-button-wrapper"
          style={buttonStylingDisabled}
          type={type || ""}
        >
          <span className="cs-button-label" style={buttonTextStylingDisabled}>
            {label || "Button"}
          </span>
          {surfix || <></>}
        </div>
      ) : (
        <div
          className="cs-button-wrapper"
          onClick={onClick}
          style={buttonStyling}
          type={type || ""}
        >
          {prefix || <></>}
          <span className="cs-button-label" style={buttonTextStyling}>
            {label || "Button"}
          </span>
          {surfix || <></>}
        </div>
      )}
    </Fragment>
  );
};

export default Button;
