import React, { useEffect, useState } from "react";
import ProfilePhoto from "assets/avatar.jpg";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCaretDown,
  faCartArrowDown,
  faUser,
  faTimes,
} from "@fortawesome/fontawesome-free-solid";

import ENFlag from "assets/Flags/en_flag.png";
import FRFlag from "assets/Flags/fr_flag.png";
import VIFlag from "assets/Flags/vi_flag.png";
import { Link } from "react-router-dom";

//components

import "./MainNavBar.scss";
import SearchBar from "./SearchBar";
import NavFlyout from "components/Commons/Overlay/Popup/NavFlyout/NavFlyout";
import Logo from "assets/sub-logo.png";
import Modal from "components/Commons/Overlay/Popup/Modal/Modal";
import LanguageSettingPanel from "components/Commons/Overlay/Popup/Panel/LanguageSettingPanel";
import AccountSettingPanel from "components/Commons/Overlay/Popup/Panel/AccountSettingPanel";
import i18n from "i18n";

function MainNavBar({ user }) {
  const [accountPanel, setAccountPanel] = useState(false);
  const [languagePanel, setLanguagePanel] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const flag = {
    en: [ENFlag, "EN"],
    fr: [FRFlag, "FR"],
    vi: [VIFlag, "VI"],
  };

  return (
    <>
      <div className="main-nav-menu-prefix">
        <div className="main-nav-prefix-container">
          <Link className="nav-logo-wrapper" to="/">
            <img className="nav-logo" src={Logo} />
            <span className="nav-logo-title">Tastie!</span>
          </Link>
          <div className="nav-wrapper-2">
            <div className="nav-menu-prefix-2">
              <div className="nav-category-item-2">
                <FontAwesomeIcon
                  onClick={() => setMobileSidebar((prev) => !prev)}
                  className="nav-icon-prefix-2"
                  icon={faBars}
                />
              </div>
            </div>
          </div>
          <SearchBar />
        </div>
        <div className="main-nav-surfix-container">
          <div
            className="nav-language-container"
            onMouseEnter={() => setLanguagePanel(true)}
            onMouseLeave={() => setLanguagePanel(false)}
          >
            <div className="nav-language-icon-wrapper">
              <img
                className="nav-icon-img"
                src={flag[i18n.language] ? flag[i18n.language][0] : ENFlag}
              />
            </div>
            <div className="nav-language-text-wrapper" style={{ width: "70%" }}>
              <div className="nav-language-sub-text">
                {flag[i18n.language] ? flag[i18n.language][1] : "EN"}
              </div>
              <div className="nav-language-main-text">
                <FontAwesomeIcon className="nav-sub-icon" icon={faCaretDown} />
              </div>
              {languagePanel ? (
                <NavFlyout width={"300px"} height={"160px"}>
                  <LanguageSettingPanel />
                </NavFlyout>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div
            className="nav-gadget-container"
            onMouseEnter={() => setAccountPanel((prev) => !prev)}
            onMouseLeave={() => setAccountPanel((prev) => !prev)}
          >
            <div className="nav-gadget-icon-wrapper">
              <FontAwesomeIcon className="nav-icon" icon={faUser} />
            </div>
            <div className="nav-gadget-text-wrapper">
              <div className="nav-gadget-sub-text-1">
                Welcome,{" "}
                {user.isUserAuthenticated && user.profile
                  ? user.profile.first_name
                  : "Sign In"}
              </div>
              <div className="nav-gadget-main-text">Account & E-Wallet</div>
            </div>
            <div className="nav-end-gadget-text-wrapper">
              <div
                className="nav-gadget-sub-text-2"
                style={{ visibility: "hidden" }}
              >
                US
              </div>
              <div className="nav-end-gadget-main-text">
                <FontAwesomeIcon className="nav-sub-icon" icon={faCaretDown} />
              </div>
              {accountPanel ? (
                <NavFlyout
                  width={"360px"}
                  height={"auto"}
                  margin={"0 0 0 -320px"}
                  onMouseLeave={() => setLanguagePanel((prev) => !prev)}
                >
                  <AccountSettingPanel />
                </NavFlyout>
              ) : (
                <></>
              )}
            </div>
          </div>
          <a
            className="nav-cart-container"
            onClick={() => setCartModal((prev) => !prev)}
          >
            <div className="nav-gadget-icon-wrapper">
              <FontAwesomeIcon className="nav-icon" icon={faCartArrowDown} />
            </div>
            <div className="nav-cart-text-wrapper">
              <div className="nav-cart-number">99+</div>
              <div className="nav-cart-text">Cart</div>
            </div>
          </a>
        </div>
      </div>

      {mobileSidebar ? (
        <>
          <div className="darken-mask-mobile"></div>
          <div className="sidebar-container">
            <div className="sidebar-head-mobile">
              <FontAwesomeIcon
                className="side-bar-close-icon"
                onClick={() => setMobileSidebar(false)}
                icon={faTimes}
              />
              <div className="profile-container-mobile">
                <img
                  src={ProfilePhoto}
                  className="profile-photo-preview-mobile"
                />
                <span className="profile-name-mobile">
                  {user.profile
                    ? `${user.profile.first_name} ${user.profile.last_name}`
                    : ""}
                </span>
              </div>
            </div>
            <div className="side-bar-feature-container">
              <div className="category-feature-wrapper">
                <div className="nav-text">Edit Profile</div>
              </div>
              <div className="category-feature-wrapper">
                <div className="nav-text">Merchant Dashboard</div>
              </div>
              <div className="category-feature-wrapper">
                <div className="nav-text">Merchant Registration</div>
              </div>
              <div className="category-feature-wrapper">
                <div className="nav-text">Cart Detail</div>
              </div>
              <div className="category-feature-wrapper">
                <div className="nav-text">Give feedbacks</div>
              </div>

              <div className="category-feature-wrapper">
                <div className="nav-text">Change Password</div>
              </div>
              <div className="category-feature-wrapper">
                <div className="nav-text">Order History</div>
              </div>
              <div className="category-feature-wrapper">
                <div className="nav-text">Settings & Privacy</div>
              </div>
              <div className="category-feature-wrapper">
                <div className="nav-text">Log Out</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {cartModal ? <Modal width="980" height="550" /> : <></>}
    </>
  );
}

MainNavBar.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducers,
});

export default withRouter(connect(mapStateToProps, null)(MainNavBar));