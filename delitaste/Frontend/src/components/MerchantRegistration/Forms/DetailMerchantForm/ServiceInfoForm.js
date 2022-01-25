import "./DetailMerchantForm.scss";
import { useEffect, useState, useRef, useCallback, Fragment } from "react";
import "style/Common.scss";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Formik, ErrorMessage, Form, Field } from "formik";
import { validateMerchantForm1 } from "utils/FormUtils/MerchantFormValidate";
import locations from "assets/json_location/locations";
import FormError from "components/Commons/ErrorHandlers/FormError/FormError";
import FormHeader from "./FormHeader/FormHeader";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import { updateServiceInfoFormAPI } from "store/actions/ProviderAction/ProviderAction";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk } from "@fortawesome/fontawesome-free-solid";
import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import StepperArrow from "assets/stepper-arrow.png";

const initialValues = {
  name: "",
  type: "",
  street: "",
  phone: "",
  city: "",
  district: "",
  ward: "",
  road: "",
};

const formHeaderText = {
  title: "1. Provider Service Information",
  headerText: "Set up your Tastie's merchant account",
  bodyText:
    "Your restaurant information will be public on Tastie. Make sure the information is accurrate and visible to the public.",
};
function ServiceInfoForm(props) {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback((newViewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return handleViewportChange({
      ...newViewport,
      ...geocoderDefaultOverrides,
    });
  }, []);

  const getFullAddress = (road, city_id, district_id, ward_id) => {
    const address = [];
    locations
      .filter((city) => city.code == city_id)
      .map((selectedCity) => {
        address.unshift(selectedCity.name);
        selectedCity.districts
          .filter((district) => district.code == district_id)
          .map((selectedDistrict) => {
            address.unshift(selectedDistrict.name);
            selectedDistrict.wards
              .filter((ward) => ward.code == ward_id)
              .map((selectedWard) => {
                address.unshift(selectedWard.name);
              });
          });
      });
    if (road) address.unshift(road);
    return address.join(", ");
  };

  const handleSubmitForm = async (values) => {
    const { phone, city, district, ward, road } = values;
    let merchantName = [values.name];
    values.type && merchantName.push(values.type);
    values.street && merchantName.push(values.street);
    const formData = {
      address: getFullAddress(road, city, district, ward),
      latitude: viewport.latitude,
      longitude: viewport.longitude,
      merchant_name: merchantName.join(" "),
      hotline: phone,
      city_id: city,
      district_id: district,
      ward_id: ward,
      road: road,
    };
    if (!props.match.params.id) return;
    const updateStatus = await props.updateServiceInfoFormAPI(
      props.match.params.id,
      formData
    );
    if (updateStatus) props.history.push("representative");
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateMerchantForm1}
      validateOnChange={false}
      onSubmit={(values) => handleSubmitForm(values)}
    >
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        const [addressMapbox, setAddressMapbox] = useState("");
        const searchOnMap = (values) => {
          const { road, city, district, ward } = values;
          const result = getFullAddress(road, city, district, ward);
          setAddressMapbox(result);
        };
        return (
          <Fragment>
            <Form className="merchant-form-container">
              <FormHeader
                title={formHeaderText.title}
                headerText={formHeaderText.headerText}
                bodyText={formHeaderText.bodyText}
              />
              <div className="merchant-form-wrapper">
                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">
                    Merchant name{" "}
                    <FontAwesomeIcon className="asterisk" icon={faAsterisk} />
                  </div>
                  <div className="merchant-form-input-wrapper form-input-extra-large">
                    <Field
                      className="form-text-field"
                      style={
                        values.name
                          ? { backgroundColor: "#F2F2F2" }
                          : { backgroundColor: "white" }
                      }
                      type="text"
                      name="name"
                      placeholder="Merchant name"
                    />
                    <img src={StepperArrow} width={20} height={2.5} />
                    <Field
                      className="form-text-field"
                      style={
                        values.type
                          ? { backgroundColor: "#F2F2F2" }
                          : { backgroundColor: "white" }
                      }
                      type="text"
                      name="type"
                      placeholder="Restaurant type"
                    />
                    <img src={StepperArrow} width={20} height={2.5} />
                    <Field
                      className="form-text-field"
                      style={
                        values.street
                          ? { backgroundColor: "#F2F2F2" }
                          : { backgroundColor: "white" }
                      }
                      type="text"
                      name="street"
                      placeholder="Street"
                    />
                  </div>
                </div>
                <div className="field-bottom-side-wrapper">
                  <FormError
                    err={errors.name && touched.name ? errors.name : ""}
                    spaceBetween={0}
                    fontSize={12}
                    fontWeight={"bold"}
                  />
                  <span className="field-description">
                    Merchant name should be named by the name of the restaurant
                    and must be in the same format as provided. <br />
                    E.g: "The Alley - Tra Sua - Ho Tung Mau"
                  </span>
                </div>
                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">
                    Phone number{" "}
                    <FontAwesomeIcon className="asterisk" icon={faAsterisk} />
                  </div>
                  <div className="merchant-form-input-wrapper form-input-medium">
                    <Field
                      className={
                        errors.phone
                          ? "form-text-field error"
                          : "form-text-field"
                      }
                      style={
                        values.phone
                          ? { backgroundColor: "#F2F2F2" }
                          : { backgroundColor: "white" }
                      }
                      type="text"
                      name="phone"
                      placeholder="Enter your merchant phone number"
                    />
                  </div>
                </div>
                <div className="field-bottom-side-wrapper">
                  <FormError
                    err={errors.phone && touched.phone ? errors.phone : ""}
                    spaceBetween={0}
                    fontSize={12}
                    fontWeight={"bold"}
                  />
                  <span className="field-description"></span>
                </div>

                <div className="group-field-name">Business address:</div>
                <div className="field-bottom-side-wrapper">
                  <span className="field-description">
                    To make sure your business address is accurate. Please check
                    location displayed on map below.
                  </span>
                </div>
                <div className="location-wrapper">
                  <div
                    className="group-field-medium"
                    onClick={() => searchOnMap(values)}
                  >
                    <div className="merchant-form-field-wrapper">
                      <div className="merchant-form-label-wrapper">City</div>
                      <div className="merchant-form-input-wrapper form-input-extra-large">
                        <Field
                          className="form-text-field-select"
                          style={{ width: "100%", height: "35px" }}
                          as="select"
                          name="city"
                          style={
                            values.city
                              ? { backgroundColor: "#F2F2F2" }
                              : { backgroundColor: "white" }
                          }
                        >
                          <option value="" disabled hidden>
                            Select a city...
                          </option>
                          {locations.map((city) => (
                            <option
                              key={city.code}
                              value={city.code}
                              label={city.name}
                            />
                          ))}
                        </Field>
                      </div>
                    </div>
                    <div className="merchant-form-field-wrapper">
                      <div className="merchant-form-label-wrapper">
                        District
                      </div>
                      <div className="merchant-form-input-wrapper form-input-extra-large">
                        <Field
                          className="form-text-field-select"
                          style={{ width: "100%", height: "35px" }}
                          as="select"
                          name="district"
                          style={
                            values.district
                              ? { backgroundColor: "#F2F2F2" }
                              : { backgroundColor: "white" }
                          }
                        >
                          <option value="" disabled hidden>
                            Select a district...
                          </option>
                          {locations
                            .filter((city) => city.code == values.city)
                            .map((selectedCity) =>
                              selectedCity.districts.map((district) => (
                                <option
                                  key={district.code}
                                  value={district.code}
                                  label={district.name}
                                />
                              ))
                            )}
                        </Field>
                      </div>
                    </div>
                    <div className="merchant-form-field-wrapper">
                      <div className="merchant-form-label-wrapper">Ward</div>
                      <div className="merchant-form-input-wrapper form-input-extra-large">
                        <Field
                          className="form-text-field-select"
                          style={{ width: "100%", height: "35px" }}
                          as="select"
                          name="ward"
                          style={
                            values.ward
                              ? { backgroundColor: "#F2F2F2" }
                              : { backgroundColor: "white" }
                          }
                        >
                          <option value="" disabled hidden>
                            Select a ward...
                          </option>
                          {locations
                            .filter((city) => city.code == values.city)
                            .map((selectedCity) =>
                              selectedCity.districts
                                .filter(
                                  (district) => district.code == values.district
                                )
                                .map((selectedDistrict) =>
                                  selectedDistrict.wards.map((ward) => (
                                    <option
                                      key={ward.code}
                                      value={ward.code}
                                      label={ward.name}
                                    />
                                  ))
                                )
                            )}
                        </Field>
                      </div>
                    </div>
                    <div className="merchant-form-field-wrapper">
                      <div className="merchant-form-label-wrapper">Road</div>
                      <div className="merchant-form-input-wrapper form-input-extra-large">
                        <Field
                          className={
                            errors.road
                              ? "form-text-field error"
                              : "form-text-field"
                          }
                          style={
                            values.road
                              ? { backgroundColor: "#F2F2F2" }
                              : { backgroundColor: "white" }
                          }
                          type="text"
                          name="road"
                          placeholder="House number - Road"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="map-container">
                    <MapGL
                      ref={mapRef}
                      {...viewport}
                      width="100%"
                      height="320px"
                      onViewportChange={handleViewportChange}
                      mapStyle="mapbox://styles/mapbox/streets-v9"
                      containerStyle={{
                        zIndex: 0,
                      }}
                      mapboxApiAccessToken={
                        "pk.eyJ1Ijoic2FuZ25ndXllbjI4MDMiLCJhIjoiY2t4bmwwMHNvM3h4azJxcGdjNnhlOHdlYSJ9.QFPmkMHDE3wfAJYE1oqyOg"
                      }
                    >
                      <Geocoder
                        limit={1}
                        mapRef={mapRef}
                        style={{ zIndex: 0 }}
                        onViewportChange={handleGeocoderViewportChange}
                        inputValue={addressMapbox}
                        mapboxApiAccessToken={
                          "pk.eyJ1Ijoic2FuZ25ndXllbjI4MDMiLCJhIjoiY2t4bmwwMHNvM3h4azJxcGdjNnhlOHdlYSJ9.QFPmkMHDE3wfAJYE1oqyOg"
                        }
                        countries={"vn"}
                        position={"top-left"}
                        trackProximity={true}
                      />
                    </MapGL>
                  </div>
                </div>

                <div className="field-bottom-side-wrapper">
                  <FormError
                    err={errors.road && touched.road ? errors.road : ""}
                    spaceBetween={0}
                    fontSize={12}
                    fontWeight={"bold"}
                  />
                </div>
              </div>
              <div className="btn-merchant-registration-wrapper">
                <button className="btn-merchant-registration-back">Back</button>
                <button
                  className="btn-merchant-registration-next"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </Form>
          </Fragment>
        );
      }}
    </Formik>
  );
}

ServiceInfoForm.propTypes = {
  updateServiceInfoFormAPI: PropTypes.func.isRequired,
};

export default withRouter(
  connect(null, {
    updateServiceInfoFormAPI,
  })(ServiceInfoForm)
);
