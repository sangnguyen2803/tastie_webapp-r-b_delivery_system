import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faChevronDown } from "@fortawesome/fontawesome-free-solid";
import { Link } from "react-router-dom";
import "./SearchBar.css";

function NavBar() {
  return (
    <div className="search-bar-wrapper">
      <div className="search-bar-type">
        <div className="search-type-dropdown">
          <span className="search-type-text">Product</span>
          <FontAwesomeIcon className="nav-icon-prefix" icon={faChevronDown} />
        </div>
      </div>
      <input
        type="text"
        className="search-term"
        placeholder="What are you looking for?"
      />
      <div className="btn-search-wrapper">
        <FontAwesomeIcon className="search-icon" icon={faSearch} />
        <span className="btn-search-text">Search</span>
      </div>
    </div>
  );
}

export default NavBar;
