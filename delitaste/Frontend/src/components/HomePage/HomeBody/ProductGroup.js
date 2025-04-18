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
  faStar,
} from "@fortawesome/fontawesome-free-solid";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { faHeart as faHeart2 } from "@fortawesome/fontawesome-free-solid";
import { faHeart as faHeart1 } from "@fortawesome/fontawesome-free-regular";
import { faGetPocket } from "@fortawesome/free-brands-svg-icons";
import DefaultImage from "assets/SlideShowImg/Picture1.jpg";
// skeleton
import ProviderGroupSkeleton from "components/Skeleton/ProviderGroupSkeleton";
// favorite
import {
  addFavoriteProvider,
  removeFavoriteProvider,
} from "store/actions/UserAction/UserAction";
import { propTypes } from "react-map-gl-geocoder";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 6,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1200, min: 464 },
    items: 4,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

function ProductGroup({
  groupTitle,
  groupDescription,
  providerList,
  setProviderList,
  history,
  ...rest
}) {
  const [loading, setLoading] = useState(false);
  const openTime = "23:00:00";
  const closeTime = "22:00:00";
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const changeFavorite = async (isFavorite, pid, e) => {
    e.stopPropagation();
    if (rest.user.profile?.user_id === -1 || !pid) return;
    if (isFavorite === true) {
      let status = await rest.removeFavoriteProvider(
        rest.user.profile.user_id,
        pid
      );
      setProviderList((prevState) =>
        prevState.map((item) =>
          item.provider_id === pid ? { ...item, isFavorite: false } : item
        )
      );
      if (status) console.log("successfully removed from favorite list");
      return;
    }
    let status = await rest.addFavoriteProvider(rest.user.profile.user_id, pid);
    if (status) {
      setProviderList((prevState) =>
        prevState.map((item) =>
          item.provider_id === pid ? { ...item, isFavorite: true } : item
        )
      );
      return;
    }
  };
  const handleOnClickProvider = (e, id) => {
    e.stopPropagation();
    history.push(`/provider-detail/${id}`);
  };
  useEffect(() => {
    if (providerList?.length) setLoading(true);
  }, [providerList]);

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
              customButtonGroup={
                <CustomButtonGroup>
                  <span className="link-text">See more</span>
                </CustomButtonGroup>
              }
              renderButtonGroupOutside={true}
              customTransition={"transform 500ms ease-in-out"}
            >
              {providerList?.map((item, index) => (
                <div
                  key={index}
                  onClick={(e) => {
                    handleOnClickProvider(e, item.product_infor.provider_id);
                    localStorage.setItem(
                      "target_product",
                      item.product_infor.product_id
                    );
                  }}
                >
                  <LazyLoad style={{ width: "100%" }}>
                    <div
                      className="product-card-container"
                      style={{
                        backgroundImage: `url(${
                          item.product_infor?.product_image || DefaultImage
                        })`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                    ></div>
                  </LazyLoad>

                  <div className="r-product-info-wrapper">
                    <span className="r-p-info-main-text">
                      {item.product_infor?.product_name}
                    </span>
                  </div>
                  <div className="r-product-sub-info-wrapper">
                    <span className="p-sub-info-main-text">
                      $ {item.product_infor?.price.toFixed(2)}
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

ProductGroup.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  addFavoriteProvider: PropTypes.func.isRequired,
  removeFavoriteProvider: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(
  connect(mapStateToProps, { addFavoriteProvider, removeFavoriteProvider })(
    ProductGroup
  )
);
