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
import BubbleSpeechAnchor from "components/Commons/BubbleSpeech/BubbleSpeechAnchor";
import BubbleSpeech from "components/Commons/BubbleSpeech/BubbleSpeech";
import Logo from "assets/sub-logo.png";
import Avatar from "assets/default-avatar.png";
import "./MainNavBar.css";

function MainNavBar() {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const openSubMenu = () => {
    setShowSubMenu((prev) => !prev);
  };
  return (
    <>
      <div className="main-nav-menu-prefix">
        <img className="nav-logo" src={Logo} />
        <span className="nav-logo-title">Tastie!</span>
        <div className="nav-wrapper-2">
          <div className="nav-menu-prefix-2">
            <div className="nav-category-item-2">
              <FontAwesomeIcon
                onClick={openSubMenu}
                className="nav-icon-prefix-2"
                icon={faBars}
              />
            </div>
          </div>
        </div>
        <SearchBar />

        <div className="nav-language-container">
          <div className="nav-language-icon-wrapper">
            <img className="nav-icon-img" src={UKFlag} />
          </div>
          <div className="nav-language-text-wrapper" style={{ width: "70%" }}>
            <div className="nav-gadget-sub-text">US</div>
            <div className="nav-language-main-text">
              <FontAwesomeIcon className="nav-sub-icon" icon={faCaretDown} />
            </div>
          </div>
        </div>

        <Link to="/sign-in" className="nav-gadget-container">
          <div className="nav-gadget-icon-wrapper">
            <FontAwesomeIcon className="nav-icon" icon={faUser} />
          </div>
          <div className="nav-gadget-text-wrapper">
            <div className="nav-gadget-sub-text">Welcome, Sign In</div>
            <div className="nav-gadget-main-text">Account & E-Wallet</div>
          </div>
          <div className="nav-language-text-wrapper">
            <div
              className="nav-gadget-sub-text"
              style={{ visibility: "hidden" }}
            >
              US
            </div>
            <div className="nav-language-main-text">
              <FontAwesomeIcon className="nav-sub-icon" icon={faCaretDown} />
            </div>
          </div>
        </Link>

        <div className="nav-cart-container">
          <div className="nav-gadget-icon-wrapper">
            <FontAwesomeIcon className="nav-icon" icon={faCartArrowDown} />
          </div>
          <div className="nav-cart-text-wrapper">
            <div className="nav-cart-number">99+</div>
            <div className="nav-cart-text">Cart</div>
          </div>
        </div>

        <div className="nav-profile-container">
          <div className="nav-gadget-icon-wrapper">
            <img className="nav-avatar-img" src={Avatar} />
          </div>
        </div>
      </div>

      {showSubMenu ? (
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
    </>
  );
}

export default MainNavBar;
