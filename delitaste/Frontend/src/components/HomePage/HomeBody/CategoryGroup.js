import "./HomeBody.scss";
import { Fragment, useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CustomButtonGroup } from "./CustomButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LazyLoad from "react-lazyload";
import {
  faCalendarPlus,
  faInfoCircle,
} from "@fortawesome/fontawesome-free-solid";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { faHeart as faHeart2 } from "@fortawesome/fontawesome-free-solid";
import { faHeart as faHeart1 } from "@fortawesome/fontawesome-free-regular";
import { faGetPocket } from "@fortawesome/free-brands-svg-icons";
import CategoryImage1 from "assets/category/dessert.png";
import CategoryImage2 from "assets/category/sandwich.png";
import CategoryImage3 from "assets/category/coffeeandtea.png";
import CategoryImage4 from "assets/category/american.png";
import CategoryImage5 from "assets/category/bread.png";
import CategoryImage6 from "assets/category/cake.png";
import CategoryImage7 from "assets/category/asian.png";
import CategoryImage8 from "assets/category/vegetable.png";
import CategoryImage9 from "assets/category/sushi.png";
import CategoryImage10 from "assets/category/chinese.png";
import CategoryImage11 from "assets/category/pizza.png";
import CategoryImage12 from "assets/category/sushi.png";
import ProviderGroupSkeleton from "components/Skeleton/ProviderGroupSkeleton";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const categories = [
  [
    {
      category_id: 1000038,
      type: 1,
      category_name: "Dessert",
      category_image: CategoryImage1,
    },
    {
      category_id: 1000008,
      type: 1,
      category_name: "Bakery",
      category_image: CategoryImage2,
    },
  ],
  [
    {
      category_id: 1000029,
      type: 1,
      category_name: "Coffee and Tea",
      category_image: CategoryImage3,
    },
    {
      category_id: 1000000,
      type: 2,
      category_name: "American",
      category_image: CategoryImage4,
    },
  ],
  [
    {
      category_id: 1000016,
      type: 1,
      category_name: "Bread",
      category_image: CategoryImage5,
    },
    {
      category_id: 1000021,
      type: 1,
      category_name: "Cake",
      category_image: CategoryImage6,
    },
  ],
  [
    {
      category_id: 1000001,
      type: 2,
      category_name: "Asian",
      category_image: CategoryImage7,
    },
    {
      category_id: 1000057,
      type: 1,
      category_name: "Vegetable",
      category_image: CategoryImage8,
    },
  ],
  [
    {
      category_id: 1000088,
      type: 1,
      category_name: "Pizza",
      category_image: CategoryImage11,
    },
    {
      category_id: 1000039,
      type: 2,
      category_name: "Dim-Sum",
      category_image: CategoryImage10,
    },
  ],
];

function CategoryGroup({ groupTitle, groupDescription, ...rest }) {
  const [loading, setLoading] = useState(true);
  const executeSearch = (id, type) => {
    rest.history.push(
      `/search?query=${""}&type=3&category-type=${type}&category-id=${id}`
    );
  };
  return (
    <Fragment>
      <div className="home-product-row-container">
        <div className="home-product-row-title">
          {groupTitle || "No title"}
          <FontAwesomeIcon className="sub-icon-title" icon={faInfoCircle} />
        </div>
        {groupDescription && (
          <span className="home-product-description">{groupDescription}</span>
        )}
        {loading ? (
          <div className="home-product-slider">
            <Carousel
              swipeable={false}
              draggable={false}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              keyBoardControl={true}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
              arrows={false}
              customButtonGroup={<CustomButtonGroup></CustomButtonGroup>}
              renderButtonGroupOutside={true}
              customTransition={"transform 500ms ease-in-out"}
            >
              {categories?.map((category, index) => (
                <div className="category-group-wrapper" key={index}>
                  <div
                    className="category-group-item"
                    onClick={() =>
                      executeSearch(category[0].category_id, category[0].type)
                    }
                  >
                    <LazyLoad
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        className="category-group-item-image"
                        src={category[0].category_image}
                        alt={"category_image"}
                      />
                    </LazyLoad>
                    <span className="category-group-item-text">
                      {category[0].category_name}
                    </span>
                  </div>
                  <div
                    className="category-group-item"
                    onClick={() =>
                      executeSearch(category[1].category_id, category[1].type)
                    }
                  >
                    <LazyLoad>
                      <img
                        className="category-group-item-image"
                        src={category[1].category_image}
                        alt={"category_image"}
                      />
                    </LazyLoad>
                    <span className="category-group-item-text">
                      {category[1].category_name}
                    </span>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        ) : (
          <ProviderGroupSkeleton col={4} />
        )}
      </div>
    </Fragment>
  );
}

export default withRouter(CategoryGroup);
