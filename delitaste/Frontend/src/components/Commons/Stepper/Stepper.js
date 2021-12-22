import { Link } from "react-router-dom";
import { useState } from "react";
import "./Stepper.scss";
import BreadcrumbIcon from "assets/Icon/BreadcrumbIcon.jpg";

const Stepper = (props) => {
  const steps = [
    {
      description: "Service Provider's Info",
      styling: "active",
    },
    {
      description: "Registered Representative Info",
      styling: "default",
    },
    {
      description: "Business Units Detail Info",
      styling: "default",
    },
    {
      description: "Product & Merchandise Info",
      styling: "default",
    },
    {
      description: "Bank Account Info",
      styling: "default",
    },
  ];
  return (
    <>
      <div className="stepper-container">
        {steps.map((step, index) => (
          <div className="stepper-wrapper" key={index}>
            <div className={step.styling}>{index + 1}</div>
            <span className="stepper-description">{step.description}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Stepper;
