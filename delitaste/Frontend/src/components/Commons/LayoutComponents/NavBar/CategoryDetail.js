import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronRight } from "@fortawesome/fontawesome-free-solid";
import { Link } from "react-router-dom";
import CategoryLevelOne from "./CategoryLevelOne";
import "./CategoryDetail.css";

function CategoryDetail({ categoryContent, setCategoryContent }) {
  const [categoryLevelOneContent, setCategoryLevelOneContent] = useState({
    content: "item",
    enable: false,
  });
  if (categoryContent.enable) {
    return (
      <div className="category-display">
        <div className="left-category-dropdown">
          <div className="category-level-one">
            <span className="category-name">Accessories/Jewels&Gems</span>
            <FontAwesomeIcon
              className="nav-icon-surfix"
              icon={faChevronRight}
            />
          </div>
          <div className="category-level-one">
            <span className="category-name">Electronic devices/Appliance</span>
            <FontAwesomeIcon
              className="nav-icon-surfix"
              icon={faChevronRight}
            />
          </div>
          <div className="category-level-one">
            <span className="category-name">Accessories/Jewels</span>
            <FontAwesomeIcon
              className="nav-icon-surfix"
              icon={faChevronRight}
            />
          </div>
          <div className="category-level-one">
            <span className="category-name">Accessories/Jewels</span>
            <FontAwesomeIcon
              className="nav-icon-surfix"
              icon={faChevronRight}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default CategoryDetail;
