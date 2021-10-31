import "./MainContent.css";
import { Fragment } from "react";
import CategoryBanner from "./CategoryBanner";
import CategoryList from "./CategoryList";
import Banner1 from "../../../assets/CategoryBanner/Picture1.jpg";
import Banner2 from "../../../assets/CategoryBanner/Picture2.jpg";
import Banner3 from "../../../assets/CategoryBanner/Picture3.jpg";
import Banner4 from "../../../assets/CategoryBanner/Picture4.jpg";
import Banner5 from "../../../assets/CategoryBanner/Picture5.jpg";
import { Carousel } from "react-carousel-minimal";
import Discount1 from "../../../assets/DiscountBanner/Picture1.jpg";
import Discount2 from "../../../assets/DiscountBanner/Picture2.jpg";
import ProviderList from "./ProviderList/ProviderList";
function MainContent(props) {
  return (
    <Fragment>
      <div className="main-content-wrapper">
        <div className="category-banner-wrapper">
          <CategoryList />
          <div className="category-carousel">
            <div className="discount-banner-wrapper">
              <div className="first-discount-banner">
                <img src={Discount1} />
              </div>
              <div className="second-discount-banner">
                <img src={Discount2} />
              </div>
            </div>
            <CategoryBanner
              cat_banner={[Banner1, Banner2, Banner3, Banner4, Banner5]}
            />
          </div>
        </div>
      </div>
      <div className="main-content-wrapper">
        <span className="main-head-title">Most Popular</span>
        <div className="most-popular-wrapper">
          <ProviderList />
        </div>
      </div>

      <div className="main-content-wrapper">
        <span className="main-head-title">Weekly Best-seller</span>
        <div className="most-popular-wrapper">
          <ProviderList />
        </div>
      </div>

      <div className="main-content-wrapper">
        <span className="main-head-title">Recommendation For You</span>
      </div>
    </Fragment>
  );
}

export default MainContent;
