import React, { Fragment, useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Avatar from "assets/avatar.jpg";
import Tag from "components/Commons/Tag/Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Form, Field } from "formik";
import locations from "assets/json_location/locations";
import {
  faMars,
  faVenus,
  faCrown,
  faPlusSquare,
  faMinusSquare,
  faUpload,
  faUndo,
  faLink,
  faSave,
  faHome,
  faBuilding,
  faAddressBook,
  faDotCircle,
} from "@fortawesome/fontawesome-free-solid";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import Button from "components/Commons/Button/Button";
import DialogBox from "components/Commons/Overlay/DialogBox/DialogBox";
import ReactMapGl, { Source, Layer, Marker, Popup } from "react-map-gl";
import axios from "axios";
import "./ProfileDetail.scss";
import { faHouseUser, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import city from "assets/json_location/city";
import {
  addAddressAPI,
  getAddressBookAPI,
} from "store/actions/UserAction/UserAction";

const initialValues1 = {
  firstname: "",
  lastname: "",
  birthday: "2000/03/28",
  gender: 1,
};
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

function ProfileDetail(props) {
  const { user, addAddressAPI, getAddressBookAPI } = props;
  const [imageURL, setImageURL] = useState();
  const [showEditBI, setShowEditBI] = useState(true);
  const [showEditPI, setShowEditPI] = useState(false);
  const [showEditCI, setShowEditCI] = useState(true);
  const preference = ["Vegetarian", "Vegan", "Fastfood"];
  //Dialog
  const [showValidateDialog, setShowValidateDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    header: "",
    text1: "",
    text2: "",
  });
  //Map
  const selectedAddressType = {
    border: "1px solid #101010",
    backgroundColor: "#f6f6f6",
  };
  const [loading, setLoading] = useState(false);
  const [addressType, setAddressType] = useState(1);
  const [latitude, setLatitude] = useState(10.768685473523648);
  const [longitude, setLongitude] = useState(106.68057155417674);
  const [viewport, setViewport] = useState({
    width: "calc(80% - 14px)",
    height: "300px",
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
  }, [user.profile]);
  const inputFile = useRef(null);
  const uploadProfileImage = (e) => {
    inputFile.current.click();
  };
  useEffect(() => {
    if (user.profile.length !== 0) setLoading(true);
  }, [user.profile]);
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
  const uploadFile = (e) => {
    let file = e.target.files[0];
  };
  const handleSubmitForm1 = async (values) => {
    console.log(values);
  };
  const handleSubmitForm2 = async (values) => {
    const data = {
      customer_id: user.profile.user_id,
      address: getFullAddress(
        values.road,
        values.city,
        values.district,
        values.ward
      ),
      city: values.city,
      longtitude: longitude,
      latitude: latitude,
      type: addressType,
    };
    console.log(data);
    await addAddressAPI(data);
    fetchAddressBook();
    setShowValidateDialog(true);
    setDialogContent({
      ...dialogContent,
      header: "Success",
      text1: `Successfully adding a new address`,
      text2: `Address "${data.address}" has been added to your address book`,
    });
  };

  return (
    loading && (
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
                <span className="p-pd-hp-s-pi-main-text">
                  {`${user?.profile?.first_name} ${user?.profile?.last_name}`}
                </span>
                <span className="u-pf-sb-pt-icon">
                  <FontAwesomeIcon className="vip-customer" icon={faCrown} />
                  <span className="u-pf-sb-pt-sub-text-type">
                    Gold customer
                  </span>
                </span>
                <span className="p-pd-hp-s-pi-sub-text">
                  <b>Birthday:</b> {user.profile?.birthday?.split("T")[0]}
                </span>
                <span className="p-pd-hp-s-pi-sub-text-medium">
                  <b>Gender:</b> Male
                  <FontAwesomeIcon className="mars-icon" icon={faMars} />
                </span>
                <span className="p-pd-hp-s-pi-sub-text">
                  <b>Delivery address:</b>{" "}
                  {user.location
                    ? user.currentAddress?.address
                    : user.location.address[0]}
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
                icon={showEditPI ? faMinusSquare : faPlusSquare}
                onClick={() => setShowEditPI((prev) => !prev)}
              />
              <span className="p-pd-title-text">Profile picture</span>
            </div>
            {showEditPI && (
              <Fragment>
                <input
                  accept="image/*"
                  type="file"
                  id="profileImageInput"
                  onChange={(e) => uploadFile(e)}
                  ref={inputFile}
                  style={{ display: "none" }}
                />
                <div className="p-pd-body-avatar-uploader-wrapper">
                  <div className="p-pd-body-image-preview">
                    <img
                      className="p-pd-body-profile-photo-preview"
                      src={Avatar}
                      alt="profile_pic"
                    />
                  </div>
                  <div className="p-pd-body-image-upload-wrapper">
                    <span className="p-pd-b-iu-label">Upload by URL:</span>
                    <input
                      type="text"
                      name="imageURL"
                      value={imageURL}
                      className="p-pd-b-iu-link-upload"
                      onChange={(e) => setImageURL(e.target.value)}
                    />
                    <ButtonGroup
                      gap={10}
                      float="center"
                      mgTop={10}
                      mgBottom={5}
                    >
                      <Button
                        width={120}
                        height={30}
                        color={"black"}
                        bglight={true}
                        border={"#5d5d5d 1.5px solid"}
                        justifyContent={"center"}
                        label={imageURL ? "URL Submit" : "Upload"}
                        prefix={
                          imageURL ? (
                            <FontAwesomeIcon
                              className="button-icon"
                              icon={faLink}
                            />
                          ) : (
                            <FontAwesomeIcon
                              className="button-icon"
                              icon={faUpload}
                            />
                          )
                        }
                        onClick={uploadProfileImage}
                      />
                      <Button
                        width={100}
                        height={30}
                        color={"black"}
                        bglight={true}
                        border={"#5d5d5d 1.5px solid"}
                        justifyContent={"center"}
                        label="Revert"
                        prefix={
                          <FontAwesomeIcon
                            className="button-icon"
                            icon={faUndo}
                          />
                        }
                        onClick={() => {}}
                      />
                    </ButtonGroup>
                    <span className="p-pd-b-iu-guideline">
                      Acceptable file formats: PDF, PNG, GIF, JPG
                    </span>
                    <span className="p-pd-b-iu-guideline">
                      Acceptable file sizes: File sizes are limited by the
                      upload timeout, so we recommend files that are less than
                      25 MB per file uploaded (either individually or in a zip
                      file). Tastie will resize each image file down to 1 MB.
                    </span>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
          <Formik
            initialValues={initialValues1}
            validateOnChange={false}
            onSubmit={(values) => handleSubmitForm1(values)}
          >
            {(formikProps) => {
              const { values, errors, touched } = formikProps;

              return (
                <Fragment>
                  <Form className="p-pd-body-wrapper">
                    <div className="p-pd-body-title">
                      <FontAwesomeIcon
                        className="p-pd-bt-icon"
                        icon={showEditBI ? faMinusSquare : faPlusSquare}
                        onClick={() => setShowEditBI((prev) => !prev)}
                      />
                      <span className="p-pd-title-text">General profile</span>
                      {showEditBI && (
                        <div className="p-pd-submit-button">
                          <Button
                            width={80}
                            height={25}
                            fontSize={12}
                            color={"black"}
                            bglight={true}
                            border={"#5d5d5d 1.5px solid"}
                            justifyContent={"center"}
                            label="Revert"
                            prefix={
                              <FontAwesomeIcon
                                className="button-icon"
                                icon={faUndo}
                              />
                            }
                            onClick={() => {}}
                          />
                          <Button
                            width={80}
                            height={25}
                            fontSize={12}
                            color={"black"}
                            bglight={true}
                            border={"#5d5d5d 1.5px solid"}
                            justifyContent={"center"}
                            label="Save"
                            prefix={
                              <FontAwesomeIcon
                                className="button-icon"
                                icon={faSave}
                              />
                            }
                            onClick={() => {}}
                          />
                        </div>
                      )}
                    </div>
                    {showEditBI && (
                      <div className="p-pd-general-profile-wrapper">
                        <div className="p-pd-general-profile-row">
                          <span className="p-pd-b-gp-label">Full name:</span>
                          <input
                            type="text"
                            name="firstname"
                            className="p-pd-b-iu-input-general"
                            defaultValue={user.profile?.first_name}
                            onChange={(e) => setImageURL(e.target.value)}
                            placeholder={"First name"}
                          />
                          —
                          <input
                            type="text"
                            name="lastname"
                            placeholder={"Last name"}
                            defaultValue={user.profile?.last_name}
                            className="p-pd-b-iu-input-general"
                            onChange={(e) => setImageURL(e.target.value)}
                          />
                        </div>
                        <div className="p-pd-general-profile-row">
                          <span className="p-pd-b-gp-label">Phone:</span>
                          <input
                            type="text"
                            name="email"
                            className="p-pd-b-iu-input-general"
                            defaultValue={user.profile?.phone}
                            onChange={(e) => setImageURL(e.target.value)}
                            placeholder={"Phone number"}
                          />
                        </div>
                        <div className="p-pd-general-profile-row">
                          <span className="p-pd-b-gp-label">Email:</span>
                          <input
                            type="text"
                            name="email"
                            className="p-pd-b-iu-input-general p-pd-disable"
                            onChange={(e) => setImageURL(e.target.value)}
                            defaultValue={user.profile?.email}
                            placeholder={"Email"}
                            disabled
                            style={{ width: "526px" }}
                          />
                        </div>
                        <div className="p-pd-general-profile-row">
                          <span className="p-pd-b-gp-label">
                            Date of birth:
                          </span>
                          <input
                            type="date"
                            name="birthday"
                            defaultValue={user.profile?.birthday?.split("T")[0]}
                            className="p-pd-b-iu-input-general"
                            onChange={(e) => setImageURL(e.target.value)}
                            placeholder={"Date of birth"}
                          />
                        </div>
                        <div className="p-pd-general-profile-row">
                          <span className="p-pd-b-gp-label">Gender:</span>
                          <label className="p-pd-b-iu-input-general-radio radio">
                            <input type="radio" name="gender" value={1} />
                            <span className="p-pd-label-radio">
                              Male{" "}
                              <FontAwesomeIcon
                                className="mars-icon"
                                icon={faMars}
                              />
                            </span>
                          </label>
                          <label className="p-pd-b-iu-input-general-radio radio">
                            <input type="radio" name="gender" value={2} />
                            <span className="p-pd-label-radio">
                              Female{" "}
                              <FontAwesomeIcon
                                className="venus-icon"
                                icon={faVenus}
                              />
                            </span>
                          </label>
                        </div>
                      </div>
                    )}
                  </Form>
                </Fragment>
              );
            }}
          </Formik>
          <Formik initialValues={initialValues2} validateOnChange={false}>
            {(formikProps) => {
              const { values, errors, touched } = formikProps;
              const handleGeoCoding = (values) => {
                const { road, city, district, ward } = values;
                const address = getFullAddress(road, city, district, ward);
                if (!address) return;
                const endpoint = `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=05e76b96155e447ba0391d645ce81d27`;
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
                      latitude:
                        result.data.features[0]?.geometry?.coordinates[1],
                      longitude:
                        result.data.features[0]?.geometry?.coordinates[0],
                    });
                    return;
                  }
                  setShowValidateDialog(true);
                  setDialogContent({
                    ...dialogContent,
                    header: "No result found",
                    text1:
                      "Sorry, we couldn't find any locations for your search",
                    text2:
                      "In that case, we would recommend you to input a coordinates (latitude, longitude) instead.",
                  });
                }
                fetchCoordinates(endpoint);
              };
              return (
                <Fragment>
                  <Form className="p-pd-body-wrapper">
                    <div className="p-pd-body-title">
                      <FontAwesomeIcon
                        className="p-pd-bt-icon"
                        icon={showEditCI ? faMinusSquare : faPlusSquare}
                        onClick={() => setShowEditCI((prev) => !prev)}
                      />
                      <span className="p-pd-title-text">Delivery address</span>
                      {showEditBI && (
                        <div className="p-pd-submit-button">
                          <Button
                            width={80}
                            height={25}
                            fontSize={12}
                            color={"black"}
                            bglight={true}
                            border={"#5d5d5d 1.5px solid"}
                            justifyContent={"center"}
                            label="Revert"
                            prefix={
                              <FontAwesomeIcon
                                className="button-icon"
                                icon={faUndo}
                              />
                            }
                            onClick={() => {}}
                          />
                          <Button
                            width={80}
                            height={25}
                            fontSize={12}
                            color={"black"}
                            bglight={true}
                            border={"#5d5d5d 1.5px solid"}
                            justifyContent={"center"}
                            label="Save"
                            prefix={
                              <FontAwesomeIcon
                                className="button-icon"
                                icon={faSave}
                              />
                            }
                            onClick={() => {
                              handleSubmitForm2(values);
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {showEditCI && (
                      <Fragment>
                        <div className="p-pd-general-profile-wrapper">
                          <div className="p-pd-general-profile-row">
                            <div className="p-pd-text-secondary">
                              <FontAwesomeIcon
                                className="p-pd-address-icon"
                                icon={faDotCircle}
                              />
                              <span>{user.currentAddress.address}</span>
                            </div>
                          </div>
                          {user.location.map((address) => (
                            <div className="p-pd-general-profile-row ">
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
                          <div className="p-pd-general-profile-row">
                            <span className="p-pd-b-gp-label">Location:</span>
                            <Field
                              className="p-pd-b-iu-input-general-select"
                              as="select"
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
                              style={{ width: "100%", height: "35px" }}
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
                                      (district) =>
                                        district.code == values.district
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
                            <span className="p-pd-b-gp-label">Address:</span>
                            <Field
                              type="text"
                              name="road"
                              className="p-pd-b-iu-input-general"
                              placeholder={"Road. Eg. 100A, St. Laurant Street"}
                              style={{ width: "526px" }}
                            />
                          </div>
                          <div className="p-pd-general-profile-row">
                            <span className="p-pd-b-gp-label">Type:</span>
                            <div
                              className="p-pd-a-item"
                              onClick={() => setAddressType(1)}
                              style={
                                addressType === 1 ? selectedAddressType : {}
                              }
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
                              style={
                                addressType === 2 ? selectedAddressType : {}
                              }
                            >
                              <div className="p-pd-a-image-wrapper">
                                <FontAwesomeIcon
                                  icon={faBuilding}
                                  className="p-pd-a-icon"
                                />
                              </div>
                              <span className="p-pd-a-label-radio">
                                Workplace
                              </span>
                            </div>
                            <div
                              className="p-pd-a-item"
                              onClick={() => setAddressType(3)}
                              style={
                                addressType === 3 ? selectedAddressType : {}
                              }
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
                              onViewportChange={(viewport) =>
                                setViewport(viewport)
                              }
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
                      </Fragment>
                    )}
                  </Form>
                </Fragment>
              );
            }}
          </Formik>
          <div className="p-pd-footer-wrapper"></div>
        </div>
        <DialogBox
          visibility={showValidateDialog}
          headerText={dialogContent.header}
          close={() => setShowValidateDialog(false)}
        >
          <div className="dialog-detail-wrapper">
            <div className="dialogbox-content">
              <span className="dialogbox-content-detail-main">
                {dialogContent.text1}
              </span>
              <span className="dialogbox-content-detail-sub">
                {dialogContent.text2}
              </span>
            </div>
            <div className="dialogbox-action">
              <ButtonGroup gap={5} mgRight={5}>
                <Button
                  color={"white"}
                  bgColor={"#800000"}
                  justifyContent={"center"}
                  gap={"10px"}
                  width={80}
                  height={30}
                  label={"OK"}
                  onClick={() => setShowValidateDialog(false)}
                />
              </ButtonGroup>
            </div>
          </div>
        </DialogBox>
      </Fragment>
    )
  );
}

ProfileDetail.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  addAddressAPI: PropTypes.func.isRequired,
  getAddressBookAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(
  connect(mapStateToProps, { addAddressAPI, getAddressBookAPI })(ProfileDetail)
);
