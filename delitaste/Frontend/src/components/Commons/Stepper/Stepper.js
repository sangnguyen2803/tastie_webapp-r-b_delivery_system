import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import "./Stepper.scss";
import BreadcrumbIcon from "assets/Icon/BreadcrumbIcon.jpg";
import StepperArrow from "assets/stepper-arrow.png";
const Stepper = ({ steps }) => {
  return (
    <div className="stepper-container">
      {steps.map((step, index) => (
        <Fragment key={index}>
          <div className="stepper-wrapper">
            <div className={step.styling}>
              {!step.number ? index + 1 : step.number}
            </div>
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
  );
};

export default Stepper;
