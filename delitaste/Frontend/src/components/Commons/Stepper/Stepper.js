import { Link } from "react-router-dom";
import { useState } from "react";
import "./Stepper.scss";
import BreadcrumbIcon from "assets/Icon/BreadcrumbIcon.jpg";

const Stepper = (props) => {
  const steps = [
    {
      number: "1",
      description: "Service Provider's Info",
      styling: "active",
    },
    {
      number: "2",
      description: "Registered Representative Info",
      styling: "default",
    },
    {
      number: "3",
      description: "Business Units Detail Info",
      styling: "default",
    },
    {
      number: "4",
      description: "Product & Merchandise Info",
      styling: "default",
    },
    {
      number: "5",
      description: "Merchant App Registration",
      styling: "default",
    },
    {
      number: "6",
      description: "Tastie E-Wallet",
      styling: "default",
    },
  ];
  return (
    <>
      <div className="stepper-container">
        {steps.map((step, index) => (
          <div className="stepper-wrapper">
            <div className={step.styling}>{step.number}</div>
            <span className="stepper-description">{step.description}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Stepper;
