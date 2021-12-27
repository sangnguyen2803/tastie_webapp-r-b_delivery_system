import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import "./Stepper.scss";
import BreadcrumbIcon from "assets/Icon/BreadcrumbIcon.jpg";
import StepperArrow from "assets/stepper-arrow.png";
const Stepper = (props) => {
  const steps = [
    {
      description: "Service info",
      styling: "active",
    },
    {
      description: "Representative info",
      styling: "default",
    },
    {
      description: "Business unit info",
      styling: "default",
    },
    {
      description: "Product detail info",
      styling: "default",
    },
    {
      description: "Bank info",
      styling: "default",
    },
  ];
  return (
    <>
      <div className="stepper-container">
        {steps.map((step, index) => (
          <Fragment>
            <div className="stepper-wrapper" key={index}>
              <div className={step.styling}>{index + 1}</div>
              <span className="stepper-description">{step.description}</span>
            </div>
            {index !== steps.length - 1 ? (
              <img
                className="stepper-arrow"
                src={StepperArrow}
                height={2}
                width={50}
              />
            ) : (
              <Fragment></Fragment>
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default Stepper;
