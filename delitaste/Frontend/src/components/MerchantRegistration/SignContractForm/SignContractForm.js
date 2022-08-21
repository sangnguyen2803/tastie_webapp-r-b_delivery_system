import "./SignContractForm.scss";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import Footer from "components/Commons/Layout/Footer/Footer";
import NavBar from "components/Commons/Layout/NavBar/NavBar";
import Contract from "assets/pdf/contract.pdf";
import ToolBar from "components/Commons/Layout/Toolbar/Toolbar";
import MerchantBanner from "assets/merchant-form-banner.png";
import Stepper from "components/Commons/Stepper/Stepper";
import { createMerchantAPI } from "store/actions/ProviderAction/ProviderAction";

import { faChevronDown, faDesktop } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const backgroundStyling = {
  background: `url(${MerchantBanner})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

function SignContractForm(props) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  const contractFormHandler = async () => {
    const { user, createMerchantAPI } = props;
    let result = -1;
    if (user.profile?.user_id) {
      result = await createMerchantAPI(user.profile.user_id);
      if (result !== -1)
        props.history.push(`/merchant-registration/${result}/service`);
    } else props.history.push("/sign-in");
  };
  return (
    <>
      <div className="sign-contract-form navbar-state">
        <NavBar hideBreadcrumb={true} fixed={true} />

        <div className="contract-form-wrapper">
          <div className="contract-form">
            <span className="contract-header-title">
              Contract terms and agreements
            </span>
            <div className="form-header-wrapper">
              <div className="form-number-wrapper">
                <FontAwesomeIcon className="form-number" icon={faChevronDown} />
                <span className="show-more-text">Sign contract</span>
              </div>
              <span className="merchant-registration-header-title">
                Start to grow your business
              </span>
            </div>
            <span className="contract-header-text">
              Please read our terms and conditions:
            </span>

            <span className="contract-header-sub-text">
              To start online business, making sure that you or the Parties
              hereby have read carefully and agreed to the our terms and
              conditions set forth in PDF file below.
            </span>
            <br></br>
            <embed className="contract-pdf-viewer" src={Contract} />
            <div className="contract-agree-section">
              <div className="contract-agree-check-wrapper">
                <input
                  type="checkbox"
                  name="switch"
                  className="contract-agree-check"
                />
              </div>
              <div className="contract-agree-description">
                I hereby confirm that I have read all terms and conditions above
                and agreed to sign contract with Tastie with the following fees
                to become Tastie Partner Merchants: <br />- Commission at 25%
                <br />- Within 30 days after your on-boarding request got
                approved, you must sign the contract to finish the registration
                process. Otherwise, your shop will be terminated on our
                platform.
              </div>
            </div>
            <div className="btn-sign-contract-wrapper">
              <div>
                <Link to="/merchant-registration">
                  <button className="btn-sign-contract-back">Back</button>
                </Link>
              </div>
              <div onClick={contractFormHandler}>
                <button className="btn-sign-contract-next">Agree</button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <ToolBar />
      </div>
    </>
  );
}

SignContractForm.propTypes = {
  createMerchantAPI: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});

export default withRouter(
  connect(mapStateToProps, {
    createMerchantAPI,
  })(SignContractForm)
);
