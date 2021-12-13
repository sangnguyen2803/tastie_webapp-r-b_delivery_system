import { useState, useEffect, Fragment } from "react";

const Metric = ({
  type,
  onClick,
  width,
  height,
  radius,
  color,
  bgColor,
  fontSize,
  children,
  left,
  right,
}) => {
  const metricStyling = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "flexStart",
    alignItems: "center",
    width: width || "20%",
    height: height || "104px",
    borderRadius: radius || "2px",
    backgroundColor: "#f3f3f3",
    cursor: "pointer",
    borderTop: "4px solid #940000",
    color: color || "black",
    fontSize: fontSize || "13px",
  };
  return (
    <Fragment>
      <div className="metric-wrapper" onClick={onClick} style={metricStyling}>
        {children}
      </div>
    </Fragment>
  );
};

export default Metric;
