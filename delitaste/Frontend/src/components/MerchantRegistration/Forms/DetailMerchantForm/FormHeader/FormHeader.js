import { Fragment } from "react";
function FormHeader(props) {
  return (
    <Fragment>
      <div className="form-banner-wrapper">
        <span className="merchant-registration-header-title">{props.name}</span>
      </div>
      <div className="header-content">
        <span className="form-header-text">
          Please provide your service information:
        </span>
        <span className="form-header-sub-text">
          Your restaurant's information will be displayed on our website, please
          making sure the information filled in this form is trustworthy and
          correct.
        </span>
      </div>
    </Fragment>
  );
}

export default FormHeader;
