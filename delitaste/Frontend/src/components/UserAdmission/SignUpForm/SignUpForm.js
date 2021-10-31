import React, { useState, useEffect } from "react";
import "screens/UserAdmissionScreen/UserAdmission.css";
import RegisterStep from "./RegisterStep";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DetailSignUpForm1 from "./DetailSignUpForm/DetailSignUpForm1";
import DetailSignUpForm2 from "./DetailSignUpForm/DetailSignUpForm2";
import EmailVerification from "./DetailSignUpForm/EmailVerification";

function SignUpForm({ form }) {
  /*
  const [stepSignUpForm, setStepSignUpForm] = useState({
    step: {
      step1: "active",
      step2: "default",
      step3: "default",
      step4: "default",
    },
    btnText: "Sign Up",
    buttonStatus: "disable",
    currentStep: 1,
  });
  */
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
  const loadSignUpForm = () => {
    const { currentForm } = form;
    if (currentForm === "account_registration") return <DetailSignUpForm1 />;
    if (currentForm === "email_verification") return <EmailVerification />;
    if (currentForm === "profile_completion") return <DetailSignUpForm2 />;
  };
  return (
    <div className="sign-up-section">
      <div className="sign-up-form">
        <RegisterStep />
        <div className="sign-up-form-wrapper">{loadSignUpForm()}</div>
      </div>
    </div>
  );
}

SignUpForm.propTypes = {
  form: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  form: state.loadFormReducer,
});

export default connect(mapStateToProps)(SignUpForm);
