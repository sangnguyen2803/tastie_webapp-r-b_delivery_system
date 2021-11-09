import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faBars,
  faCaretDown,
  faCartArrowDown,
  faUser,
} from "@fortawesome/fontawesome-free-solid";
import UKFlag from "assets/Flags/us_flag.jpg";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import NavFlyout from "components/Commons/NavFlyout/NavFlyout";
import Logo from "assets/sub-logo.png";
import Modal from "components/Commons/Modal/Modal";
import "./MainNavBar.css";

function MainNavBar() {
  const [accountPanel, setAccountPanel] = useState(false);
  const [languagePanel, setLanguagePanel] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  const [categoryList, setCategoryList] = useState(false);

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
              <img className="nav-icon-img" src={UKFlag} />
            </div>
            <div className="nav-language-text-wrapper" style={{ width: "70%" }}>
              <div className="nav-language-sub-text">US</div>
              <div className="nav-language-main-text">
                <FontAwesomeIcon className="nav-sub-icon" icon={faCaretDown} />
              </div>
              {languagePanel ? (
                <NavFlyout width={"300px"} height={"180px"} />
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
                  width={"400px"}
                  height={"280px"}
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
        <div className="nav-feature-2">
          <div className="category-feature-wrapper">
            <a class="nav-text">Today's Deals</a>
          </div>
          <div className="category-feature-wrapper">
            <a class="nav-text">Trendings</a>
          </div>
          <div className="category-feature-wrapper">
            <a class="nav-text">Restaurants</a>
          </div>
          <div className="category-feature-wrapper">
            <a class="nav-text">Homemade Food</a>
          </div>
        </div>
      ) : (
        <></>
      )}
      {cartModal ? <Modal width="980" height="550" /> : <></>}
    </>
  );
}

export default MainNavBar;
