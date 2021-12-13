import "./SignContractForm.scss";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import Footer from "components/Commons/Layout/Footer/Footer";
import NavBar from "components/Commons/Layout/NavBar/NavBar";
import Contract from "assets/pdf/contract.pdf";
import ToolBar from "components/Commons/Layout/Toolbar/Toolbar";
import MerchantBanner from "assets/merchant-form-banner.png";
import FormBanner from "assets/Banner/merchant-form-banner.png";
import Spinner from "components/Commons/Overlay/Spinner/Spinner";

import { withRouter } from "react-router-dom";

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
  const contractFormHandler = () => {
    props.history.push("service-info");
  };
  return (
    <>
      <div className="sign-contract-form navbar-state">
        <NavBar hideBreadcrumb={false} fixed={true} />
        <div
          className="sign-contract-form-containter"
          style={backgroundStyling}
        >
          <div className="contract-form-wrapper">
            <div className="contract-form">
              <div className="form-banner-wrapper">
                <img src={FormBanner} className="form-banner-img" />
              </div>
              <span className="contract-header-title">
                Contract terms and agreements
              </span>
              <span className="contract-header-text">
                Please read our terms and conditions:
              </span>

              <span className="contract-header-sub-text">
                To start online business, making sure that you or the Parties
                hereby have read carefully and agreed to the our terms and
                conditions set forth in PDF file below.
              </span>
              <h2></h2>
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
                  I hereby confirm that I have read all terms and conditions
                  above and agreed to sign contract with Tastie with the
                  following fees to become Tastie Partner Merchants: <br />-
                  Commission at 25%
                  <br />- Within 30 days after your on-boarding request got
                  approved, you must sign the contract to finish the
                  registration process. Otherwise, your shop will be terminated
                  on our platform.
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
        </div>
        <Footer />
        <ToolBar />
      </div>
      <Spinner visibility={true} />
    </>
  );
}

export default withRouter(SignContractForm);
