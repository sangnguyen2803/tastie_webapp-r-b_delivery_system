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
  ...rest
}) => {
  const metricStyle = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "flexStart",
    alignItems: "center",
    width: width || "20%",
    height: height || "120px",
    backgroundColor: "rgb(248, 248, 248)",
    cursor: "pointer",
    borderTop: "4px solid #940000",
    color: color || "black",
    fontSize: fontSize || "13px",
  };
  const metricContentStyle = {
    fontSize: 48,
    fontWeight: 500,
    color: "rgb(148, 0, 0)",
  };
  return (
    <Fragment>
      <div className="metric-wrapper" onClick={onClick} style={metricStyle}>
        {children}
        <span style={metricContentStyle} className="metric-content">
          {rest.numeric_data}
        </span>
      </div>
    </Fragment>
  );
};

export default Metric;
