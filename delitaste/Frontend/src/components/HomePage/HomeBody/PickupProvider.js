import "./HomeBody.scss";
import { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CustomButtonGroup } from "./CustomButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LazyLoad from "react-lazyload";
import { faHeart as faHeart1 } from "@fortawesome/fontawesome-free-regular";
import {
  faHeart as faHeart2,
  faThumbsUp,
} from "@fortawesome/fontawesome-free-solid";
import {
  faCalendarPlus,
  faInfoCircle,
  faUtensils,
} from "@fortawesome/fontawesome-free-solid";
import { faGetPocket } from "@fortawesome/free-brands-svg-icons";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import Modal from "components/Commons/Overlay/Popup/Modal/Modal";
import ReactMapGl, {
  Source,
  Layer,
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
} from "react-map-gl";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1300 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1300, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
function PickupProvider(props) {
  const { history } = props;
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState({});
  const { providerList, providerNearby } = props;
  const openTime = "23:00:00";
  const closeTime = "22:00:00";
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const handleOnClickProvider = (e, id) => {
    e.stopPropagation();
    history.push(`/provider-detail/${id}`);
  };
  //map
  const [mapView, setMapView] = useState(false);
  const [popupLatitude, setPopupLatitude] = useState(10.773031146281017);
  const [popupLongitude, setPopupLongitude] = useState(106.7060806090524);
  const [viewport, setViewport] = useState({
    height: "550px",
    zoom: 14,
    latitude: props.currentLatitude,
    longitude: props.currentLongitude,
  });
  return (
    <Fragment>
      <div
        className="home-product-row-container provider-on-map"
        style={{
          backgroundImage: `url(https://d4p17acsd5wyj.cloudfront.net/eatsfeed/pickup-homefeed-carousel/pickupcarousel_desktopweb.svg)`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: 250,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "97%",
        }}
      >
        <div
          className="home-product-slider"
          style={{ width: "auto", marginLeft: 35, marginTop: 45 }}
        >
          <div
            className="home-product-row-title"
            style={{ fontSize: 32, fontWeight: 700 }}
          >
            Pick it up for free
          </div>
          <div
            className="home-product-row-title"
            style={{ fontSize: 14, fontWeight: 500 }}
          >
            Skip the fees when you order pickup
          </div>
          <ButtonGroup float="flex-start" mgTop={10}>
            <Button
              color={"white"}
              bgColor={"black"}
              justifyContent={"center"}
              gap={"10px"}
              width={100}
              fontSize={14}
              height={30}
              label={"See map"}
              onClick={() => setMapView(true)}
            />
          </ButtonGroup>
        </div>
        <div
          className="home-product-slider"
          style={{ width: "auto", marginTop: 30 }}
        >
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
            customTransition={"transform 500ms ease-in-out"}
          >
            {providerList?.map((item, index) => (
              <Fragment key={index}>
                <LazyLoad
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: "260px",
                    height: "180px",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <div
                    className="provider-card-container"
                    key={item.provider_id}
                    style={{
                      backgroundImage: `url(${item.profile_pic})`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      width: "250px",
                      height: "135px",
                    }}
                  >
                    <div className="provider-interaction-wrapper">
                      <FontAwesomeIcon
                        className="icon-for-liking"
                        style={{ zIndex: 1, marginTop: 5 }}
                        icon={faHeart2}
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
                  <div className="product-info-pos" style={{ width: "250px" }}>
                    <div className="product-info-wrapper">
                      <span className="p-info-main-text">
                        {item.provider_name}
                      </span>
                      <div className="p-info-rating">
                        {item.rating || "5.0"}
                      </div>
                    </div>
                    <div className="product-sub-info-wrapper">
                      <FontAwesomeIcon
                        icon={faGetPocket}
                        className="sub-info-icon"
                      />
                      &nbsp;•&nbsp;
                      <span className="p-sub-info-main-text">
                        $ {item.price_range}
                      </span>
                      &nbsp;•&nbsp;
                      <div className="p-sub-info-cooking-time">
                        {item.mean_estimated_cooking_time || "30 mins"}
                      </div>
                      &nbsp;•&nbsp;
                      <span className="p-sub-info-main-text">
                        {(item.distance / 1000).toFixed(2)} km
                      </span>
                    </div>
                  </div>
                </LazyLoad>
              </Fragment>
            ))}
          </Carousel>
        </div>
      </div>
      <Modal
        openModal={mapView}
        title={"Pick-up restaurant location"}
        width={80}
        height={650}
        transparent={0.2}
        closeModal={() => {
          setMapView(false);
        }}
      >
        <ReactMapGl
          transitionDuration={1000}
          {...viewport}
          width={"100%"}
          onViewportChange={(viewport) => setViewport(viewport)}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken="pk.eyJ1IjoiaG9hbmduYW0yNDMiLCJhIjoiY2t1dHJxdjdlMHg5ZDJwbnlpcmo0a2NnMiJ9.DUrlIOzvO6-kWt-VCKZW1g"
        >
          <FullscreenControl />
          <Marker
            latitude={props.currentLatitude}
            longitude={props.currentLongitude}
            offsetLeft={-20}
            offsetTop={-30}
          >
            <img
              alt="marker"
              style={{ height: 30, width: 30 }}
              src="https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png"
            />
          </Marker>
          {providerNearby.map((item, index) => (
            <Marker
              key={index}
              latitude={parseFloat(item.latitude)}
              longitude={parseFloat(item.longitude)}
              offsetLeft={-20}
              offsetTop={-30}
            >
              <FontAwesomeIcon
                className="provider-marker"
                icon={item.isFavorite ? faHeart2 : faUtensils}
                style={
                  item.isFavorite
                    ? { background: "#bd0000", padding: " 7px 7px" }
                    : {}
                }
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProvider(item);
                  setPopupLatitude(parseFloat(item.latitude));
                  setPopupLongitude(parseFloat(item.longitude));
                  setShowPopup(true);
                }}
              />
            </Marker>
          ))}
          {showPopup && (
            <Popup
              latitude={popupLatitude}
              longitude={popupLongitude}
              anchor="top"
              onClose={() => setShowPopup(false)}
            >
              <div
                key={selectedProvider.provider_id}
                onClick={(e) =>
                  handleOnClickProvider(e, selectedProvider.provider_id)
                }
              >
                <div
                  className="provider-card-container"
                  style={{
                    backgroundImage: `url(${selectedProvider.profile_pic})`,
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
                    {!selectedProvider.tag_name && (
                      <div className="provider-card-tag">
                        {selectedProvider.tag_name ||
                          "3 orders until €5 reward"}
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
                  )}{" "}
                </div>
                <div className="product-info-wrapper">
                  <span className="p-info-main-text">
                    {selectedProvider.provider_name}
                  </span>
                  <div className="p-info-rating">
                    {selectedProvider.rating || "5.0"}
                  </div>
                </div>
                <div className="product-sub-info-wrapper">
                  <FontAwesomeIcon
                    icon={faGetPocket}
                    className="sub-info-icon"
                  />
                  &nbsp;•&nbsp;
                  <span className="p-sub-info-main-text">
                    $ {selectedProvider.price_range}
                  </span>
                  &nbsp;•&nbsp;
                  <div className="p-sub-info-cooking-time">
                    {selectedProvider.mean_estimated_cooking_time || "30 mins"}
                  </div>
                  &nbsp;•&nbsp;
                  <span className="p-sub-info-main-text">
                    {(selectedProvider.distance / 1000).toFixed(2)} km
                  </span>
                </div>
              </div>
            </Popup>
          )}
        </ReactMapGl>
      </Modal>
    </Fragment>
  );
}

export default withRouter(PickupProvider);
