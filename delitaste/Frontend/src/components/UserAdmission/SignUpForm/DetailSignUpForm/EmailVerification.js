import React, { useState, useEffect } from "react";
//scss
import "./EmailVerification.scss";
import "style/Common.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCheck,
  faEnvelope,
  faChevronRight,
  faPencilAlt,
} from "@fortawesome/fontawesome-free-solid";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  setRegisterStep,
  setRegisterFormData,
} from "store/actions/UserAdmission/registerActions";
import { loadRegisterForm } from "store/actions/UserAdmission/formActions";
function EmailVerification({
  submitedFormData,
  setRegisterStep,
  loadRegisterForm,
}) {
  const [verifyCode, setVerifycode] = useState({ digits: "xxxxxx" });
  const [changeEmailDialog, setChangeEmailDialog] = useState(false);
  const collectVerifyDigits = (e) => {
    e.target.value = !isNaN(e.target.value) ? e.target.value : "";
    verifyCode.digits =
      verifyCode.digits.substr(0, parseInt(e.target.name)) +
      e.target.value +
      verifyCode.digits.substr(parseInt(e.target.name) + 1);
  };
  const onSubmitEmailVerification = async (e) => {
    e.preventDefault();
    setRegisterStep(["finished", "finished", "active", "default"]);
    //call api

    loadRegisterForm("profile_completion");
    //validate registration form
  };
  const displayChangeEmailDialog = () => {
    setChangeEmailDialog((prev) => !prev);
  };
  return (
    <div className="verify-email-section">
      <div className="form-title-wrapper">
        <FontAwesomeIcon className="form-icon" icon={faUserCheck} />
        <span className="form-title">Email Verification</span>
      </div>
      <span className="verify-code-description">
        A verification code was sent to your gmail.
      </span>
      <span className="verify-code-description">
        {" "}
        Please enter the 6-digit code already sent to your email{" "}
        <strong>{submitedFormData.email}</strong>{" "}
        <FontAwesomeIcon
          className="change-email-icon"
          icon={faPencilAlt}
          onClick={displayChangeEmailDialog}
        />
      </span>
      {changeEmailDialog ? (
        <>
          <div className="sign-up-email-wrapper">
            <div className="label-sign-up form-label" style={{ width: "15%" }}>
              Email
            </div>
            <input
              style={{ width: "60%", height: "30px" }}
              className="sign-up-email form-text-field"
              type="text"
              name="email"
              value={submitedFormData.email}
              placeholder="Email"
              maxLength={50}
              autoComplete="on"
              required
            />
            <button style={{ width: "25%" }} className="sub-square-button">
              Update
            </button>
          </div>
        </>
      ) : (
        <span></span>
      )}
      <div className="verify-code-wrapper">
        <div className="verify-code-digit-wrapper">
          <input
            name="0"
            type="text"
            className="numeric verify-digit-box"
            maxLength={1}
            onChange={(e) => collectVerifyDigits(e)}
            autoComplete="off"
          />
        </div>
        <div className="verify-code-digit-wrapper">
          <input
            name="1"
            type="text"
            className="numeric verify-digit-box"
            maxLength={1}
            onChange={(e) => collectVerifyDigits(e)}
            autoComplete="off"
          />
        </div>
        <div className="verify-code-digit-wrapper">
          <input
            name="2"
            type="text"
            className="numeric verify-digit-box"
            maxLength={1}
            onChange={(e) => collectVerifyDigits(e)}
            autoComplete="off"
          />
        </div>
        <div className="verify-code-digit-wrapper">
          <input
            name="3"
            type="text"
            className="numeric verify-digit-box"
            maxLength={1}
            onChange={(e) => collectVerifyDigits(e)}
            autoComplete="off"
          />
        </div>
        <div className="verify-code-digit-wrapper">
          <input
            name="4"
            type="text"
            className="numeric verify-digit-box"
            maxLength={1}
            onChange={(e) => collectVerifyDigits(e)}
            autoComplete="off"
          />
        </div>
        <div className="verify-code-digit-wrapper">
          <input
            name="5"
            type="text"
            className="numeric verify-digit-box"
            maxLength={1}
            onChange={(e) => collectVerifyDigits(e)}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="resend-section">
        <FontAwesomeIcon className="resend-code-icon" icon={faEnvelope} />
        <div className="resend-verify-code">
          <a>Resend verify code</a>
        </div>
      </div>
      <button
        className="btn-form btn-sign-up-position"
        onClick={(e) => onSubmitEmailVerification(e)}
      >
        <div className="none-icon"></div>
        Verify
        <FontAwesomeIcon className="chevron-icon" icon={faChevronRight} />
      </button>
    </div>
  );
}
EmailVerification.propTypes = {
  setRegisterStep: PropTypes.func.isRequired,
  loadRegisterForm: PropTypes.func.isRequired,
  submitedFormData: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  submitedFormData: state.registerReducer,
});
export default connect(mapStateToProps, {
  loadRegisterForm,
  setRegisterStep,
})(EmailVerification);
