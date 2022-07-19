import withAuth from "components/HigherOrderComponents(HOC)/withAuth";
import React, { Fragment, useState, useEffect } from "react";
import "./ProfileSidebar.scss";
import PropTypes from "prop-types";
import { useLocation, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import IosApp from "assets/ios_app.png";
import AndroidApp from "assets/android_app.png";
import Avatar from "assets/avatar.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAndroid,
  faApple,
  faServicestack,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBell,
  faCog,
  faCogs,
  faCrown,
  faHeart,
  faQuestion,
  faQuestionCircle,
  faTags,
  faUser,
} from "@fortawesome/fontawesome-free-solid";
import { faScroll } from "@fortawesome/free-solid-svg-icons";

function ProfileSidebar(props) {
  const location = useLocation();
  const sidebarItemSelected = {
    color: "#101010",
    backgroundColor: "#f0f0f0",
  };
  const { history, user } = props;
  return (
    <div className="u-pf-sb-wrapper">
      <div className="u-pf-sb-items-wrapper">
        <div className="u-pf-sb-header">
          <img
            src={Avatar}
            alt="profile_image"
            className="u-pf-sb-profile-img"
          />
          <div className="u-pf-sb-profile-text-wrapper">
            <span className="u-pf-sb-pt-main-text">
              {`${user?.profile?.first_name || ""} ${
                user?.profile?.last_name || ""
              }`}
            </span>
            <span className="u-pf-sb-pt-icon">
              <FontAwesomeIcon className="vip-customer" icon={faCrown} />
              <span className="u-pf-sb-pt-sub-text-type">Gold customer</span>
            </span>
            <span className="u-pf-sb-pt-sub-text">27 orders</span>
          </div>
        </div>
        <div
          className="u-pf-sb-row"
          style={
            location.pathname === "/profile/edit" ? sidebarItemSelected : {}
          }
          onClick={() => history.push(`/profile/edit`)}
        >
          <FontAwesomeIcon className="u-pf-sb-row-icon" icon={faUser} />
          <span>Profile</span>
        </div>
        <div
          className="u-pf-sb-row"
          style={
            location.pathname === "/profile/favorites"
              ? sidebarItemSelected
              : {}
          }
          onClick={() => history.push(`/profile/favorites`)}
        >
          <FontAwesomeIcon className="u-pf-sb-row-icon" icon={faHeart} />
          <span>Favorites</span>
        </div>
        <div
          className="u-pf-sb-row"
          style={
            location.pathname === "/profile/notification"
              ? sidebarItemSelected
              : {}
          }
          onClick={() => history.push("/profile/notification")}
        >
          <FontAwesomeIcon className="u-pf-sb-row-icon" icon={faBell} />
          <span>Notifications</span>
        </div>
        <div
          className="u-pf-sb-row"
          style={
            location.pathname.includes(`/profile/order-history`)
              ? sidebarItemSelected
              : {}
          }
          onClick={() => history.push(`/profile/order-history`)}
        >
          <FontAwesomeIcon className="u-pf-sb-row-icon" icon={faScroll} />
          <span>Order History</span>
        </div>
        <div
          className="u-pf-sb-row"
          style={
            location.pathname === "/profile/promotions"
              ? sidebarItemSelected
              : {}
          }
          onClick={() => history.push("/profile/promotions")}
        >
          <FontAwesomeIcon className="u-pf-sb-row-icon" icon={faTags} />
          <span>Promotions</span>
        </div>
        <div
          className="u-pf-sb-row"
          style={
            location.pathname === "/profile/help" ? sidebarItemSelected : {}
          }
          onClick={() => history.push("/profile/help")}
        >
          <FontAwesomeIcon
            className="u-pf-sb-row-icon"
            icon={faQuestionCircle}
          />
          <span>Support Service</span>
        </div>
        <div
          className="u-pf-sb-row"
          style={
            location.pathname === "/profile/account-settings"
              ? sidebarItemSelected
              : {}
          }
          onClick={() => history.push("/profile/account-settings")}
        >
          <FontAwesomeIcon className="u-pf-sb-row-icon" icon={faCog} />
          <span>Settings</span>
        </div>
        <div
          className="u-pf-sb-row-end"
          onClick={() => history.push("/profile/account-settings")}
        >
          <span className="u-pf-sb-low-text">Sign out</span>
        </div>
      </div>
      <div className="u-pf-sb-body">
        <span className="u-pf-sb-bd-text">Order checkout</span>
        <span className="u-pf-sb-bd-text">Upgrade to a business account</span>
        <span className="u-pf-sb-bd-text">Sign up for delivery service</span>
      </div>
      <div className="android-ios-app">
        <div className="ad-io-app-item">
          <FontAwesomeIcon className="ad-io-icon" icon={faApple} />
          <span>Iphone</span>
        </div>
        <div className="ad-io-app-item">
          <FontAwesomeIcon className="ad-io-icon" icon={faAndroid} />
          <span>Android</span>
        </div>
      </div>
    </div>
  );
}

ProfileSidebar.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(
  withAuth(connect(mapStateToProps, null)(ProfileSidebar))
);
