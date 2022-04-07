import withAuth from "components/HigherOrderComponents(HOC)/withAuth";
import NavBar from "../Commons/Layout/NavBar/NavBar";
import Footer from "../Commons/Layout/Footer/Footer";
import React, { Fragment, useState, useEffect } from "react";
import ToolBar from "../Commons/Layout/Toolbar/Toolbar";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import "./OrderTracking.scss";
import Map from "components/HigherOrderComponents(HOC)/Map/Map";
import { faCartPlus } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrderStatus from "components/OrderTracking/OrderStatus/OrderStatus";
import OTOrderDetail from "components/OrderTracking/OTOrderDetail/OTOrderDetail";

const key = "AIzaSyDRXvYbjscujWed7pBPKRGCIsmx922HTJI";
function OrderTracking(props) {
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState(true);
  const [confirmedStatus, setConfirmedStatus] = useState(false);
  const [assignedStatus, setAssignedStatus] = useState(false);
  const [pickedStatus, setPickedStatus] = useState(false);
  const [completedStatus, setCompletedStatus] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  return (
    <Fragment>
      <NavBar fixed={true} />
      <div className="order-tracking-container">
        <div className="order-tracking-left-side">
          <Map
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={
              <div
                style={{
                  height: `100vh`,
                  margin: `auto`,
                }}
              />
            }
            latitude={10.762622}
            longitude={106.660172}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
        <div className="order-tracking-right-side">
          <div className="order-status-container">
            <div className="order-status-timing">
              <div className="or-s-main-text">14</div>
              <div className="or-s-sub-text">mins</div>
            </div>
            <div className="order-status-header">
              <span className="or-s-main-text-header">
                Fancy Grill - District 2
              </span>
              <span className="or-s-sub-text-header">
                Total: <span className="highlight-main-text">$ 24.60 </span> "(2
                items)"
              </span>
              <span className="or-s-sub-text-header">
                Delivery estimated:{" "}
                <span className="highlight-main-text">2021-06-04 16:30 </span>
              </span>
              <ButtonGroup float="flex-start" mgTop={10} mgBottom={0}>
                <Button
                  color={"black"}
                  bglight={true}
                  border={"#5d5d5d 1.5px solid"}
                  prefix={
                    <FontAwesomeIcon
                      className="button-icon"
                      icon={faCartPlus}
                    />
                  }
                  justifyContent={"center"}
                  gap={"10px"}
                  width="130px"
                  height={30}
                  label="Order Detail"
                  onClick={() => setShowOrderDetail(true)}
                />
              </ButtonGroup>
            </div>
          </div>
          <div className="or-s-stepper-wrapper">
            <div className="or-s-stepper-node">
              <span className="or-s-stepper-node-index">1</span>
              <span className="or-s-stepper-node-title">Submitted</span>
            </div>
            <div className="or-s-stepper-line"></div>
            <div className="or-s-stepper-node">
              <span className="or-s-stepper-node-index">2</span>
              <span className="or-s-stepper-node-title">Assigning</span>
            </div>
            <div className="or-s-stepper-line"></div>
            <div className="or-s-stepper-node">
              <span className="or-s-stepper-node-index">3</span>
              <span className="or-s-stepper-node-title">Confirmed</span>
            </div>
            <div className="or-s-stepper-line"></div>
            <div className="or-s-stepper-node">
              <span className="or-s-stepper-node-index">4</span>
              <span className="or-s-stepper-node-title">Picked</span>
            </div>
            <div className="or-s-stepper-line"></div>
            <div className="or-s-stepper-node">
              <span className="or-s-stepper-node-index">5</span>
              <span className="or-s-stepper-node-title">Completed</span>
            </div>
          </div>
          <OTOrderDetail
            showOrderDetail={showOrderDetail}
            setShowOrderDetail={setShowOrderDetail}
          />
        </div>
      </div>
      <Footer />
      <ToolBar />
    </Fragment>
  );
}

OrderTracking.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(
  withAuth(connect(mapStateToProps, null)(OrderTracking))
);
