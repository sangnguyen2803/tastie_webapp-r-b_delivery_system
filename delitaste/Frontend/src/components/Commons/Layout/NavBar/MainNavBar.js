import React, { useEffect, useState, Fragment } from "react";
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
import { faBell } from "@fortawesome/free-solid-svg-icons";
import ENFlag from "assets/Flags/en_flag.png";
import FRFlag from "assets/Flags/fr_flag.png";
import VIFlag from "assets/Flags/vi_flag.png";
import { Link } from "react-router-dom";
import i18n from "i18n";
//components
import "./MainNavBar.scss";
import SearchBar from "./SearchBar";
import NavFlyout from "components/Commons/Overlay/Popup/NavFlyout/NavFlyout";
import Logo from "assets/sub-logo.png";
import Modal from "components/Commons/Overlay/Popup/Modal/Modal";
import LanguageSettingPanel from "components/Commons/Overlay/Popup/Panel/LanguageSettingPanel";
import AccountSettingPanel from "components/Commons/Overlay/Popup/Panel/AccountSettingPanel";
import NotificationPanel from "components/Commons/Overlay/Popup/Panel/NotificationPanel";
import Cart from "components/Commons/Cart/Cart";
import { propTypes } from "react-map-gl-geocoder";

const notificationList = [
  {
    user_id: 1039129,
    role: 1, //to check whether a notification belongs to user or provider
    content: "Your order #483I1P655085433 has been submitted",
    create_at: "2022-06-12T00:00:00.000+00:00", //to display datetime that a notification was sent
    order_code: "483I1P7-6537131032665508",
    read_status: false,
    type: 1,
  },
  {
    user_id: 1039129,
    role: 1, //to check whether a notification belongs to user or provider
    content: "Your has just received a promotion from The Dirty South",
    create_at: "2022-06-07T00:00:00.000+00:00", //to display datetime that a notification was sent
    order_code: "483I1P7-6537131032665508",
    read_status: true,
    type: 3,
  },
  {
    user_id: 1039129,
    role: 1, //to check whether a notification belongs to user or provider
    content: "The Dirty South has confirmed your order #483I1P655085433",
    create_at: "2022-06-05T00:00:00.000+00:00", //to display datetime that a notification was sent
    order_code: "483I1P7-6537131032665508",
    read_status: false,
    type: 2,
  },
  {
    user_id: 1039129,
    role: 1, //to check whether a notification belongs to user or provider
    content: "Alex Buham has sent you a message you",
    create_at: "2022-04-05T00:00:00.000+00:00", //to display datetime that a notification was sent
    order_code: "483I1P7-6537131032665508",
    read_status: false,
    type: 4,
  },
  {
    user_id: 1039129,
    role: 1, //to check whether a notification belongs to user or provider
    content: "Alex Buham has sent you a message you",
    create_at: "2021-04-05T00:00:00.000+00:00", //to display datetime that a notification was sent
    order_code: "483I1P7-6537131032665508",
    read_status: true,
    type: 4,
  },
];
/*
<div className="nav-logo-wrapper" onClick={() => history.push("/")}>
            <img className="nav-logo" alt="Logo" src={Logo} />
            <span className="nav-logo-title">Tastie!</span>
          </div>
*/
function MainNavBar({ user, history, ...rest }) {
  const [accountPanel, setAccountPanel] = useState(false);
  const [languagePanel, setLanguagePanel] = useState(false);
  const [notificationPanel, setNotificationPanel] = useState(false);
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
          <div className="nav-logo-wrapper" onClick={() => history.push("/")}>
            <img height={30} alt="Logo" src={Logo} />
          </div>
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
            onMouseEnter={() => {
              setLanguagePanel((prev) => !prev);
            }}
            onMouseLeave={() => {
              setLanguagePanel((prev) => !prev);
            }}
          >
            <div className="nav-language-icon-wrapper">
              <img
                className="nav-icon-img"
                src={flag[i18n.language] ? flag[i18n.language][0] : ENFlag}
                alt="language"
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
            onMouseEnter={() => {
              setAccountPanel((prev) => !prev);
            }}
            onMouseLeave={() => {
              setAccountPanel((prev) => !prev);
            }}
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
                  onMouseLeave={() => {
                    setLanguagePanel((prev) => !prev);
                  }}
                >
                  <AccountSettingPanel />
                </NavFlyout>
              ) : (
                <></>
              )}
            </div>
          </div>
          {user.isUserAuthenticated ? (
            <div
              className="nav-notification-container"
              onClick={() => {
                setNotificationPanel((prev) => !prev);
              }}
            >
              <div className="nav-notification-icon-wrapper">
                <FontAwesomeIcon className="nav-icon" icon={faBell} />
              </div>

              <div className="nav-notification-text-wrapper">
                <div className="nav-notification-number">
                  {user.notifications.filter((d) => !d.read_status).length}
                </div>
              </div>
            </div>
          ) : (
            <Fragment></Fragment>
          )}

          <div
            className="nav-cart-container"
            onClick={() => setCartModal((prev) => !prev)}
          >
            <div className="nav-gadget-icon-wrapper">
              <FontAwesomeIcon className="nav-icon" icon={faCartArrowDown} />
            </div>
            <div className="nav-cart-text-wrapper">
              <div
                className="nav-cart-number"
                style={{
                  padding:
                    user.userCart?.cart?.length < 10 ? "10% 17%" : "10% 10%",
                }}
              >
                {user.userCart?.cart?.length <= 99
                  ? user.userCart.cart.length
                  : "99+"}
              </div>
              <div className="nav-cart-text">Cart</div>
            </div>
          </div>
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
                  alt="profile_photo"
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
      <Modal
        distanceFromTop={rest.hideSubNavbar ? "-35px" : 0}
        cartQuantity={user.userCart?.cart?.length}
        openModal={cartModal}
        title={"Add Additional Options"}
        position="right"
        cartWidth={450}
        cartHeight={"320"}
        cartHeightAuto={true}
        cartPositionTop={0}
        cartPositionRight={0}
        useCartUI={true}
        transparentUnderNavbar={true}
        transparent={"0.3"}
        showCartTitle={true}
        closeModal={() => {
          setCartModal(false);
        }}
      >
        <Cart />
      </Modal>
      <Modal
        distanceFromTop={rest.hideSubNavbar ? "-35px" : 0}
        cartQuantity={user.userCart?.cart?.length}
        hideCloseButton={true}
        openModal={notificationPanel}
        title={"Add Additional Options"}
        position="right"
        cartWidth={420}
        cartHeight={"1200"}
        cartHeightAuto={false}
        cartPositionTop={0}
        cartPositionRight={0}
        useCartUI={true}
        transparentUnderNavbar={true}
        transparent={"0.3"}
        showCartTitle={false}
        closeModal={() => {
          setNotificationPanel(false);
        }}
      >
        <NotificationPanel notifications={notificationList} />
      </Modal>
    </>
  );
}

MainNavBar.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});

export default withRouter(connect(mapStateToProps, null)(MainNavBar));
