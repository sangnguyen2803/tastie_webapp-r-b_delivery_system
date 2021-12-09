import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/fontawesome-free-solid";
import "./AccountSettingPanel.scss";
import "style/Common.scss";
import { useTranslation } from "react-i18next";

const AccountSettingPanel = (props) => {
  const { i18n } = useTranslation();
  const isLoginAuthenticated = true;
  return (
    <div className="account-panel">
      {isLoginAuthenticated ? (
        <>
          <div className="btn-panel btn-account-panel-position">Sign in</div>
          <div className="sub-panel-title">
            New customer?
            <Link to="/sign-up" className="sub-panel-link">
              Start here.
            </Link>
          </div>
        </>
      ) : (
        <></>
      )}

      <div className="panel-account-service-wrapper">
        <div className="e-wallet-services">
          <span className="account-service-title">Your E-Wallet</span>
          <Link to="/merchant-registration" className="service-name">
            E-Wallet
          </Link>
          <Link to="/merchant-registration" className="service-name">
            Add a payment method
          </Link>
          <Link to="/merchant-registration" className="service-name">
            Spending History
          </Link>
          <Link to="/merchant-registration" className="service-name">
            Change Budget Limit
          </Link>
        </div>
        <div className="account-services">
          <span className="account-service-title">Your Account</span>
          <Link to="/merchant-registration" className="service-name">
            Profile
          </Link>
          <Link to="/merchant-registration" className="service-name">
            Order & Bills
          </Link>
          <Link to="/merchant-registration" className="service-name">
            E-Coupons & Vouchers
          </Link>
          <Link to="/merchant-registration" className="service-name">
            Merchant Registration
          </Link>
          <Link to="/merchant-registration" className="service-name">
            Browsing History
          </Link>
          <Link to="/merchant-registration" className="service-name">
            Watchlist
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingPanel;
