import "./ServiceInfoForm.scss";
import "style/Common.scss";
import PropTypes from "prop-types";
import { Formik, ErrorMessage, Form, Field } from "formik";
import Stepper from "components/Commons/Stepper/Stepper";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FormError from "components/Commons/ErrorHandlers/FormError/FormError";

function ServiceInfoForm(props) {
  const initialValues = {
    merchant: "",
    lastname: "",
    email: "",
    phone: "",
    password1: "",
    password2: "",
  };
  const convertAddressToMapLocation = () => {};
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleSubmitForm(values)}
    >
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        return (
          <>
            <div className="form-banner-wrapper">
              <span className="merchant-registration-header-title">
                1. Service Provider - Basic Info
              </span>
            </div>
            <span className="contract-header-text">
              Please provide your service information:
            </span>

            <span className="contract-header-sub-text">
              Your restaurant's information will be displayed on our website,
              please making sure the information filled in this form is
              trustworthy and correct.
            </span>
            <h2></h2>
            <div className="service-form-wrapper">
              <div className="service-form-field-wrapper">
                <div className="service-form-label-wrapper">Merchant name</div>
                <div className="service-form-input-wrapper">
                  <Field
                    className="sign-up-firstname form-text-field"
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    maxLength={50}
                    autoComplete="on"
                  />
                  <Field
                    className="sign-up-firstname form-text-field"
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    maxLength={50}
                    autoComplete="on"
                  />
                  <Field
                    className="sign-up-firstname form-text-field"
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    maxLength={50}
                    autoComplete="on"
                  />
                </div>
              </div>

              <div className="service-form-field-wrapper">
                <div className="service-form-label-wrapper">Phone number</div>
                <div className="service-form-input-wrapper">
                  <Field
                    className="sign-up-firstname form-text-field"
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    maxLength={50}
                    autoComplete="on"
                  />
                </div>
              </div>

              <div className="service-form-field-wrapper">
                <div className="service-form-label-wrapper">City</div>
                <div className="service-form-input-wrapper">
                  <Field
                    className="sign-up-firstname form-text-field"
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    maxLength={50}
                    autoComplete="on"
                  />
                </div>
              </div>

              <div className="service-form-field-wrapper">
                <div className="service-form-label-wrapper">District</div>
                <div className="service-form-input-wrapper">
                  <Field
                    className="sign-up-firstname form-text-field"
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    maxLength={50}
                    autoComplete="on"
                  />
                </div>
              </div>
              <div className="service-form-field-wrapper">
                <div className="service-form-label-wrapper">Ward</div>
                <div className="service-form-input-wrapper">
                  <Field
                    className="sign-up-firstname form-text-field"
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    maxLength={50}
                    autoComplete="on"
                  />
                </div>
              </div>
              <div className="service-form-field-wrapper">
                <div className="service-form-label-wrapper">House number</div>
                <div className="service-form-input-wrapper">
                  <Field
                    className="sign-up-firstname form-text-field"
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    maxLength={50}
                    autoComplete="on"
                  />
                </div>
              </div>

              <div className="service-form-button-wrapper">
                <div onClick={convertAddressToMapLocation}>
                  <button className="btn-check-on-map">Check on map</button>
                </div>
              </div>
              <div className="service-form-button-wrapper">
                <iframe
                  src={`https://www.google.com/maps/search/?api=1&query=543%2F65%20Nguy%E1%BB%85n%20%C4%90%C3%ACnh%20Chi%E1%BB%83u%2C%20ph%C6%B0%E1%BB%9Dng%202%2C%20qu%E1%BA%ADn%203%2C%20th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh`}
                  width="100%"
                  height="450"
                  place="Ha Noi"
                  frameBorder="0"
                  style={{ border: "0" }}
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                />
              </div>
            </div>
          </>
        );
      }}
    </Formik>
  );
}

export default ServiceInfoForm;
