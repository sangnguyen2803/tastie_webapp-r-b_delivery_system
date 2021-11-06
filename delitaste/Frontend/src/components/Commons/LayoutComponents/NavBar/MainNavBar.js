import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/fontawesome-free-solid";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Logo from "assets/sub-logo.png";
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
      </div>

      {showSubMenu ? (
        <div className="nav-feature-2">
          <div className="category-feature-wrapper">
            <a class="nav-text">Today's Deals</a>
          </div>
          <div className="category-feature-wrapper">
            <a class="nav-text">Today's Deals</a>
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
