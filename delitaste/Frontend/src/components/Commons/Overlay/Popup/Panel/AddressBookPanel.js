import React, { Fragment, useState, useEffect } from "react";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import locations from "assets/json_location/locations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBuilding,
  faAddressBook,
} from "@fortawesome/fontawesome-free-solid";

import ReactMapGl, { Source, Layer, Marker, Popup } from "react-map-gl";
import axios from "axios";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import Modal from "components/Commons/Overlay/Popup/Modal/Modal";
import {
  addAddressAPI,
  getAddressBookAPI,
} from "store/actions/UserAction/UserAction";

const initialValues2 = {
  address: "",
  longitude: "",
  latitude: "",
  city: "",
  district: "",
  ward: "",
  road: "",
  type: 1,
};

function AddressBookPanel(props) {
  //address
  const { user, addAddressAPI, getAddressBookAPI } = props;
  const selectedAddressType = {
    border: "1px solid #101010",
    backgroundColor: "#f6f6f6",
  };
  const [addressType, setAddressType] = useState(1);
  const [latitude, setLatitude] = useState(10.768685473523648);
  const [longitude, setLongitude] = useState(106.68057155417674);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "200px",
    latitude: 10.768685473523648,
    longitude: 106.68057155417674,
    zoom: 16,
  });
  const [contact, setContact] = useState([]);
  async function fetchAddressBook() {
    var result = await getAddressBookAPI(user.profile.user_id);
    setContact(result);
  }
  useEffect(() => {
    fetchAddressBook();
  }, [user?.profile?.user_id]);
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
  const handleGeoCoding = (values) => {
    const { road, city, district, ward } = values;
    const address = getFullAddress(road, city, district, ward);

    if (!address) return;
    const endpoint = `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=6d74076cb237412e9abb06e88020a7a5`;
    async function fetchCoordinates(url) {
      const result = await axios.get(url);
      if (result.data?.features?.length !== 0) {
        setLongitude(result.data.features[0]?.geometry?.coordinates[0]);
        setLatitude(result.data.features[0]?.geometry?.coordinates[1]);
        setViewport({
          ...viewport,
          latitude: result.data.features[0]?.geometry?.coordinates[1],
          longitude: result.data.features[0]?.geometry?.coordinates[0],
        });
        return;
      }
    }
    fetchCoordinates(endpoint);
  };
  return (
    <Fragment>
      <Modal
        openModal={props.visible}
        closeModal={() => {
          props.setVisible(false);
        }}
        title={"Address Book"}
        widthPX={810}
        height={560}
        padding="5px 10px"
        transparent="30%"
        hideHeader={true}
      >
        <Formik initialValues={initialValues2} validateOnChange={false}>
          {(formikProps) => {
            const { values, errors, touched } = formikProps;
            const handleGeoCoding = (values) => {
              const { road, city, district, ward } = values;
              const address = getFullAddress(road, city, district, ward);
              if (!address) return;
              const endpoint = `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=6d74076cb237412e9abb06e88020a7a5`;
              async function fetchCoordinates(url) {
                const result = await axios.get(url);
                if (result.data?.features?.length !== 0) {
                  setLongitude(
                    result.data.features[0]?.geometry?.coordinates[0]
                  );
                  setLatitude(
                    result.data.features[0]?.geometry?.coordinates[1]
                  );
                  setViewport({
                    ...viewport,
                    latitude: result.data.features[0]?.geometry?.coordinates[1],
                    longitude:
                      result.data.features[0]?.geometry?.coordinates[0],
                  });
                  return;
                }
              }
              fetchCoordinates(endpoint);
            };
            return (
              <Form className="p-pd-content-wrapper">
                <Fragment>
                  <div className="p-pd-general-profile-wrapper">
                    {user.location.map((address) => (
                      <div className="p-pd-general-profile-row">
                        <div className="p-pd-text-secondary">
                          <FontAwesomeIcon
                            className="p-pd-address-icon"
                            icon={
                              address.type === 1
                                ? faHome
                                : address.type === 2
                                ? faBuilding
                                : faAddressBook
                            }
                          />
                          <span>{address.address}</span>
                        </div>
                      </div>
                    ))}
                    <div className="p-pd-general-profile-row ">
                      <span
                        className="p-pd-b-gp-label"
                        style={{ width: "10%" }}
                      >
                        Location:
                      </span>
                      <Field
                        className="p-pd-b-iu-input-general-select"
                        as="select"
                        style={{ width: "30%", height: "35px" }}
                        name="city"
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
                      —
                      <Field
                        className="p-pd-b-iu-input-general-select"
                        as="select"
                        style={{ width: "30%", height: "35px" }}
                        name="district"
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
                      —
                      <Field
                        className="p-pd-b-iu-input-general-select"
                        style={{ width: "30%", height: "35px" }}
                        as="select"
                        name="ward"
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

                    <div className="p-pd-general-profile-row">
                      <span
                        className="p-pd-b-gp-label"
                        style={{ width: "10%" }}
                      >
                        Address:
                      </span>
                      <Field
                        type="text"
                        name="road"
                        className="p-pd-b-iu-input-general"
                        placeholder={"Road. Eg. 100A, St. Laurant Street"}
                        style={{ width: "526px" }}
                      />
                    </div>
                    <div className="p-pd-general-profile-row">
                      <span
                        className="p-pd-b-gp-label"
                        style={{ width: "10%" }}
                      >
                        Type:
                      </span>
                      <div
                        className="p-pd-a-item"
                        onClick={() => setAddressType(1)}
                        style={addressType === 1 ? selectedAddressType : {}}
                      >
                        <div className="p-pd-a-image-wrapper">
                          <FontAwesomeIcon
                            icon={faHome}
                            className="p-pd-a-icon"
                          />
                        </div>
                        <span className="p-pd-a-label-radio">House</span>
                      </div>
                      <div
                        className="p-pd-a-item"
                        onClick={() => setAddressType(2)}
                        style={addressType === 2 ? selectedAddressType : {}}
                      >
                        <div className="p-pd-a-image-wrapper">
                          <FontAwesomeIcon
                            icon={faBuilding}
                            className="p-pd-a-icon"
                          />
                        </div>
                        <span className="p-pd-a-label-radio">Workplace</span>
                      </div>
                      <div
                        className="p-pd-a-item"
                        onClick={() => setAddressType(3)}
                        style={addressType === 3 ? selectedAddressType : {}}
                      >
                        <div className="p-pd-a-image-wrapper">
                          <FontAwesomeIcon
                            icon={faAddressBook}
                            className="p-pd-a-icon"
                          />
                        </div>
                        <span className="p-pd-a-label-radio">Other</span>
                      </div>
                    </div>
                    <ButtonGroup gap={5} mgTop={5} mgBottom={5}>
                      <Button
                        width={140}
                        height={25}
                        fontSize={12}
                        color={"black"}
                        marginTop={20}
                        bglight={true}
                        border={"#5d5d5d 1.5px solid"}
                        justifyContent={"center"}
                        label="Check on map"
                        prefix={
                          <FontAwesomeIcon
                            className="button-icon"
                            icon={faMapMarkedAlt}
                          />
                        }
                        onClick={() => {
                          handleGeoCoding(values);
                        }}
                      />
                    </ButtonGroup>
                    <div className="p-pd-general-profile-row">
                      <ReactMapGl
                        transitionDuration={1000}
                        {...viewport}
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                        onViewportChange={(viewport) => setViewport(viewport)}
                        mapboxApiAccessToken="pk.eyJ1IjoiaG9hbmduYW0yNDMiLCJhIjoiY2t1dHJxdjdlMHg5ZDJwbnlpcmo0a2NnMiJ9.DUrlIOzvO6-kWt-VCKZW1g"
                      >
                        <Marker
                          latitude={latitude}
                          longitude={longitude}
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
                    </div>
                  </div>
                  <ButtonGroup mgTop={5} float="center" mgBottom={15}>
                    <Button
                      color={"white"}
                      bgColor={"#101010"}
                      justifyContent={"center"}
                      gap={"10px"}
                      width={120}
                      height={35}
                      label={"UpdatButtone"}
                    />
                  </ButtonGroup>
                </Fragment>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </Fragment>
  );
}

AddressBookPanel.propTypes = {
  user: PropTypes.object.isRequired,
  getAddressBookAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});
export default withRouter(
  connect(mapStateToProps, { getAddressBookAPI })(AddressBookPanel)
);
