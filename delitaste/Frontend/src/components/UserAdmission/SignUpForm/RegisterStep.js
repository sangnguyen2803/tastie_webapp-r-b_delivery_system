import React, { Fragment } from "react";
import "./RegisterStep.scss";
import Arrow from "../../../assets/arrow.png";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function RegisterStep({ registerState }) {
  //jsx
  return (
    <Fragment>
      <div className="register-step-wrapper">
        <div className="step-wrapper">
          <div className={registerState.styling[0]}>1</div>
          <span className="step-detail-description">Account registration</span>
        </div>
        <img className="step-arrow" src={Arrow} />
        <div className="step-wrapper">
          <div className={registerState.styling[1]}>2</div>
          <span className="step-detail-description">Email Verification</span>
        </div>
        <img className="step-arrow" src={Arrow} />
        <div className="step-wrapper">
          <div className={registerState.styling[2]}>3</div>
          <span className="step-detail-description">Profile Completion</span>
        </div>
        <img className="step-arrow" src={Arrow} />
        <div className="step-wrapper">
          <div className={registerState.styling[3]}>4</div>
          <span className="step-detail-description">Select preference</span>
        </div>
      </div>
    </Fragment>
  );
}

RegisterStep.propTypes = {
  registerState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  registerState: state.RegistrationReducers,
});
export default connect(mapStateToProps)(RegisterStep);
