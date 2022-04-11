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
import ReactMapGl, { Source, Layer, Marker, Popup } from "react-map-gl";
import axios from "axios";

function OrderTracking(props) {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100vh",
    latitude: 10.768685473523648,
    longitude: 106.68057155417674,
    zoom: 16,
  });
  const [departureCoordinates, setDepartureCoordinates] = useState([
    106.68057155417674, 10.768685473523648,
  ]);
  const [arrivalCoordinates, setArrivalCoordinates] = useState([
    106.68060027236189, 10.75909421616193,
  ]);
  const [routes, setRoutes] = useState([]);
  useEffect(() => {
    async function fetchingRoutesAndDirections() {
      const endpoint = `https://api.mapbox.com/directions/v5/mapbox/driving/${departureCoordinates[0]},${departureCoordinates[1]};${arrivalCoordinates[0]},${arrivalCoordinates[1]}?geometries=geojson&access_token=pk.eyJ1IjoiaG9hbmduYW0yNDMiLCJhIjoiY2t1dHJxdjdlMHg5ZDJwbnlpcmo0a2NnMiJ9.DUrlIOzvO6-kWt-VCKZW1g`;
      const res = await axios.get(endpoint);
      const points = res.data.routes[0].geometry.coordinates;
      points.unshift(departureCoordinates);
      points.push(arrivalCoordinates);
      setRoutes(points);
    }
    fetchingRoutesAndDirections();
  }, []);

  useEffect(() => {
    console.log(routes);
  }, [routes]);

  const [showPopup, togglePopup] = useState(false);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState(true);
  const [confirmedStatus, setConfirmedStatus] = useState(false);
  const [assignedStatus, setAssignedStatus] = useState(false);
  const [pickedStatus, setPickedStatus] = useState(false);
  const [completedStatus, setCompletedStatus] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const dataOne = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: routes,
    },
  };

  return (
    <Fragment>
      <NavBar fixed={true} />
      <div className="order-tracking-container">
        <div className="order-tracking-left-side">
          <ReactMapGl
            {...viewport}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            onViewportChange={(viewport) => setViewport(viewport)}
            mapboxApiAccessToken="pk.eyJ1IjoiaG9hbmduYW0yNDMiLCJhIjoiY2t1dHJxdjdlMHg5ZDJwbnlpcmo0a2NnMiJ9.DUrlIOzvO6-kWt-VCKZW1g"
          >
            <Source id="polylineLayer" type="geojson" data={dataOne}>
              <Layer
                id="lineLayer"
                type="line"
                source="my-data"
                layout={{
                  "line-join": "round",
                  "line-cap": "round",
                }}
                paint={{
                  "line-color": "rgba(3, 170, 238, 0.5)",
                  "line-width": 10,
                }}
              />
            </Source>
            <Marker
              latitude={departureCoordinates[1]}
              longitude={departureCoordinates[0]}
              offsetLeft={-20}
              offsetTop={-30}
            >
              <img
                alt="marker"
                onClick={() => togglePopup(true)}
                style={{ height: 30, width: 30 }}
                src="https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png"
              />
            </Marker>
            <Marker
              alt="marker"
              latitude={arrivalCoordinates[1]}
              longitude={arrivalCoordinates[0]}
              offsetLeft={-20}
              offsetTop={-30}
            >
              <img
                style={{ height: 30, width: 30 }}
                alt="marker"
                src="https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png"
              />
            </Marker>
          </ReactMapGl>
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