import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCaretDown,
  faCartArrowDown,
  faUser,
  faTimes,
  faFileAlt,
} from "@fortawesome/fontawesome-free-solid";

import faShopify from "@fortawesome/react-fontawesome";
import ENFlag from "assets/Flags/en_flag.png";
import FRFlag from "assets/Flags/fr_flag.png";
import VIFlag from "assets/Flags/vi_flag.png";
import { Link } from "react-router-dom";

//components

import "./MainNavBar.scss";
import SearchBar from "./SearchBar";
import NavFlyout from "components/Commons/NavFlyout/NavFlyout";
import Logo from "assets/sub-logo.png";
import Modal from "components/Commons/Modal/Modal";
import LanguageSettingPanel from "components/Commons/Panel/LanguageSettingPanel";
import AccountSettingPanel from "components/Commons/Panel/AccountSettingPanel";
import i18n from "i18n";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function MainNavBar(props) {
  const [accountPanel, setAccountPanel] = useState(false);
  const [languagePanel, setLanguagePanel] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  const [categoryList, setCategoryList] = useState(false);
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
                  onClick={() => setCategoryList((prev) => !prev)}
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
                <NavFlyout
                  width={"300px"}
                  height={"160px"}
                  components={<LanguageSettingPanel />}
                />
              ) : (
                <></>
              )}
            </div>
          </div>

          <Link
            to="/sign-in"
            className="nav-gadget-container"
            onMouseEnter={() => setAccountPanel((prev) => !prev)}
            onMouseLeave={() => setAccountPanel((prev) => !prev)}
          >
            <div className="nav-gadget-icon-wrapper">
              <FontAwesomeIcon className="nav-icon" icon={faUser} />
            </div>
            <div className="nav-gadget-text-wrapper">
              <div className="nav-gadget-sub-text">Welcome, Sign In</div>
              <div className="nav-gadget-main-text">Account & E-Wallet</div>
            </div>
            <div className="nav-end-gadget-text-wrapper">
              <div
                className="nav-gadget-sub-text"
                style={{ visibility: "hidden" }}
              >
                US
              </div>
              <div className="nav-end-gadget-main-text">
                <FontAwesomeIcon className="nav-sub-icon" icon={faCaretDown} />
              </div>
              {accountPanel ? (
                <NavFlyout
                  width={"350px"}
                  height={"250px"}
                  margin={"0 0 0 -320px"}
                  components={<AccountSettingPanel />}
                  onMouseLeave={() => setLanguagePanel((prev) => !prev)}
                />
              ) : (
                <></>
              )}
            </div>
          </Link>
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

      {categoryList ? (
        <>
          <div className="darken-mask-mobile"></div>
          <div className="sidebar-container">
            <FontAwesomeIcon
              className="side-bar-close-icon"
              onClick={() => setCategoryList(false)}
              icon={faTimes}
            />
            <div className="side-bar-feature-container">
              <div className="category-feature-wrapper">
                <div class="nav-text">Profile</div>
              </div>
              <div className="category-feature-wrapper">
                <div class="nav-text">Give feedbacks</div>
              </div>
              <div className="category-feature-wrapper">
                <div class="nav-text">Merchant Dashboard</div>
              </div>
              <div className="category-feature-wrapper">
                <div class="nav-text">Change Password</div>
              </div>

              <div className="category-feature-wrapper">
                <div class="nav-text">Order History</div>
              </div>
              <div className="category-feature-wrapper">
                <div class="nav-text">Settings & Privacy</div>
              </div>
              <div className="category-feature-wrapper">
                <div class="nav-text">Log Out</div>
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

export default withRouter(MainNavBar);
