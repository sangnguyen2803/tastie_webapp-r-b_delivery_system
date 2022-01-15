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

        <span className="merchant-registration-header-title">
          {props.title}
        </span>
      </div>
      <div className="header-content">
        <span className="form-header-text">{props.headerText}</span>
        <span className="form-header-sub-text">{props.bodyText}</span>
      </div>
    </Fragment>
  );
}

export default FormHeader;
