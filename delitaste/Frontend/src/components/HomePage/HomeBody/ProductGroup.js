import "./HomeBody.scss";
import { Fragment, useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CustomButtonGroup } from "./CustomButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faInfoCircle } from "@fortawesome/fontawesome-free-solid";
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

function ProductGroup({ groupTitle, groupDescription, productList }) {
  return (
    <Fragment>
      <div className="home-product-row-container">
        <div className="home-product-row-title">
          {groupTitle || "No title"}
          <FontAwesomeIcon className="sub-icon-title" icon={faInfoCircle} />
        </div>

        <div className="home-product-slider">
          <Carousel
            swipeable={false}
            draggable={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            keyBoardControl={true}
            customTransition="all .5"
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            arrows={false}
            customButtonGroup={
              <CustomButtonGroup>
                {groupDescription && (
                  <span className="home-product-description">
                    {groupDescription}
                  </span>
                )}
              </CustomButtonGroup>
            }
            renderButtonGroupOutside={true}
            customTransition="transform 500ms ease-in-out"
          >
            {productList.map((item) => (
              <div
                className="provider-card-container"
                style={{
                  backgroundImage: `url(${item.product_photo})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></div>
            ))}
          </Carousel>
        </div>
      </div>
    </Fragment>
  );
}

export default ProductGroup;
