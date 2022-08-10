import { useState, useEffect, useRef, Fragment } from "react";
import withAuth from "components/HigherOrderComponents(HOC)/withAuth";
import { withRouter } from "react-router-dom";
import { connect, Provider } from "react-redux";
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
} from "@fortawesome/fontawesome-free-solid";
import Step1Image from "assets/order_progress/step1.gif";
import Step3Image from "assets/order_progress/step3.gif";
import Step4Image from "assets/order_progress/step4.gif";
import Step5Image from "assets/order_progress/step5.gif";
import axios from "axios";
const shipper = {
  name: "Terry Harrison",
  license_plate: "64B1 - 03663",
  rating: 5,
  profile_image:
    "https://pyxis.nymag.com/v1/imgs/231/dd4/b1d43dd12227a68877644b36e1b6c9850e-13-zayn-malik.rsquare.w330.jpg",
};

function OrderStatus(props) {
  const { user } = props;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { status } = props;
  const [showShipperChat, setShowShipperChat] = useState(false);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#910000");

  const completePickUp = async () => {
    try {
      const res = await axios.post("/v1/api/tastie/order/update_order_status", {
        order_code: props.match.params.order_code,
        status: 5, // completed
        shipper_id: null,
        update_at: new Date().toISOString(),
      });
      if (res.status) {
        props.setCompletedStatus(true);
        props.setCurrentStatus(5);
      }
    } catch (error) {
      console.error("Cannot update order status", error);
    }
  };
  const override = css`
    display: block;
    border-color: #910000;
    font-size: 14px;
    color: red;
  `;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  const stepImage = [
    Step1Image,
    Step1Image,
    Step3Image,
    Step4Image,
    Step5Image,
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
          {status >= 2 && props.orderSummary.delivery_mode === 1 && (
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
          {showShipperChat && props.orderSummary?.delivery_mode === 1 ? (
            <ChatBox
              shipper={shipper}
              message={message}
              setMessage={setMessage}
              messages={messages}
              setMessages={setMessages}
              socket={user.socket}
            />
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
                {props.orderSummary.delivery_mode !== 2
                  ? statusSubText[status - 1]
                  : "Check and come to the restaurant to pick up your order."}
              </div>{" "}
              {props.orderSummary.delivery_mode === 2 &&
                props.currentStatus === 3 && (
                  <ButtonGroup float="flex-start" mgTop={10} mgBottom={0}>
                    <Button
                      color={"white"}
                      bgColor={"#810000"}
                      justifyContent={"center"}
                      gap={"10px"}
                      width={180}
                      fontSize={14}
                      height={40}
                      label={`Complete order`}
                      onClick={() => completePickUp()}
                    />
                  </ButtonGroup>
                )}
              {props.orderSummary?.delivery_mode !== 2 ? (
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
              ) : (
                <span
                  style={{
                    marginTop: 15,
                    fontSize: 13,
                    fontStyle: "italic",
                    color: "#810000",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => props.setShowOrderDetail(true)}
                >
                  Order detail
                </span>
              )}
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
