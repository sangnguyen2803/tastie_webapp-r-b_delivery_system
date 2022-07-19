import withAuth from "components/HigherOrderComponents(HOC)/withAuth";
import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Avatar from "assets/avatar.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faExchangeAlt,
  faGlobe,
  faHeart,
  faKey,
  faLanguage,
  faLock,
  faQuestionCircle,
  faSignLanguage,
  faThumbsUp,
  faUserCog,
} from "@fortawesome/fontawesome-free-solid";
import { Formik, Form, Field } from "formik";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import "./Favorites.scss";
import LazyLoad from "react-lazyload";
import { faHeart as faHeart2 } from "@fortawesome/fontawesome-free-solid";
import { faHeart as faHeart1 } from "@fortawesome/fontawesome-free-regular";
import { getFavoriteProvider } from "store/actions/UserAction/UserAction";
import { faGetPocket } from "@fortawesome/free-brands-svg-icons";
import Metric from "components/MerchantDashboard/DashboardFeatures/Metric/Metric";
import ProgressBar from "components/Commons/ProgressBar/ProgressBar";
import { faGrinHearts } from "@fortawesome/free-solid-svg-icons";
const LABEL_SIZE = 150;
const METRIC_HEIGHT = 140;
const initialValues1 = {
  oldPassword: "",
  newPassword: "",
  recheckPassword: "",
};

function Favorites(props) {
  const [favorites, setFavorites] = useState([]);
  const { user, getFavoriteProvider } = props;
  useEffect(() => {
    async function fetchingDataAPI() {
      const favorites = await getFavoriteProvider(
        user.profile?.user_id,
        user.currentAddress.latitude,
        user.currentAddress.longitude
      );
      console.log(favorites);
      if (favorites) setFavorites(favorites);
    }
    if (user.profile.user_id !== -1) fetchingDataAPI();
  }, [user.currentAddress]);
  const [showEditPassword, setShowEditPassword] = useState(true);
  const handleSubmitForm1 = async (values) => {
    console.log(values);
  };
  return (
    <Fragment>
      <div className="profile-pd-container">
        <div
          className="p-cp-title"
          style={{
            margin: "10px 0 0 0",
            alignSelf: "flex-start",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 10,
            fontSize: 16,
          }}
        >
          <FontAwesomeIcon
            icon={faHeart}
            style={{ color: "#303030", marginRight: 10 }}
          />
          <span>Favorites</span>
        </div>
        <div
          className="p-pd-body-wrapper"
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 10,
            width: "calc(100% - 25px)",
            paddingLeft: 25,
            margin: "10px 0",
          }}
        >
          <img src={Avatar} className="setting-head-img" alt="avatar" />
          <span className="setting-head-text">
            <span>
              <b>{props.user.profile?.email}</b>
            </span>
            <span
              onClick={() => props.history.push("/profile/edit")}
              style={{ fontSize: 12, cursor: "pointer", color: "#610000" }}
            >
              Go to edit profile
            </span>
          </span>
        </div>
        <div
          className="mkt-key-metrics-wrapper"
          style={{ height: 150, width: "98%" }}
        >
          <div
            className="promotion-progress-wrapper"
            style={{ height: METRIC_HEIGHT, border: "2px solid #eeeeee" }}
          >
            <div className="product-stock-quantity">
              {favorites.length} Favorite Stores
            </div>
            <div className="product-stock-quantity-description">
              Possible to add more {20 - favorites.length} stores.
            </div>
            <div className="product-progress-bar">
              <ProgressBar
                bgcolor="#940000"
                progress={favorites.length || 0}
                height="6px"
                length={20}
                text={" favorite stores"}
              />
            </div>
          </div>
          <Metric
            width={"100%"}
            height={METRIC_HEIGHT}
            radius={5}
            border={"2px solid #eeeeee"}
          >
            <span className="metric-title">
              Frequently place order
              <FontAwesomeIcon
                className="question-icon"
                icon={faQuestionCircle}
              />
            </span>
            <img
              src={favorites[0]?.profile_pic}
              height={80}
              width={80}
              style={{ borderRadius: 100, margin: "5px 0", objectFit: "cover" }}
              alt="provider_image"
            />
            <span className="apro-p-info-main-text">
              {favorites[1]?.provider_name || favorites[0]?.name}
            </span>
          </Metric>
        </div>
        <div className="p-pd-body-wrapper">
          <div className="p-pd-body-title">
            <span className="p-pd-title-text" style={{ width: 300 }}>
              <FontAwesomeIcon
                icon={faBookmark}
                style={{ color: "#303030", marginRight: 10 }}
              />
              <span>Favorite restaurant ({favorites.length}/20 stores)</span>
            </span>
          </div>
        </div>
        <div className="apro-home-product-slider-all-2">
          {favorites.map((item, index) => (
            <div
              className="apro-home-product-container-2"
              key={index}
              onClick={() =>
                props.history.push(`/provider-detail/${item.provider_id}`)
              }
            >
              <LazyLoad height={200} style={{ width: "100%" }}>
                <div
                  className="apro-provider-card-container"
                  style={{
                    height: 120,
                    backgroundImage: `url(${item.profile_pic})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                ></div>
              </LazyLoad>
              <div className="apro-product-info-wrapper">
                <span className="apro-p-info-main-text">
                  {item.provider_name || item.name}
                </span>
                <div className="apro-p-info-rating">{item.rating || "5.0"}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

Favorites.propTypes = {
  user: PropTypes.object.isRequired,
  getFavoriteProvider: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});

export default withRouter(
  withAuth(connect(mapStateToProps, { getFavoriteProvider })(Favorites))
);
