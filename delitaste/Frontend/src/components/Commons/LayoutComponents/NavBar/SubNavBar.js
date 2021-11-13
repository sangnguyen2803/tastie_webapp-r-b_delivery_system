import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronUp,
  faChevronDown,
  faGlobe,
  faDollarSign,
  faQuestionCircle,
} from "@fortawesome/fontawesome-free-solid";
import CategoryDetail from "./CategoryDetail";
import "./SubNavBar.scss";

function SubNavBar(variant = true) {
  const [categoryContent, setCategoryContent] = useState({
    content: "item",
    enable: false,
  });
  const [dropdownStatus, setDropdownStatus] = useState(
    variant ? faChevronUp : faChevronDown
  );

  const useEffect = () => {
    setCategoryContent({ ...CategoryDetail, content: { clothes: {} } });
  };
  return (
    <>
      <div className="nav-wrapper">
        <div className="nav-menu-prefix">
          <div
            className="nav-category-main"
            onMouseEnter={() => {
              setDropdownStatus(faChevronUp);
              setCategoryContent({ ...categoryContent, enable: true });
            }}
            onMouseLeave={() => {
              setDropdownStatus(faChevronDown);
              setCategoryContent({ ...categoryContent, enable: false });
            }}
          >
            <CategoryDetail
              categoryContent={categoryContent}
              setCategoryContent={setCategoryContent}
            />
            <div className="head-sub-nav-item">
              <FontAwesomeIcon className="nav-icon-prefix" icon={faBars} />
              <div className="nav-text"> Category </div>
              <FontAwesomeIcon
                className="nav-icon-surfix"
                icon={dropdownStatus}
              />
            </div>
          </div>
          <div className="nav-feature-1">
            <div className="nav-category">
              <div className="nav-text"> Today's Deals </div>
            </div>
            <div className="nav-category">
              <div className="nav-text"> Trendings </div>
            </div>
            <div className="nav-category">
              <div className="nav-text"> W-Cuisine </div>
            </div>
            <div className="nav-category">
              <div className="nav-text"> Pre-order </div>
            </div>
          </div>
        </div>

        <div className="nav-menu-surfix">
          <div className="nav-category">
            <div className="nav-category-item">
              <FontAwesomeIcon
                className="nav-icon-prefix"
                icon={faQuestionCircle}
              />
              <div className="nav-text"> Help</div>
            </div>
          </div>
          <div className="nav-category">
            <div className="nav-category-item">
              <FontAwesomeIcon
                className="nav-icon-prefix"
                icon={faDollarSign}
              />
              <div className="nav-text"> Currency</div>
            </div>
          </div>
          <div className="nav-category">
            <div className="nav-category-item">
              <FontAwesomeIcon className="nav-icon-prefix" icon={faGlobe} />
              <div className="nav-text"> Region</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(SubNavBar);

/*
<div
            className="nav-category-main"
            onMouseOver={() => {
              setDropdownStatus(faChevronUp);
              setCategoryContent({ ...categoryContent, enable: true });
            }}
            onMouseLeave={() => {
              setDropdownStatus(faChevronDown);
              setCategoryContent({ ...categoryContent, enable: false });
            }}
          >
            <div className="nav-category-item">
              <FontAwesomeIcon
                className="nav-icon-prefix"
                icon={faDollarSign}
              />
              <div className="nav-text"> Currency</div>
              <FontAwesomeIcon
                className="nav-icon-surfix"
                icon={dropdownStatus}
              />
            </div>
          </div>
*/
