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
import {
  faUser,
  faChevronRight,
  faCheckCircle,
  faCheckSquare,
  faExclamationCircle,
  faExclamation,
} from "@fortawesome/fontawesome-free-solid";
import { connect } from "react-redux";
import {
  setRegisterStep,
  setRegisterFormData,
} from "store/actions/UserAdmission/registerActions";
import { loadRegisterForm } from "store/actions/UserAdmission/formActions";
import PropTypes from "prop-types";
import { validateSignUpForm1 } from "utils/FormUtils/form-validate";
import { Formik, ErrorMessage, Form, Field } from "formik";
import * as yup from "yup";

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
  };

  const initalValues = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password1: "",
    password2: "",
  };

  const validationSchema = yup.object({
    firstname: yup.string().required("This field is required"),
    lastname: yup.string().required("This field is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("This field is required"),
    phone: yup.string().required("This field is required"),
    password1: yup.string().required("This field is required"),
    password2: yup.string().required("This field is required"),
  });

  const renderError = (message) => <p className="text-danger">{message}</p>;

  // const handleSubmitForm1 = async (event) => {
  //   event.preventDefault();
  //   let isValid = await validateSignUpForm1.isValid(userFormData);
  //   console.log(isValid);
  // };

  const handleSubmitForm1 = (values) => {
    console.log("Values", values);
    setRegisterStep(["finished", "active", "default", "default"]);
    const password = password1;
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
      initialValues={initalValues}
      validationSchema={validateSignUpForm1}
      onSubmit={(values) => handleSubmitForm1(values)}
    >
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        // console.log({ values, errors, touched });

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
                  // value={firstname}
                  // onChange={(e) => onChangeRegistrationForm(e)}
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

            <div className="captcha-wrapper">
              <LoadCanvasTemplateNoReload />
              <input
                placeholder="Enter Captcha"
                className="captcha-field"
                name="user_captcha_input"
                type="text"
                autoComplete="off"
              />
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
