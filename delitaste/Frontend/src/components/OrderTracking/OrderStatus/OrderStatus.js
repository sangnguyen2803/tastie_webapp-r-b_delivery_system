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
  faCartPlus,
} from "@fortawesome/fontawesome-free-solid";
import Step1Image from "assets/order_progress/step1.gif";
function OrderStatus(props) {
  const { status } = props;
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
                width={160}
                fontSize={14}
                height={40}
                label={`Show order details`}
                onClick={() => props.setShowOrderDetail(true)}
              />
            </ButtonGroup>
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
