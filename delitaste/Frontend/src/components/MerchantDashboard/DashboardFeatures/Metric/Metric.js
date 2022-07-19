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
  border,
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
    backgroundColor: "#FCFCFC",
    cursor: "pointer",
    borderTop: "4px solid #940000",
    color: color || "black",
    fontSize: fontSize || "13px",
    border: border || "unset",
  };
  const metricContentStyle = {
    margin: "20px 0",
    fontSize: rest.numericFontSize || 50,
    fontWeight: 500,
    color: rest.textColor || "rgb(148, 0, 0)",
  };
  const descriptionStyle = {
    width: "90%",
    fontSize: 12,
  };
  return (
    <Fragment>
      <div className="metric-wrapper" onClick={onClick} style={metricStyle}>
        {children}
        {rest.numeric_data && (
          <span style={metricContentStyle} className="metric-content">
            {rest.numeric_data}
          </span>
        )}
        {rest.text && <span style={descriptionStyle}>{rest.text}</span>}
      </div>
    </Fragment>
  );
};

export default Metric;
