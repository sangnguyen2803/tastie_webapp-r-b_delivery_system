import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCaretRight,
  faChevronRight,
} from "@fortawesome/fontawesome-free-solid";
import { Link } from "react-router-dom";
import CategoryLevelOne from "./CategoryLevelOne";
import { getAllCategoryAPI } from "store/actions/CategoryAction/CategoryAction";
import "./CategoryDetail.scss";

function CategoryDetail({
  categoryContent,
  setCategoryContent,
  getAllCategoryAPI,
  setShowCategoryLevel2,
  showCategoryLevel2,
  ...rest
}) {
  const [categories, setCategories] = useState([]);
  const [categoryLevel2, setCategoryLevel2] = useState([]);
  const [featureIndex, setFeatureIndex] = useState(1);
  useEffect(() => {
    async function fetchAllCategory() {
      const result = await getAllCategoryAPI();
      setCategories(result);
    }
    fetchAllCategory();
  }, []);
  const [categoryLevelOneContent, setCategoryLevelOneContent] = useState({
    content: "item",
    enable: false,
  });

  if (categoryContent.enable) {
    return (
      <Fragment>
        <div className="category-display">
          <div className="left-category-dropdown">
            {Object.keys(categories).map(
              (key, index) =>
                key === "cuisine_category" && (
                  <Fragment key={index}>
                    <div
                      className="category-level-one"
                      onClick={() => {
                        setFeatureIndex(index);
                        setCategoryLevel2(categories[key]);
                        setShowCategoryLevel2(true);
                      }}
                      style={
                        featureIndex === index
                          ? {
                              backgroundColor: "#300000",
                              fontWeight: 700,
                              color: "#c59700",
                            }
                          : {}
                      }
                    >
                      <span className="category-name">
                        {key.replaceAll("_", " ")}
                      </span>
                      <FontAwesomeIcon
                        className={`${
                          featureIndex === index
                            ? "nav-icon-surfix-selected"
                            : "nav-icon-surfix"
                        }`}
                        icon={faCaretRight}
                      />
                    </div>
                  </Fragment>
                )
            )}
          </div>
          {showCategoryLevel2 && (
            <div className="left-category-dropdown-level-2">
              {categoryLevel2.map((item) => (
                <div
                  className="category-level-two"
                  onClick={() => {
                    rest.history.replace(
                      `/search?q=&type=3&category-type=2&category-id=${item.category_id}`
                    );
                    window.location.reload();
                  }}
                >
                  <span className="category-name">
                    {item.category_name.replaceAll("_", " ")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Fragment>
    );
  } else {
    return <></>;
  }
}

CategoryDetail.propTypes = {
  user: PropTypes.object.isRequired,
  getAllCategoryAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});

export default withRouter(
  connect(mapStateToProps, { getAllCategoryAPI })(CategoryDetail)
);
