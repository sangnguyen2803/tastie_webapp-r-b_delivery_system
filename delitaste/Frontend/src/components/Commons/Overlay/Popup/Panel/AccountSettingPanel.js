import { Link } from "react-router-dom";
import ProfilePhoto from "assets/avatar.jpg";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Fragment, useState } from "react";
import "./AccountSettingPanel.scss";
import "style/Common.scss";
import { useTranslation } from "react-i18next";
import { userSignOut } from "store/actions/UserAction/UserAction";
import { propTypes } from "react-map-gl-geocoder";

const AccountSettingPanel = ({ user, userSignOut, history }) => {
  const { i18n } = useTranslation();
  const handleSignOut = () => {
    userSignOut();
    history.push("/sign-in");
  };
  const handleSignUp = () => {
    history.push("/sign-up");
  };
  return (
    <div className="account-panel">
      {user.isUserAuthenticated ? (
        <Fragment>
          <div className="sub-panel-title">
            <img
              src={ProfilePhoto}
              alt="profile_photo"
              className="profile-photo-preview"
            />
            <span className="profile-name">
              {user.profile
                ? `${user.profile.first_name} ${user.profile.last_name}`
                : ""}
            </span>
            <Link to={`/profile/edit`} className="sub-panel-text-link">
              Edit profile
            </Link>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div
            onClick={() => history.replace("/sign-in")}
            className="btn-panel btn-account-panel-position"
          >
            Sign in
          </div>
          <div className="sub-panel-title">
            New customer?
            <span onClick={handleSignUp} className="sub-panel-link">
              Start here.
            </span>
          </div>
        </Fragment>
      )}

      <div className="panel-account-service-wrapper">
        <div className="e-wallet-services">
          <span className="account-service-title">Your E-Wallet</span>
          <Link to="/merchant-registration" className="service-name">
            E-Wallet
          </Link>
          <Link to="/merchant-registration" className="service-name">
            Payment method
          </Link>
          <Link to="/merchant-registration" className="service-name">
            Spending History
          </Link>
          <Link to="/merchant-registration" className="service-name">
            Budget Limit
          </Link>
        </div>
        <div className="account-services">
          <span className="account-service-title">Your Account</span>
          <div
            onClick={() => history.push("/profile/favorites")}
            className="service-name"
          >
            Favorites
          </div>
          <div
            className="service-name"
            onClick={() => history.push(`/profile/order-history`)}
          >
            Order History
          </div>
          <div
            onClick={() => {
              if (user?.provider_id !== -1 && user?.profile.user_id) {
                history.push(`/merchant-dashboard/provider/general`);
              } else {
                history.replace(`/merchant-registration`);
              }
            }}
            className="service-name"
          >
            Merchant Dashboard
          </div>
          <div
            onClick={() => history.push("/merchant-registration")}
            className="service-name"
          >
            Merchant Registration
          </div>
          <div
            onClick={() => history.push("/profile/account-settings")}
            className="service-name"
          >
            Change Password
          </div>
        </div>
      </div>
      {user.isUserAuthenticated ? (
        <div
          onClick={handleSignOut}
          className="btn-panel btn-account-panel-position"
        >
          Sign Out
        </div>
      ) : (
        <Fragment />
      )}
    </div>
  );
};

AccountSettingPanel.propTypes = {
  user: PropTypes.object.isRequired,
  userSignOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});

export default withRouter(
  connect(mapStateToProps, { userSignOut })(AccountSettingPanel)
);
