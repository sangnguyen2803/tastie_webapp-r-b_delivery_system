import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Logo from "assets/sub-logo.png";
import "./MainNavBar.css";

function MainNavBar() {
  return (
    <>
      <div className="main-nav-menu-prefix">
        <img className="nav-logo" src={Logo} />
        <SearchBar />
      </div>
    </>
  );
}

export default MainNavBar;
