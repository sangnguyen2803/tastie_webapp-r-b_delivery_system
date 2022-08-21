import { Fragment } from "react";
import CategoryIcon1 from "../../../assets/CategoryIcon/Picture1.jpg";
import CategoryIcon2 from "../../../assets/CategoryIcon/Picture2.jpg";
import CategoryIcon3 from "../../../assets/CategoryIcon/Picture3.jpg";
import CategoryIcon4 from "../../../assets/CategoryIcon/Picture4.jpg";
import CategoryIcon5 from "../../../assets/CategoryIcon/Picture5.jpg";
import CategoryIcon6 from "../../../assets/CategoryIcon/Picture6.jpg";
import CategoryIcon7 from "../../../assets/CategoryIcon/Picture7.jpg";
import CategoryIcon8 from "../../../assets/CategoryIcon/Picture8.jpg";
import CategoryIcon9 from "../../../assets/CategoryIcon/Picture9.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/fontawesome-free-solid";
import "./CategoryList.css";
function CategoryList(props) {
  return (
    <Fragment>
      <div className="category-section">
        <span className="category-title">Market</span>
        <div className="category-section-row">
          <div className="pre-category-main">
            <div className="category-main-icon">
              <img src={CategoryIcon1} />
            </div>
            <span className="category-main-label">
              Organic Fruit & Vegetables
            </span>
          </div>
          <FontAwesomeIcon
            className="category-direct-icon"
            icon={faChevronRight}
          />
        </div>
        <div className="category-section-row">
          <div className="pre-category-main">
            <div className="category-main-icon">
              <img src={CategoryIcon2} />
            </div>
            <a className="category-main-label">Fast Food & Street Food </a>
          </div>
          <FontAwesomeIcon
            className="category-direct-icon"
            icon={faChevronRight}
          />
        </div>
        <div className="category-section-row">
          <div className="pre-category-main">
            <div className="category-main-icon">
              <img src={CategoryIcon3} />
            </div>
            <a className="category-main-label">Healthy & Nutritious Diets </a>
          </div>
          <FontAwesomeIcon
            className="category-direct-icon"
            icon={faChevronRight}
          />
        </div>
        <div className="category-section-row">
          <div className="pre-category-main">
            <div className="category-main-icon">
              <img src={CategoryIcon4} />
            </div>
            <a className="category-main-label">Refreshing Drinks, Beverage </a>
          </div>
          <FontAwesomeIcon
            className="category-direct-icon"
            icon={faChevronRight}
          />
        </div>
        <div className="category-section-row">
          <div className="pre-category-main">
            <div className="category-main-icon">
              <img src={CategoryIcon5} />
            </div>
            <a className="category-main-label">Meaty and Savory Dishes </a>
          </div>
          <FontAwesomeIcon
            className="category-direct-icon"
            icon={faChevronRight}
          />
        </div>
        <div className="category-section-row">
          <div className="pre-category-main">
            <div className="category-main-icon">
              <img src={CategoryIcon6} />
            </div>
            <a className="category-main-label">Sweets & Desserts, Icecream</a>
          </div>
          <FontAwesomeIcon
            className="category-direct-icon"
            icon={faChevronRight}
          />
        </div>
        <div className="category-section-row">
          <div className="pre-category-main">
            <div className="category-main-icon">
              <img src={CategoryIcon7} />
            </div>
            <a className="category-main-label">Noodles and Soups</a>
          </div>
          <FontAwesomeIcon
            className="category-direct-icon"
            icon={faChevronRight}
          />
        </div>
        <div className="category-section-row">
          <div className="pre-category-main">
            <div className="category-main-icon">
              <img src={CategoryIcon8} />
            </div>
            <a className="category-main-label">Pastry and Coffee</a>
          </div>
          <FontAwesomeIcon
            className="category-direct-icon"
            icon={faChevronRight}
          />
        </div>
        <div className="category-section-row">
          <div className="pre-category-main">
            <div className="category-main-icon">
              <img src={CategoryIcon9} />
            </div>
            <a className="category-main-label">Fish and Seafoods </a>
          </div>
          <FontAwesomeIcon
            className="category-direct-icon"
            icon={faChevronRight}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default CategoryList;
