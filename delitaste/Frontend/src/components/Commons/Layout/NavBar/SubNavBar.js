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
import { scroller } from "react-scroll";
function SubNavBar(variant = true) {
  const [showCategoryLevel2, setShowCategoryLevel2] = useState(false);
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
              setShowCategoryLevel2(false);
            }}
          >
            <CategoryDetail
              setShowCategoryLevel2={setShowCategoryLevel2}
              showCategoryLevel2={showCategoryLevel2}
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
            <div
              className="nav-category"
              style={{ width: 120 }}
              onClick={() => {
                scroller.scrollTo("home-product-row-container", {
                  duration: 800,
                  delay: 0,
                  smooth: "easeInOutQuart",
                  offset: -100,
                });
              }}
            >
              <div className="nav-text"> Today's Offers</div>
            </div>
            <div className="nav-category" style={{ width: 120 }}>
              <div className="nav-text"> Recommend</div>
            </div>
            <div
              className="nav-category"
              onClick={() => {
                scroller.scrollTo("provider-on-map", {
                  duration: 800,
                  delay: 0,
                  smooth: "easeInOutQuart",
                  offset: -100,
                });
              }}
              style={{ width: 120 }}
            >
              <div className="nav-text"> Pick up for you</div>
            </div>
            <div
              className="nav-category"
              onClick={() => {
                scroller.scrollTo("apro-home-product-slider-all", {
                  duration: 800,
                  delay: 0,
                  smooth: "easeInOutQuart",
                  offset: -100,
                });
              }}
              style={{ width: 120 }}
            >
              <div className="nav-text">All stores</div>
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
