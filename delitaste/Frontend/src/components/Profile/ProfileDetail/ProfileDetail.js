import React, { Fragment, useState, useEffect } from "react";
import "./ProfileDetail.scss";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Avatar from "assets/avatar.jpg";
import Tag from "components/Commons/Tag/Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMars,
  faVenus,
  faCrown,
  faMinusCircle,
  faPlusCircle,
  faPlusSquare,
  faMinusSquare,
} from "@fortawesome/fontawesome-free-solid";
function ProfileDetail(props) {
  const { user } = props;
  const [showEditBI, setShowEditBI] = useState(true);
  const preference = ["Vegetarian", "Vegan", "Fastfood"];
  return (
    <Fragment>
      <div className="profile-pd-container">
        <div className="p-pd-header-wrapper">
          <div className="p-pd-header-profile-summary">
            <div className="p-pd-hp-s-profile-image">
              <img
                className="p-pd-hd-ps-image"
                alt="profile_image"
                src={Avatar}
              />
            </div>
            <div className="p-pd-hp-s-profile-info">
              <span className="p-pd-hp-s-pi-main-text">Sang Nguyen</span>
              <span className="u-pf-sb-pt-icon">
                <FontAwesomeIcon className="vip-customer" icon={faCrown} />
                <span className="u-pf-sb-pt-sub-text-type">Gold customer</span>
              </span>
              <span className="p-pd-hp-s-pi-sub-text">
                <b>Birthday:</b> 2022-04-12T17:00:00.000Z
              </span>
              <span className="p-pd-hp-s-pi-sub-text-medium">
                <b>Gender:</b> Male
                <FontAwesomeIcon className="mars-icon" icon={faMars} />
              </span>
              <span className="p-pd-hp-s-pi-sub-text">
                <b>Delivery address:</b> 399/36 Ly Thai To, ward 2, district 10,
                Ho Chi Minh city.
              </span>
              <span className="p-pd-hp-s-pi-sub-text-medium">
                <b>Preference:</b>
                {preference.map((tag, index) => (
                  <Tag
                    key={index}
                    margin={"0 0"}
                    tFontSize={"11px"}
                    height={"18px"}
                    text={tag}
                  />
                ))}
              </span>
            </div>
          </div>
        </div>
        <div className="p-pd-body-wrapper">
          <div className="p-pd-body-title">
            <FontAwesomeIcon
              className="p-pd-bt-icon"
              icon={showEditBI ? faMinusSquare : faPlusSquare}
              onClick={() => setShowEditBI((prev) => !prev)}
            />
            Basic Info
          </div>
          <div className="p-pd-body-profile-edit">Name: Nguyen Sang</div>
        </div>
        <div className="p-pd-footer-wrapper">c</div>
      </div>
    </Fragment>
  );
}

ProfileDetail.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(connect(mapStateToProps, null)(ProfileDetail));
