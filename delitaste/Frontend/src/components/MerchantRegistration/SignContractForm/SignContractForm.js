import "./SignContractForm.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Footer from "components/Commons/LayoutComponents/Footer/Footer";
import NavBar from "components/Commons/LayoutComponents/NavBar/NavBar";
import Contract from "assets/pdf/contract.pdf";
import ToolBar from "components/Commons/LayoutComponents/Toolbar/Toolbar";
import RegisterStep from "components/UserAdmission/SignUpForm/RegisterStep";
import SideBar from "components/Commons/LayoutComponents/SideBar/SideBar";
function SignContractForm() {
  return (
    <>
      <div className="sign-contract-form">
        <NavBar />
        <div className="sign-contract-form-containter">
          <div className="contract-form-wrapper">
            <div className="contract-form-header">
              <span>Sign Contract</span>
            </div>
            <span className="contract-header-text">
              Please read our terms and conditions:
            </span>
            <span className="contract-header-sub-text">
              To start online business, making sure that you or the Parties
              hereby have read carefully and agreed to the our terms and
              conditions set forth in PDF file below. For more details, contact
              us at <strong>+84 33 790 7047</strong>.
            </span>
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
              <Link to="/merchant-registration">
                <button className="btn-sign-contract-back">Back</button>
              </Link>

              <Link to="/merchant-registration/create-shop">
                <button className="btn-sign-contract-next">Agree</button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
        <ToolBar />
      </div>
    </>
  );
}

export default SignContractForm;