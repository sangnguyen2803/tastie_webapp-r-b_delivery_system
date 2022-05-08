import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faChevronDown } from "@fortawesome/fontawesome-free-solid";
import { useLocation, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./SearchBar.scss";

function NavBar(props) {
  const [search, setSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [categoryType, setCategoryType] = useState(1);
  const [categoryId, setCategoryId] = useState(1000001);
  const typeText = ["All", "Provider", "Product", "Category"];
  const executeSearch = () => {
    //if type search is not category search
    if (typeSearch !== 3) {
      props.history.push(`/search?q=${search}&type=${typeSearch}`);
      return;
    }
    props.history.push(
      `/search?q=${search}&type=${typeSearch}&ctype=${categoryType}&cid=${categoryId}`
    );
  };
  return (
    <div className="search-bar-wrapper">
      <div
        className="search-bar-type"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <div className="search-type-dropdown">
          <span className="search-type-text">{typeText[typeSearch]}</span>
          <FontAwesomeIcon className="nav-icon-prefix" icon={faChevronDown} />
        </div>
      </div>
      {showDropdown && (
        <div className="search-type-dropdown-show">
          <span
            className="search-type-drop-down-text"
            onClick={(e) => {
              setShowDropdown(false);
              setTypeSearch(1);
            }}
          >
            Provider
          </span>
          <span
            className="search-type-drop-down-text"
            onClick={(e) => {
              setShowDropdown(false);
              setTypeSearch(2);
            }}
          >
            Product
          </span>
          <span
            className="search-type-drop-down-text"
            onClick={(e) => {
              setShowDropdown(false);
              setTypeSearch(3);
            }}
          >
            Category
          </span>
        </div>
      )}

      <input
        type="text"
        className="search-term"
        placeholder="What are you looking for?"
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            executeSearch();
          }
        }}
      />
      <div className="btn-search-wrapper" onClick={() => executeSearch()}>
        <FontAwesomeIcon className="search-icon" icon={faSearch} />
        <span className="btn-search-text">Search</span>
      </div>
    </div>
  );
}

export default withRouter(NavBar);
