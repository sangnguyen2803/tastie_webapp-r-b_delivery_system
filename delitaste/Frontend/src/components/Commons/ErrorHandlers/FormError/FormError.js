import { Fragment } from "react";
import styled from "styled-components";
import "./FormError.scss";
const ErrorAlert = styled.div`
  color: red;
  font-size: 14px;
  text-align: left;
`;

function FormError(props) {
  const ErrorAlertStyling = {
    textAlign: props.align || "center",
    margin: props.margin || "0%",
    fontSize: `${props.fontSize}px` || "14px",
    fontWeight: `${props.fontWeight}` || "normal",
  };

  const NonErrorAlertStyling = {
    marginTop: `${props.spaceBetween}%` || "4%",
  };
  return (
    <Fragment>
      {props.err ? (
        <div className="form-error-wrapper" style={ErrorAlertStyling}>
          <div className="form-error-content">{props.err}</div>
        </div>
      ) : (
        <div className="form-error-wrapper" style={NonErrorAlertStyling}>
          <div className="form-error-content"></div>
        </div>
      )}
    </Fragment>
  );
}

export default FormError;
