import { useState, useEffect, Fragment } from "react";

const ButtonGroup = ({
  width,
  direction,
  wrap,
  gap,
  float,
  children,
  mgTop,
  mgBottom,
  mgLeft,
  mgRight,
}) => {
  const buttonGroupStyling = {
    width: `${width}%` || "100%",
    display: "flex",
    flexDirection: direction || "row",
    flexWrap: wrap || "nowrap",
    marginTop: `${mgTop}px` || "5px",
    marginBottom: `${mgBottom}px` || "5px",
    marginRight: `${mgRight}px` || "",
    marginLeft: `${mgLeft}px` || "",
    justifyContent: float || "flex-start",
    height: "auto",
    gap: `${gap}px` || "5px",
    alignItems: "center",
  };
  return (
    <Fragment>
      <div className="cs-button-group-wrapper" style={buttonGroupStyling}>
        {children}
      </div>
    </Fragment>
  );
};

export default ButtonGroup;
