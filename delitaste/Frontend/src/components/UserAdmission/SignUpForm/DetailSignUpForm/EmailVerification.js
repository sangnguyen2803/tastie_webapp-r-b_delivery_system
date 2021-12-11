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
  updateStepStyling,
  mapRegistrationForm,
  accountRegistrationAPI,
  sendEmailVerificationCodeAPI,
  checkEmailVerificationCodeAPI,
} from "store/actions/UserAdmission/UserActions";
import { setDialogBox } from "store/actions/UIComponents/DialogBoxAction";

function EmailVerification(props) {
  useEffect(() => {
    async function sendVerifiedEmailCode() {
      return await props.sendEmailVerificationCodeAPI(
        props.submittedFormData.formData.email
      );
    }
    sendVerifiedEmailCode();
  }, []);
  const [enableVerifyButton, setEnableVerifyButton] = useState(false);
  const [email, setEmail] = useState(props.submittedFormData.email);
  const [verifiedCode, setVerifiedcode] = useState({ digits: "xxxxxx" });
  enableVerifyButton;
  const [changeEmailDialog, setChangeEmailDialog] = useState(false);

  const collectVerifyDigits = (e) => {
    e.target.value = !isNaN(e.target.value) ? e.target.value : "";
    verifiedCode.digits =
      verifiedCode.digits.substr(0, parseInt(e.target.name)) +
      e.target.value +
      verifiedCode.digits.substr(parseInt(e.target.name) + 1);
  };

  const onSubmitEmailVerification = async (e) => {
    e.preventDefault();
    const email = props.submittedFormData.formData.email;
    const verifyEmailToken =
      props.submittedFormData.verifiedEmailToken ||
      localStorage.getItem("verified_email_token") ||
      "";
    const code = verifiedCode.digits;
    const formData = {
      email,
      verifyEmailToken,
      code,
    };
    const result = await props.checkEmailVerificationCodeAPI(formData);
    console.log(result);
    if (result) {
      await props.accountRegistrationAPI(props.submittedFormData.formData);
    }
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
        <strong>{props.submittedFormData.email}</strong>{" "}
        <FontAwesomeIcon
          className="change-email-icon"
          icon={faPencilAlt}
          onClick={() => setChangeEmailDialog((prev) => !prev)}
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
              value={props.submittedFormData.email}
              placeholder="Email"
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

      <div className="btn-form-wrapper">
        <button
          className="btn-form btn-verification-position"
          onClick={(e) => onSubmitEmailVerification(e)}
        >
          <div className="none-icon"></div>
          Verify Email
          <FontAwesomeIcon className="chevron-icon" icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}
EmailVerification.propTypes = {
  updateStepStyling: PropTypes.func.isRequired,
  mapRegistrationForm: PropTypes.func.isRequired,
  accountRegistrationAPI: PropTypes.func.isRequired,
  sendEmailVerificationCodeAPI: PropTypes.func.isRequired,
  submittedFormData: PropTypes.object.isRequired,
  setDialogBox: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  submittedFormData: state.UserReducers,
});
export default connect(mapStateToProps, {
  mapRegistrationForm,
  updateStepStyling,
  accountRegistrationAPI,
  sendEmailVerificationCodeAPI,
  checkEmailVerificationCodeAPI,
  setDialogBox,
})(EmailVerification);
