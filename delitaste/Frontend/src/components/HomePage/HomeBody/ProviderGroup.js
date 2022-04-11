import "./HomeBody.scss";
import { Fragment, useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CustomButtonGroup } from "./CustomButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

function ProviderGroup({
  groupTitle,
  groupDescription,
  providerList,
  history,
}) {
  const openTime = "23:00:00";
  const closeTime = "22:00:00";
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const handleOnClickProvider = (id) => {
    history.push(`/provider-detail/${id}`);
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
            customButtonGroup={
              <CustomButtonGroup>
                <span className="link-text">See more</span>
              </CustomButtonGroup>
            }
            renderButtonGroupOutside={true}
            customTransition={"transform 500ms ease-in-out"}
          >
            {providerList?.map((item) => (
              <Fragment>
                <div
                  className="provider-card-container"
                  onClick={() => handleOnClickProvider(item.provider_id)}
                  key={item.provider_id}
                  style={{
                    backgroundImage: `url(${item.profile_pic})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="provider-interaction-wrapper">
                    <FontAwesomeIcon
                      className="icon-for-liking"
                      style={{ zIndex: 1, marginTop: 5 }}
                      icon={faHeart1}
                    />
                    {!item.tag_name && (
                      <div className="provider-card-tag">
                        {item.tag_name || "3 orders until €5 reward"}
                      </div>
                    )}
                  </div>
                  {currentTime < closeTime && currentTime > openTime ? (
                    <figcaption className="figcaption-wrapper">
                      <div className="btn-schedule-wrapper">
                        <FontAwesomeIcon
                          icon={faCalendarPlus}
                          className="icon-btn"
                        />
                        <span>Schedule order</span>
                      </div>
                      <span className="a1-description">
                        Opens Saturday 2:15 PM
                      </span>
                    </figcaption>
                  ) : (
                    <Fragment></Fragment>
                  )}
                </div>

                <div className="product-info-wrapper">
                  <span className="p-info-main-text">{item.provider_name}</span>
                  <div className="p-info-rating">{item.rating || "5.0"}</div>
                </div>
                <div className="product-sub-info-wrapper">
                  <FontAwesomeIcon
                    icon={faGetPocket}
                    className="sub-info-icon"
                  />
                  &nbsp;•&nbsp;
                  <span className="p-sub-info-main-text">
                    {item.price_range}
                  </span>
                  &nbsp;•&nbsp;
                  <div className="p-sub-info-cooking-time">
                    {item.mean_estimated_cooking_time || "30-45 mins"}
                  </div>
                </div>
              </Fragment>
            ))}
          </Carousel>
        </div>
      </div>
    </Fragment>
  );
}

export default withRouter(ProviderGroup);