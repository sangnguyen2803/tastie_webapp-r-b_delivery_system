import React, { useState, useEffect, useRef } from "react";
import Fragment from "react";
import "./DetailSignUpForm.css";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faChevronRight } from "@fortawesome/fontawesome-free-solid";
import { connect } from "react-redux";
import {
  setRegisterStep,
  setRegisterFormData,
} from "actions/UserAdmission/registerActions";
import { loadRegisterForm } from "actions/UserAdmission/formActions";
import PropTypes from "prop-types";

function DetailSignUpForm1({
  setRegisterStep,
  setRegisterFormData,
  loadRegisterForm,
}) {
  const [userFormData, setUserFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password1: "",
    password2: "",
  });
  const doSubmit = () => {
    let user_captcha_value =
      document.getElementById("user_captcha_input").value;
    if (validateCaptcha(user_captcha_value) == true) {
      alert("Captcha Matched");
      loadCaptchaEnginge(6);
      document.getElementById("user_captcha_input").value = "";
    } else {
      alert("Captcha Does Not Match");
      document.getElementById("user_captcha_input").value = "";
    }
  };
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  const { firstname, lastname, email, phone, password1, password2 } =
    userFormData;
  const onChangeRegistrationForm = (e) =>
    setUserFormData({
      ...userFormData,
      [e.target.name]: e.target.value,
    });
  const onSubmitRegistrationForm = async (e) => {
    e.preventDefault();
    setRegisterStep(["finished", "active", "default", "default"]);
    const password = password1;
    const formData = {
      firstname,
      lastname,
      email,
      phone,
      password,
    };
    setRegisterFormData(formData);
    const msg = "Check your email to get code.";
    loadRegisterForm("email_verification", msg);
    //validate registration form
  };

  //jsx
  return (
    <div className="sign-up-form-input-wrapper">
      <div className="form-title-wrapper">
        <FontAwesomeIcon className="form-icon" icon={faUser} />
        <span className="form-title">Account Registration</span>
      </div>
      <div className="sign-up-fullname-wrapper">
        <div className="label-sign-up form-label">Full Name</div>
        <div className="fullname-wrapper">
          <input
            className="sign-up-firstname form-text-field"
            type="text"
            name="firstname"
            value={firstname}
            onChange={(e) => onChangeRegistrationForm(e)}
            placeholder="First name"
            maxLength={50}
            autoComplete="on"
            required
          />
          <input
            className="sign-up-lastname form-text-field"
            type="text"
            name="lastname"
            value={lastname}
            onChange={(e) => onChangeRegistrationForm(e)}
            placeholder="Last Name"
            maxLength={50}
            autoComplete="on"
            required
          />
        </div>
      </div>
      <div className="sign-up-email-wrapper">
        <div className="label-sign-up form-label">Email</div>
        <input
          className="sign-up-email form-text-field"
          type="text"
          name="email"
          value={email}
          onChange={(e) => onChangeRegistrationForm(e)}
          placeholder="Email"
          maxLength={50}
          autoComplete="on"
          required
        />
      </div>

      <div className="sign-up-phonenumber-wrapper">
        <div className="label-sign-up form-label">Phone number</div>
        <input
          className="sign-up-phonenumber form-text-field"
          type="tel"
          name="phone"
          value={phone}
          onChange={(e) => onChangeRegistrationForm(e)}
          placeholder="Mobile number"
          maxLength={15}
          autoComplete="on"
          required
        />
      </div>

      <div className="password-wrapper">
        <div className="label-sign-up form-label">Password</div>
        <input
          className="sign-up-password form-text-field"
          type="password"
          name="password1"
          value={password1}
          onChange={(e) => onChangeRegistrationForm(e)}
          placeholder="Password"
          maxLength={50}
          autoComplete="on"
          required
        />
      </div>

      <div className="password-recheck-wrapper">
        <div className="label-sign-up form-label">Re-enter Password</div>
        <input
          className="sign-up-password-recheck form-text-field"
          type="password"
          name="password2"
          value={password2}
          onChange={(e) => onChangeRegistrationForm(e)}
          placeholder="Re-enter password"
          maxLength={50}
          autoComplete="on"
          required
        />
      </div>

      <div className="captcha-wrapper">
        <LoadCanvasTemplateNoReload />
        <input
          placeholder="Enter Captcha"
          className="captcha-field"
          name="user_captcha_input"
          type="text"
          autoComplete="off"
        ></input>
      </div>
      <br />
      <br />
      <div className="policy-check">
        Delitaste may use your phone number to call or send text messages with
        information regarding your account.
      </div>
      <div className="policy-check">
        By clicking Sign Up, you are indicating that you have read and
        acknowledge the <a className="policy-link">Terms of Service</a> and{" "}
        <a className="policy-link">Privacy Notice</a>.
      </div>
      <br />

      <button
        className="btn-login-form btn-sign-up-position"
        onClick={(e) => onSubmitRegistrationForm(e)}
      >
        <div className="none-icon"></div>
        Sign Up
        <FontAwesomeIcon className="chevron-icon" icon={faChevronRight} />
      </button>
    </div>
  );
}

DetailSignUpForm1.propTypes = {
  setRegisterStep: PropTypes.func.isRequired,
  setRegisterFormData: PropTypes.func.isRequired,
  loadRegisterForm: PropTypes.func.isRequired,
};

export default connect(null, {
  setRegisterStep,
  setRegisterFormData,
  loadRegisterForm,
})(DetailSignUpForm1);
