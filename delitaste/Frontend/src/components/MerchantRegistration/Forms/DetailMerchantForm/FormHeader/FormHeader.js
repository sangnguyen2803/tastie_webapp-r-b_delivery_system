import { faChevronDown, faDesktop } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
function FormHeader(props) {
  const scrollToFormSubmit = () => {
    window.scrollTo({
      top: 400,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <Fragment>
      <div className="form-banner-wrapper">
        <div className="form-number-wrapper" onClick={scrollToFormSubmit}>
          <FontAwesomeIcon className="form-number" icon={faChevronDown} />
          <span className="show-more-text">Scroll to Submit</span>
        </div>

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
