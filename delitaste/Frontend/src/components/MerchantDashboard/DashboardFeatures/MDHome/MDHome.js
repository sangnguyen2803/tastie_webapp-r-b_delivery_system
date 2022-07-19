import { Fragment, useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk, faImage } from "@fortawesome/fontawesome-free-solid";
import Switch from "react-switch";
import { Formik, ErrorMessage, Form, Field } from "formik";
import "./MDHome.scss";
import { faSearch } from "@fortawesome/fontawesome-free-solid";
import PropTypes from "prop-types";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import Button from "components/Commons/Button/Button";
import Metric from "../Metric/Metric";
import ProgressBar from "components/Commons/ProgressBar/ProgressBar";
import { getProductListAPI } from "store/actions/ProductAction/ProductAction";
import Tabs from "../Tabs";
import MDHeader from "components/MerchantDashboard/MDHeader/MDHeader";

import Modal from "components/Commons/Overlay/Popup/Modal/Modal";
import ReactMapGl, { Source, Layer, Marker, Popup } from "react-map-gl";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";

function MDHome(props) {
  const { user, provider } = props;
  const [mapView, setMapView] = useState(false);
  const [viewport, setViewport] = useState({
    height: "350px",
    zoom: 16,
  });
  const [restaurantStatus, setRestaurantStatus] = useState(1);
  const [checkedSunday, setCheckedSunday] = useState(true);
  const [checkedMonday, setCheckedMonday] = useState(true);
  const [checkedTuesday, setCheckedTuesday] = useState(true);
  const [checkedWednesday, setCheckedWednesday] = useState(true);
  const [checkedThursday, setCheckedThursday] = useState(true);
  const [checkedFriday, setCheckedFriday] = useState(true);
  const [checkedSaturday, setCheckedSaturday] = useState(true);

  const handleSubmitForm = (values) => {
    console.log(values);
    console.log(restaurantStatus);
  };

  return (
    <Fragment>
      <div
        className="panel-detail-wrapper"
        style={{ height: "auto", marginTop: "0px" }}
      >
        <MDHeader visible={true} setMapView={setMapView} />

        {provider.operation.length !== 0 && (
          <Formik
            initialValues={{
              operating: {
                sunday: {
                  openTime:
                    provider?.operation?.sunday?.open_time || "00:00:00",
                  closeTime:
                    provider?.operation?.sunday?.close_time || "23:59:59",
                },
                monday: {
                  openTime:
                    provider?.operation?.monday?.open_time || "00:00:00",
                  closeTime:
                    provider?.operation?.monday?.close_time || "23:59:59",
                },
                tuesday: {
                  openTime:
                    provider?.operation?.tuesday?.open_time || "00:00:00",
                  closeTime:
                    provider?.operation?.tuesday?.close_time || "23:59:59",
                },
                wednesday: {
                  openTime:
                    provider?.operation?.wednesday?.open_time || "00:00:00",
                  closeTime:
                    provider?.operation?.wednesday?.close_time || "23:59:59",
                },
                thursday: {
                  openTime:
                    provider?.operation?.thursday?.open_time || "00:00:00",
                  closeTime:
                    provider?.operation?.thursday?.close_time || "23:59:59",
                },
                friday: {
                  openTime:
                    provider?.operation?.friday?.open_time || "00:00:00",
                  closeTime:
                    provider?.operation?.friday?.close_time || "23:59:59",
                },
                saturday: {
                  openTime:
                    provider?.operation?.saturday?.open_time || "00:00:00",
                  closeTime:
                    provider?.operation?.saturday?.close_time || "23:59:59",
                },
              },
              ect: provider.provider.estimated_cooking_time,
            }}
            validateOnChange={false}
          >
            {(formikProps) => {
              const { values, errors, touched } = formikProps;
              return (
                <Form className="pro-gen-container-body">
                  <div
                    className="pro-gen-body-row"
                    style={{ margin: "0px 0 0px 0" }}
                  >
                    <div className="pro-gen-label-input" style={{ width: 180 }}>
                      Restaurant status:{" "}
                    </div>
                  </div>
                  <div className="mkt-section-sub-text">
                    Restaurant status will be changed by these options or
                    automatically changed depending on restaurant's operation
                    time.
                  </div>
                  <div
                    className="pro-gen-body-row"
                    style={{ margin: "0px 0 0px 0" }}
                  >
                    <label className="pro-gen-radio-wrapper radio">
                      <input
                        type="radio"
                        name="status"
                        defaultChecked={provider.provider?.status === 1}
                        value={1}
                        onChange={(e) => setRestaurantStatus(e.target.value)}
                      />
                      <span className="hb-sb-label-radio">Open</span>
                    </label>
                    <label className="pro-gen-radio-wrapper radio">
                      <input
                        type="radio"
                        name="status"
                        defaultChecked={provider.provider?.status == 2}
                        value={2}
                        onChange={(e) => setRestaurantStatus(e.target.value)}
                      />
                      <span className="hb-sb-label-radio">Closed</span>
                    </label>
                    <label className="pro-gen-radio-wrapper radio">
                      <input
                        type="radio"
                        name="status"
                        defaultChecked={provider.provider?.status == 3}
                        value={3}
                        onChange={(e) => setRestaurantStatus(e.target.value)}
                      />
                      <span className="hb-sb-label-radio">
                        Busy (stop receiving orders)
                      </span>
                    </label>
                  </div>

                  <div
                    className="pro-gen-body-row"
                    style={{ margin: "0px 0 0px 0" }}
                  >
                    <div className="pro-gen-label-input" style={{ width: 180 }}>
                      Estimated cooking time:{" "}
                    </div>
                  </div>
                  <Field
                    type="text"
                    name="ect"
                    className="p-pd-b-iu-input-general"
                    style={{ height: 28, textIndent: 10, width: "300px" }}
                    placeholder={"Cooking time"}
                  />

                  <div
                    className="pro-gen-body-row"
                    style={{ margin: "0px 0 0px 0" }}
                  >
                    <div className="pro-gen-label-input" style={{ width: 180 }}>
                      Operation time
                    </div>
                  </div>
                  <div
                    className="merchant-form-container"
                    style={{ width: "80%" }}
                  >
                    <div
                      className="merchant-form-switch-wrapper"
                      style={{ width: "90%" }}
                    >
                      <div className="operation-time-wrapper">
                        <Switch
                          onChange={() => {
                            setCheckedSunday((prev) => !prev);
                          }}
                          checked={checkedSunday}
                          onColor={"#9C1818"}
                        />
                        <span className="weekday-label">Sunday</span>
                        <span className="weekday-status-label">
                          {checkedSunday ? "Open" : "Closed"}
                        </span>
                        {checkedSunday === true ? (
                          <>
                            <Field
                              className="form-text-field form-field-styling-1"
                              type="text"
                              name="operating.sunday.openTime"
                              placeholder="00:00"
                              maxLength={50}
                              autoComplete="on"
                            />
                            —
                            <Field
                              className="form-text-field form-field-styling-1"
                              type="text"
                              name="operating.sunday.closeTime"
                              placeholder="00:00"
                              maxLength={50}
                              autoComplete="on"
                            />
                          </>
                        ) : null}
                      </div>

                      <div className="operation-time-wrapper">
                        <Switch
                          onChange={() => {
                            setCheckedMonday((prev) => !prev);
                          }}
                          checked={checkedMonday}
                          onColor={"#9C1818"}
                        />
                        <span className="weekday-label">Monday</span>
                        <span className="weekday-status-label">
                          {checkedMonday ? "Open" : "Closed"}
                        </span>
                        {checkedMonday === true ? (
                          <Fragment>
                            <Field
                              className="form-text-field form-field-styling-1"
                              type="text"
                              name="operating.monday.openTime"
                              placeholder="00:00"
                              maxLength={50}
                              autoComplete="on"
                            />
                            —
                            <Field
                              className="form-text-field form-field-styling-1"
                              type="text"
                              name="operating.monday.closeTime"
                              placeholder="00:00"
                              maxLength={50}
                              autoComplete="on"
                            />
                          </Fragment>
                        ) : null}
                      </div>

                      <div className="operation-time-wrapper">
                        <Switch
                          onChange={() => {
                            setCheckedTuesday((prev) => !prev);
                          }}
                          checked={checkedTuesday}
                          onColor={"#9C1818"}
                        />
                        <span className="weekday-label">Tuesday</span>
                        <span className="weekday-status-label">
                          {checkedTuesday ? "Open" : "Closed"}
                        </span>
                        {checkedTuesday === true ? (
                          <>
                            <Field
                              className="form-text-field form-field-styling-1"
                              type="text"
                              name="operating.tuesday.openTime"
                              placeholder="00:00"
                              maxLength={50}
                              autoComplete="on"
                            />
                            —
                            <Field
                              className="form-text-field form-field-styling-1"
                              type="text"
                              name="operating.tuesday.closeTime"
                              placeholder="00:00"
                              maxLength={50}
                              autoComplete="on"
                            />
                          </>
                        ) : null}
                      </div>

                      <div className="operation-time-wrapper">
                        <Switch
                          onChange={() => {
                            setCheckedWednesday((prev) => !prev);
                          }}
                          checked={checkedWednesday}
                          onColor={"#9C1818"}
                        />
                        <span className="weekday-label">Wednesday</span>
                        <span className="weekday-status-label">
                          {checkedWednesday ? "Open" : "Closed"}
                        </span>
                        {checkedWednesday === true ? (
                          <>
                            <Field
                              className="form-text-field form-field-styling-1"
                              type="text"
                              name="operating.wednesday.openTime"
                              placeholder="00:00"
                              maxLength={50}
                              autoComplete="on"
                            />
                            —
                            <Field
                              className="form-text-field form-field-styling-1"
                              type="text"
                              name="operating.wednesday.closeTime"
                              placeholder="00:00"
                              maxLength={50}
                              autoComplete="on"
                            />
                          </>
                        ) : null}
                      </div>

                      <div className="operation-time-wrapper">
                        <Switch
                          onChange={() => {
                            setCheckedThursday((prev) => !prev);
                          }}
                          checked={checkedThursday}
                          onColor={"#9C1818"}
                        />
                        <span className="weekday-label">Thursday</span>
                        <span className="weekday-status-label">
                          {checkedThursday ? "Open" : "Closed"}
                        </span>
                        {checkedThursday === true ? (
                          <>
                            <Field
                              className="form-text-field form-field-styling-1"
                              type="text"
                              name="operating.thursday.openTime"
                              placeholder="00:00"
                              maxLength={50}
                              autoComplete="on"
                            />
                            —
                            <Field
                              className="form-text-field form-field-styling-1"
                              type="text"
                              name="operating.thursday.closeTime"
                              placeholder="00:00"
                              maxLength={50}
                              autoComplete="on"
                            />
                          </>
                        ) : null}
                      </div>

                      <div className="operation-time-wrapper">
                        <Switch
                          onChange={() => {
                            setCheckedFriday((prev) => !prev);
                          }}
                          checked={checkedFriday}
                          onColor={"#9C1818"}
                        />
                        <span className="weekday-label">Friday</span>
                        <span className="weekday-status-label">
                          {checkedFriday ? "Open" : "Closed"}
                        </span>
                        {checkedFriday === true ? (
                          <>
                            <Field
                              className="form-text-field form-field-styling-1"
                              type="text"
                              name="operating.friday.openTime"
                              placeholder="00:00"
                              maxLength={50}
                              autoComplete="on"
                            />
                            —
                            <Field
                              className="form-text-field form-field-styling-1"
                              type="text"
                              name="operating.friday.closeTime"
                              placeholder="00:00"
                              maxLength={50}
                              autoComplete="on"
                            />
                          </>
                        ) : null}
                      </div>

                      <div className="operation-time-wrapper">
                        <Switch
                          onChange={() => {
                            setCheckedSaturday((prev) => !prev);
                          }}
                          checked={checkedSaturday}
                          onColor={"#9C1818"}
                        />
                        <span className="weekday-label">Saturday</span>
                        <span className="weekday-status-label">
                          {checkedSaturday ? "Open" : "Closed"}
                        </span>
                        {checkedSaturday === true ? (
                          <>
                            <Field
                              className="form-text-field form-field-styling-1"
                              type="text"
                              name="operating.saturday.openTime"
                              placeholder="00:00"
                              maxLength={50}
                              autoComplete="on"
                            />
                            —
                            <Field
                              className="form-text-field form-field-styling-1"
                              type="text"
                              name="operating.saturday.closeTime"
                              placeholder="00:00"
                              maxLength={50}
                              autoComplete="on"
                            />
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <ButtonGroup
                    width={100}
                    mgTop={10}
                    float="center"
                    mgBottom={15}
                  >
                    <Button
                      color={"white"}
                      bgColor={"#101010"}
                      justifyContent={"center"}
                      gap={"10px"}
                      width={120}
                      height={35}
                      label={"Save"}
                      onClick={() => handleSubmitForm(values)}
                    />
                  </ButtonGroup>
                </Form>
              );
            }}
          </Formik>
        )}
      </div>
      <Modal
        openModal={mapView}
        title={"Restaurant Location"}
        width={50}
        height={480}
        transparent={0.2}
        closeModal={() => {
          setMapView(false);
        }}
      >
        <ReactMapGl
          transitionDuration={1000}
          {...viewport}
          latitude={parseFloat(provider.provider.latitude)}
          longitude={parseFloat(provider.provider.longitude)}
          width={"100%"}
          onViewportChange={(viewport) => setViewport(viewport)}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken="pk.eyJ1IjoiaG9hbmduYW0yNDMiLCJhIjoiY2t1dHJxdjdlMHg5ZDJwbnlpcmo0a2NnMiJ9.DUrlIOzvO6-kWt-VCKZW1g"
        >
          <Marker
            latitude={parseFloat(provider.provider.latitude)}
            longitude={parseFloat(provider.provider.longitude)}
            offsetLeft={-20}
            offsetTop={-30}
          >
            <img
              alt="marker"
              style={{ height: 30, width: 30 }}
              src="https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png"
            />
          </Marker>
        </ReactMapGl>
        <span className="md-head-sub-text-large" style={{ margin: "30px 0" }}>
          <FontAwesomeIcon icon={faMapMarkedAlt} className="md-text-icon" />
          277, Nguyen Van Cu, ward Nguyen Cu Trinh, district 5, Ho Chi Minh city
        </span>
        <ButtonGroup mgTop={5} float="center" mgBottom={15}>
          <Button
            color={"white"}
            bgColor={"#101010"}
            justifyContent={"center"}
            gap={"10px"}
            width={120}
            height={35}
            label={"OK"}
          />
        </ButtonGroup>
      </Modal>
    </Fragment>
  );
}

MDHome.propTypes = {
  user: PropTypes.object.isRequired,
  provider: PropTypes.object.isRequired,
  getProductListAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  provider: state.ProviderReducer,
});

export default withRouter(
  connect(mapStateToProps, {
    getProductListAPI,
  })(MDHome)
);
