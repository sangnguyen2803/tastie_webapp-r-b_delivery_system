import { Link, useLocation } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import "./Stepper.scss";
import StepperArrow from "assets/stepper-arrow.png";
const Stepper = ({ steps }) => {
  const location = useLocation();
  const [stepNumber, setStepNumber] = useState(0);
  useEffect(() => {
    switch (location.pathname.split("/")[3]) {
      case "service":
        setStepNumber(1);
        break;
      case "representative":
        setStepNumber(2);
        break;
      case "business-unit":
        setStepNumber(3);
        break;
      case "product-detail":
        setStepNumber(4);
        break;
      case "bank":
        setStepNumber(5);
        break;
      default:
        setStepNumber(1);
    }
    console.log(location);
  }, [location]);
  return (
    <div className="stepper-container">
      {steps.map((step, index) => (
        <Fragment key={index}>
          <div className="stepper-wrapper">
            <div className={index < stepNumber ? "active" : "default"}>
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
              alt="arrow"
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
