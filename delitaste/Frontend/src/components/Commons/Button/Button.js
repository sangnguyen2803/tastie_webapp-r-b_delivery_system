import { useState, useEffect, Fragment } from "react";

const Button = ({
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
}) => {
  const buttonStyling = {
    marginLeft: `${left}px` || "10px",
    marginRight: `${right}px` || "10px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: width || "80px",
    height: height || "30px",
    borderRadius: radius || "2px",
    backgroundColor:
      bgColor ||
      (type === "primary" ? "#940000" : bglight ? "#F5F5F5" : "#666666"),
    cursor: "pointer",
    border: border || "none",
  };
  const buttonTextStyling = {
    color: color || "white",
    fontSize: fontSize || "13px",
  };
  return (
    <Fragment>
      <div
        className="cs-button-wrapper"
        onClick={onClick}
        style={buttonStyling}
      >
        {prefix || <></>}
        <span className="cs-button-label" style={buttonTextStyling}>
          {label || "Button"}
        </span>
        {surfix || <></>}
      </div>
    </Fragment>
  );
};

export default Button;
