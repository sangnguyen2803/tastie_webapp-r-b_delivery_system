import React, { useState } from "react";
import "./ForgetForm.css";
import Logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
function ForgetForm(props) {
  return (
    <div className="sign-up-section">
      <div className="sign-up-form">
        <div className="sign-up-form-wrapper">
          <img className="brand-logo-image-sign-up" src={Logo} />
          Hello
        </div>
      </div>
    </div>
  );
}

export default ForgetForm;
