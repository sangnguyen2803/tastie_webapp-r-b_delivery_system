import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import RegisterStep from "./RegisterStep";
import DetailSignUpForm1 from "./DetailSignUpForm/DetailSignUpForm1";
import DetailSignUpForm2 from "./DetailSignUpForm/DetailSignUpForm2";
import EmailVerification from "./DetailSignUpForm/EmailVerification";

function SignUpForm(props) {
  const RegistrationForm = [
    <DetailSignUpForm1 />,
    <EmailVerification />,
    <DetailSignUpForm2 />,
  ];
  return (
    <div className="sign-up-section">
      <div className="sign-up-form">
        <div className="register-step-container">
          <RegisterStep />
        </div>
        <div className="sign-up-form-wrapper">
          {RegistrationForm[props.form.currentForm]}
        </div>
      </div>
    </div>
  );
}

SignUpForm.propTypes = {
  form: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  form: state.RegistrationReducers,
});

export default connect(mapStateToProps)(SignUpForm);

/*
  const updateStepStatus = () => {
    for (const [key, value] of Object.entries(stepSignUpForm.step)) {
      if (value === "active" && key != "step4") {
        stepSignUpForm.step[key] = "finished";
        stepSignUpForm.step[
          `step${parseInt(key.substring(key.length - 1, key.length)) + 1}`
        ] = "active";
        setStepSignUpForm({
          ...stepSignUpForm,
          currentStep: stepSignUpForm.currentStep + 1,
        });
        return;
      }
    }
  };
  */
