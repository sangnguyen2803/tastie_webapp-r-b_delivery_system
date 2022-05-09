import { useState, useEffect, Fragment } from "react";
import withAuth from "components/HigherOrderComponents(HOC)/withAuth";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { css } from "@emotion/react";
import Loader from "react-spinners/BeatLoader";
import PropTypes from "prop-types";
import "./OrderStatus.scss";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faTimes,
  faCommentDots,
  faPaperclip,
  faImage,
} from "@fortawesome/fontawesome-free-solid";
import Step1Image from "assets/order_progress/step1.gif";
import { faPhotoVideo } from "@fortawesome/free-solid-svg-icons";

const shipper = {
  name: "Terry Harrison",
  license_plate: "64B1 - 03663",
  rating: 5,
  profile_image:
    "https://pyxis.nymag.com/v1/imgs/231/dd4/b1d43dd12227a68877644b36e1b6c9850e-13-zayn-malik.rsquare.w330.jpg",
};

function OrderStatus(props) {
  const { status } = props;
  const [showShipperChat, setShowShipperChat] = useState(false);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#910000");
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  const override = css`
    display: block;
    border-color: #910000;
    font-size: 14px;
    color: red;
  `;
  return (
    <Fragment>
      <div className="or-st-container" style={{ marginBottom: 20 }}>
        {status === 1 && (
          <Fragment>
            <div className="or-st-head-bar">
              <span className="or-st-waiting">
                Order received. Working on it right now...
              </span>
              <div className="or-st-spinner">
                <Loader
                  color={color}
                  loading={loading}
                  css={override}
                  size={10}
                  margin={2}
                  speedMultiplier={0.8}
                />
              </div>
            </div>
            <span className="or-st-pre-body">
              Latest arrival by 10:55am
              <FontAwesomeIcon
                className="or-st-icon"
                icon={faExclamationCircle}
              />
            </span>
            <img
              className="or-st-image"
              src={Step1Image}
              width={300}
              alt="step_1"
            />
            <div className="or-st-head-wrapper">Order submitted</div>
            <div className="or-st-body-wrapper">
              Your order from Fancy Grill has been placed.
            </div>
            <ButtonGroup float="flex-start" mgTop={10} mgBottom={0}>
              <Button
                color={"white"}
                bgColor={"#2c2c2c"}
                justifyContent={"center"}
                gap={"10px"}
                width={120}
                fontSize={14}
                height={40}
                label={`Delivery detail`}
                onClick={() => props.setShowOrderDetail(true)}
              />
            </ButtonGroup>
          </Fragment>
        )}
        {status === 2 && (
          <Fragment>
            <div className="or-st-head-bar">
              <span className="or-st-waiting">
                We found a shipper for you ! Please wait for a while
              </span>
              <div className="or-st-spinner">
                <Loader
                  color={color}
                  loading={loading}
                  css={override}
                  size={10}
                  margin={2}
                  speedMultiplier={0.8}
                />
              </div>
            </div>
            <div className="or-st-shipper">
              <img
                className="or-st-shipper-image"
                src={shipper.profile_image}
                width={300}
                alt="shipper_profile_image"
              />
              <div className="or-st-shipper-text-wrapper">
                <span className="or-st-sh-main-text">{shipper.name}</span>
                <span className="or-st-sh-sub-text">
                  {shipper.license_plate}
                </span>
              </div>
              <div className="or-st-shipper-communication">
                <FontAwesomeIcon
                  className="shipper-chat-icon"
                  icon={showShipperChat ? faTimes : faCommentDots}
                  onClick={() => setShowShipperChat(true)}
                />
              </div>
            </div>
            {showShipperChat ? (
              <Fragment>
                <span className="or-st-pre-body">
                  <div className="or-st-ship-conversation">
                    <span className="or-st-chat-item-client">
                      Can you please confirm this order, and make sure the
                      address is correct?
                    </span>
                    <span className="or-st-chat-item-server">
                      Sure, thank you
                    </span>
                  </div>
                  <div className="or-st-ship-chat-bar">
                    <input className="or-st-chat-content" name="chat" />
                    <div className="or-st-chat-submit">Send</div>
                  </div>
                </span>
              </Fragment>
            ) : (
              <Fragment>
                <span className="or-st-pre-body">
                  Latest arrival by 10:55am
                  <FontAwesomeIcon
                    className="or-st-icon"
                    icon={faExclamationCircle}
                  />
                </span>
                <img
                  className="or-st-image"
                  src={Step1Image}
                  width={300}
                  alt="step_1"
                />
                <div className="or-st-head-wrapper">Order submitted</div>
                <div className="or-st-body-wrapper">
                  Your order from Fancy Grill has been placed.
                </div>
                <ButtonGroup float="flex-start" mgTop={10} mgBottom={0}>
                  <Button
                    color={"white"}
                    bgColor={"#2c2c2c"}
                    justifyContent={"center"}
                    gap={"10px"}
                    width={120}
                    fontSize={14}
                    height={40}
                    label={`Delivery detail`}
                    onClick={() => props.setShowOrderDetail(true)}
                  />
                </ButtonGroup>
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

OrderStatus.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(
  withAuth(connect(mapStateToProps, null)(OrderStatus))
);
