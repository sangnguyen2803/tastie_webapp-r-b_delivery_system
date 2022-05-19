import { useState, useEffect, useRef, Fragment } from "react";
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
import ChatBox from "./ChatBox";
import {
  faExclamationCircle,
  faTimes,
  faCommentDots,
  faPaperclip,
  faImage,
  faCheckCircle,
} from "@fortawesome/fontawesome-free-solid";
import Step1Image from "assets/order_progress/step1.gif";
import Step3Image from "assets/order_progress/step3.gif";
import Step4Image from "assets/order_progress/step4.gif";
import Step5Image from "assets/order_progress/step5.gif";
import { faPhotoVideo } from "@fortawesome/free-solid-svg-icons";
import Avatar from "assets/avatar.jpg";
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

  const stepImage = [
    Step1Image,
    Step1Image,
    Step3Image,
    Step4Image,
    Step5Image,
  ];
  const waitingMessage = [
    "Order received. Working on it right now...",
    "Shipper assigned. Waiting for the restaurant order's confirmation.",
    "Restaurant confirmed. Shipper is on the way to the restaurant",
    "Shipper's on the way to pick up your order. Please wait for a while.",
    "Order completed",
    "Order canceled",
  ];

  const statusMainText = [
    "Order submitted",
    "Shipper assigned",
    "Restaurant confirmed",
    "Delivering",
    "Order delivered",
    "Order canceled",
  ];
  const statusSubText = [
    "Your order has been placed.",
    "Shipper is taking care of your order.",
    "Restaurant has confirmed your order and preparing for your dishes.",
    "Shipper has your order. You'll get an alert when it's at your door.",
    "Your order has been completed. Enjoy your meal.",
    "Order canceled",
  ];

  return (
    <Fragment>
      <div className="or-st-container" style={{ marginBottom: 20 }}>
        <Fragment>
          <div className="or-st-head-bar">
            <span className="or-st-waiting">{waitingMessage[status - 1]}</span>
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
          {status >= 2 && (
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
                  onClick={() => setShowShipperChat((prev) => !prev)}
                />
              </div>
            </div>
          )}
          {showShipperChat ? (
            <ChatBox shipper={shipper} />
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
                style={status === 1 ? { marginTop: 67 } : {}}
                className="or-st-image"
                src={stepImage[status - 1]}
                width={300}
                alt="step_1"
              />
              <div className="or-st-head-wrapper">
                {statusMainText[status - 1]}
              </div>
              <div className="or-st-body-wrapper">
                {statusSubText[status - 1]}
              </div>
              <ButtonGroup float="flex-start" mgTop={10} mgBottom={0}>
                <Button
                  color={"white"}
                  bgColor={"#2c2c2c"}
                  justifyContent={"center"}
                  gap={"10px"}
                  width={120}
                  fontSize={14}
                  height={35}
                  label={`Delivery detail`}
                  onClick={() => props.setShowOrderDetail(true)}
                />
              </ButtonGroup>
            </Fragment>
          )}
        </Fragment>
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
