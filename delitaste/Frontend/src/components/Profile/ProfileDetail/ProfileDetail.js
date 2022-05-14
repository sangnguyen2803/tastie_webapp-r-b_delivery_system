import React, { Fragment, useState, useEffect, useRef } from "react";
import "./ProfileDetail.scss";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Avatar from "assets/avatar.jpg";
import CurrentAvatar from "assets/avatar.png";
import Tag from "components/Commons/Tag/Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
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
} from "@fortawesome/fontawesome-free-solid";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import Button from "components/Commons/Button/Button";

function ProfileDetail(props) {
  const initialValues1 = {
    firstname: "",
    lastname: "",
  };
  const { user } = props;
  const [imageURL, setImageURL] = useState();
  const [showEditBI, setShowEditBI] = useState(true);
  const [showEditPI, setShowEditPI] = useState(false);
  const [showEditCI, setShowEditCI] = useState(true);
  const preference = ["Vegetarian", "Vegan", "Fastfood"];
  const [uploadStatus, setUploadStatus] = useState(false); //0 upload : 1 edit
  const [profilePicture, setProfilePicture] = useState(Avatar);
  const inputFile = useRef(null);
  const uploadProfileImage = (e) => {
    inputFile.current.click();
  };
  const uploadFile = (e) => {
    let file = e.target.files[0];
  };
  const handleSubmitForm = async (values) => {
    console.log(values);
  };

  return (
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
              <span className="p-pd-hp-s-pi-main-text">Sang Nguyen</span>
              <span className="u-pf-sb-pt-icon">
                <FontAwesomeIcon className="vip-customer" icon={faCrown} />
                <span className="u-pf-sb-pt-sub-text-type">Gold customer</span>
              </span>
              <span className="p-pd-hp-s-pi-sub-text">
                <b>Birthday:</b> 2022-04-12T17:00:00.000Z
              </span>
              <span className="p-pd-hp-s-pi-sub-text-medium">
                <b>Gender:</b> Male
                <FontAwesomeIcon className="mars-icon" icon={faMars} />
              </span>
              <span className="p-pd-hp-s-pi-sub-text">
                <b>Delivery address:</b> 399/36 Ly Thai To, ward 2, district 10,
                Ho Chi Minh city.
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
                  <ButtonGroup gap={10} float="center" mgTop={10} mgBottom={5}>
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
                    Acceptable file sizes: File sizes are limited by the upload
                    timeout, so we recommend files that are less than 25 MB per
                    file uploaded (either individually or in a zip file). Tastie
                    will resize each image file down to 1 MB.
                  </span>
                </div>
              </div>
            </Fragment>
          )}
        </div>
        <Formik
          initialValues={initialValues1}
          validateOnChange={false}
          onSubmit={(values) => handleSubmitForm(values)}
        >
          {(formikProps) => {
            const { values, errors, touched } = formikProps;
            return (
              <Fragment>
                <div className="p-pd-body-wrapper">
                  <div className="p-pd-body-title">
                    <FontAwesomeIcon
                      className="p-pd-bt-icon"
                      icon={showEditBI ? faMinusSquare : faPlusSquare}
                      onClick={() => setShowEditBI((prev) => !prev)}
                    />
                    <span className="p-pd-title-text">Basic Info</span>
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
                          onChange={(e) => setImageURL(e.target.value)}
                          placeholder={"First name"}
                        />
                        —
                        <input
                          type="text"
                          name="lastname"
                          placeholder={"Last name"}
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
                          placeholder={"Email"}
                          disabled
                          style={{ width: "526px" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Fragment>
            );
          }}
        </Formik>
        <div className="p-pd-body-wrapper">
          <div className="p-pd-body-title">
            <FontAwesomeIcon
              className="p-pd-bt-icon"
              icon={showEditCI ? faMinusSquare : faPlusSquare}
              onClick={() => setShowEditCI((prev) => !prev)}
            />
            Contact and basic info
          </div>
          {showEditCI && <Fragment></Fragment>}
        </div>
        <div className="p-pd-footer-wrapper">c</div>
      </div>
    </Fragment>
  );
}

ProfileDetail.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(connect(mapStateToProps, null)(ProfileDetail));
