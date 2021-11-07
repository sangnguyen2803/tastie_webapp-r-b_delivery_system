import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as yup from "yup";
import { Formik, ErrorMessage, Form, Field } from "formik";
//utils
import { validateSignUpForm1 } from "utils/FormUtils/form-validate";
//assets
import "./DetailSignUpForm.css";
import {
  faUser,
  faChevronRight,
  faExclamationCircle,
} from "@fortawesome/fontawesome-free-solid";
//store
import {
  setRegisterStep,
  setRegisterFormData,
} from "store/actions/UserAdmission/registerActions";
import { loadRegisterForm } from "store/actions/UserAdmission/formActions";

//components

function DetailSignUpForm1({
  setRegisterStep,
  setRegisterFormData,
  loadRegisterForm,
}) {
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password1: "",
    password2: "",
  };

  const handleSubmitForm = (values) => {
    console.log(values);
    setRegisterStep(["finished", "active", "default", "default"]);
    const formData = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      phone: values.phone,
      password: values.password1,
    };
    setRegisterFormData(formData);
    const msg = "Check your email to get code.";
    loadRegisterForm("email_verification", msg);
  };

  //jsx
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateSignUpForm1}
      onSubmit={(values) => handleSubmitForm(values)}
    >
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        return (
          <Form className="sign-up-form-input-wrapper">
            <div className="form-title-wrapper">
              <FontAwesomeIcon className="form-icon" icon={faUser} />
              <span className="form-title">Account Registration</span>
            </div>
            <div className="sign-up-fullname-wrapper">
              <div className="label-sign-up form-label">Full name</div>
              <div className="fullname-wrapper">
                <Field
                  className={
                    errors.firstname && touched.firstname
                      ? "sign-up-firstname form-text-field error"
                      : "sign-up-firstname form-text-field"
                  }
                  type="text"
                  name="firstname"
                  placeholder={
                    errors.firstname && touched.firstname
                      ? errors.firstname
                      : "First Name"
                  }
                  maxLength={50}
                  autoComplete="on"
                />
                {errors.firstname && touched.firstname && (
                  <FontAwesomeIcon
                    className="alert-icon check-icon-position-type0"
                    icon={faExclamationCircle}
                  />
                )}
                <Field
                  className={
                    errors.lastname && touched.lastname
                      ? "sign-up-lastname form-text-field error"
                      : "sign-up-lastname form-text-field"
                  }
                  type="text"
                  name="lastname"
                  // value={lastname}
                  // onChange={(e) => onChangeRegistrationForm(e)}
                  placeholder={
                    errors.lastname && touched.lastname
                      ? errors.lastname
                      : "Last Name"
                  }
                  maxLength={50}
                  autoComplete="on"
                />

                {errors.lastname && touched.lastname && (
                  <FontAwesomeIcon
                    className="alert-icon check-icon-position-type1"
                    icon={faExclamationCircle}
                  />
                )}
              </div>
            </div>
            <div className="sign-up-email-wrapper">
              <div className="label-sign-up form-label">Email</div>
              <Field
                className={
                  errors.email && touched.email
                    ? "sign-up-email form-text-field error"
                    : "sign-up-email form-text-field"
                }
                type="text"
                name="email"
                // value={email}
                // onChange={(e) => onChangeRegistrationForm(e)}
                placeholder={
                  errors.email && touched.email ? errors.email : "Email"
                }
                maxLength={50}
                autoComplete="on"
              />

              {errors.email && touched.email && (
                <FontAwesomeIcon
                  className="alert-icon check-icon-position-type2"
                  icon={faExclamationCircle}
                />
              )}
            </div>
            <div className="sign-up-phonenumber-wrapper">
              <div className="label-sign-up form-label">Phone number</div>
              <Field
                className={
                  errors.phone && touched.phone
                    ? "sign-up-phonenumber form-text-field error"
                    : "sign-up-phonenumber form-text-field"
                }
                type="tel"
                name="phone"
                // value={phone}
                // onChange={(e) => onChangeRegistrationForm(e)}
                placeholder={
                  errors.phone && touched.phone ? errors.phone : "Mobile number"
                }
                maxLength={15}
                autoComplete="on"
              />

              {errors.phone && touched.phone && (
                <FontAwesomeIcon
                  className="alert-icon check-icon-position-type2"
                  icon={faExclamationCircle}
                />
              )}
            </div>

            <div className="password-wrapper">
              <div className="label-sign-up form-label">Password</div>
              <Field
                className={
                  errors.password1 && touched.password1
                    ? "sign-up-password form-text-field error"
                    : "sign-up-password form-text-field"
                }
                type="password"
                name="password1"
                // value={password1}
                // onChange={(e) => onChangeRegistrationForm(e)}
                placeholder={
                  errors.password1 && touched.password1
                    ? errors.password1
                    : "Password"
                }
                maxLength={50}
                autoComplete="on"
              />

              {errors.password1 && touched.password1 && (
                <FontAwesomeIcon
                  className="alert-icon check-icon-position-type2"
                  icon={faExclamationCircle}
                />
              )}
            </div>

            <div className="password-recheck-wrapper">
              <div className="label-sign-up form-label">Re-enter Password</div>
              <Field
                className={
                  errors.password2 && touched.password2
                    ? "sign-up-password-recheck form-text-field error"
                    : "sign-up-password-recheck form-text-field"
                }
                type="password"
                name="password2"
                // value={password2}
                // onChange={(e) => onChangeRegistrationForm(e)}
                placeholder={
                  errors.password2 && touched.password2
                    ? errors.password2
                    : "Re-enter password"
                }
                maxLength={50}
                autoComplete="on"
              />

              {errors.password2 && touched.password2 && (
                <FontAwesomeIcon
                  className="form-icon check-icon-position-type2"
                  // icon={faCheckCircle}
                  // style={{ color: "green" }}
                  icon={faExclamationCircle}
                />
              )}
            </div>
            <br />
            <div className="policy-check">
              Delitaste may use your phone number to call or send text messages
              with information regarding your account.
            </div>
            <div className="policy-check">
              By clicking Sign Up, you are indicating that you have read and
              acknowledge the <a className="policy-link">Terms of Service</a>{" "}
              and <a className="policy-link">Privacy Notice</a>.
            </div>
            <br />
            <button
              className="btn-login-form btn-sign-up-position"
              type="submit"
            >
              <div className="none-icon"></div>
              Sign Up
              <FontAwesomeIcon className="chevron-icon" icon={faChevronRight} />
            </button>
          </Form>
        );
      }}
    </Formik>
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
