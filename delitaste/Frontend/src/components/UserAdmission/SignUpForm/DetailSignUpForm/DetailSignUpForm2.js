import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
//scss
import "./DetailSignUpForm.scss";
import "style/Common.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import {
  faPencilAlt,
  faTrashAlt,
  faIdCardAlt,
  faMapMarkerAlt,
  faUpload,
  faChevronRight,
  faAddressBook,
  faBuilding,
  faHome,
} from "@fortawesome/fontawesome-free-solid";
import DefaultAvatar from "../../../../assets/default-avatar.png";
import CurrentAvatar from "../../../../assets/avatar.png";
import cities from "../../../../assets/json_location/city";
import districts from "../../../../assets/json_location/district";
import MapDialog from "./MapDialog";
import AvatarEdit from "./AvatarEdit";

function DetailSignUpForm2(props) {
  //jsx
  const [userProfilePic, setUserProfilePic] = useState(DefaultAvatar);
  const [selectedCode, setSelectedCode] = useState({
    cityCode: "",
    districtCode: "",
    value: "",
  });
  const inputFile = useRef(null);
  const [showMapDialog, setShowMapDialog] = useState(false);
  const [avatarState, setAvatarState] = useState("upload");
  const [avatarIconState, setAvatarIconState] = useState(faUpload);

  const onButtonClick = () => {
    inputFile.current.click();
    setUserProfilePic(CurrentAvatar);
    setAvatarIconState(faPencilAlt);
    setAvatarState("edit");
  };
  const getPosition = () => {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  };

  const selectedAddressType = {
    border: "1px solid #101010",
    backgroundColor: "#f6f6f6",
    width: 105,
  };
  const [addressType, setAddressType] = useState(1);
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const relocating = async (values) => {
    var position = await getPosition();
    const { latitude, longitude } = position.coords;
    const endpoint = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=05e76b96155e447ba0391d645ce81d27`;
    let res = await axios.get(endpoint);
    var address = "";
    if (res.data) {
      address = res.data?.features[0]?.properties?.formatted || "";
    }
    setLatitude(latitude);
    setLongitude(longitude);
    setAddress(address);
  };
  return (
    <>
      <div className="detail-profile-wrapper">
        <div className="form-title-wrapper">
          <FontAwesomeIcon className="form-icon" icon={faIdCardAlt} />
          <span className="form-title">Update profile</span>
        </div>
        <div className="avatar-uploader-wrapper">
          <div className="label-sign-up form-label">Profile photo</div>
          <div className="avatar-uploader-detail-wrapper">
            <div className="image-preview">
              <img
                className="profile-photo-small-size"
                src={userProfilePic}
                alt="profile_pic"
              />
            </div>
            <div
              disabled={avatarState === "edit"}
              onClick={onButtonClick}
              className="form-icon-edit"
            >
              <FontAwesomeIcon
                onClick={
                  avatarState === "upload"
                    ? () => setAvatarState("uploading")
                    : avatarState === "edit"
                    ? () => setAvatarState("editting")
                    : null
                }
                icon={avatarIconState}
              />
              <input
                type="file"
                id="file"
                ref={inputFile}
                style={{ display: "none" }}
              />
            </div>
            <div
              disabled={avatarState === "edit"}
              onClick={onButtonClick}
              className="form-icon-delete"
            >
              <FontAwesomeIcon
                onClick={() => {
                  setUserProfilePic(DefaultAvatar);
                  setAvatarState("upload");
                  setAvatarIconState(faUpload);
                }}
                icon={faTrashAlt}
              />
            </div>
          </div>
        </div>
        <div className="gender-wrapper" style={{ margin: "20px 0" }}>
          <div className="label-sign-up form-label">Gender</div>
          <div className="gender-detail-wrapper">
            <label className="gender-type-wrapper">
              <input type="radio" name="gender" value="Male" />
              <span className="label-radio">Male</span>
            </label>
            <label className="gender-type-wrapper">
              <input type="radio" name="gender" value="Female" />
              <span className="label-radio">Female</span>
            </label>
            <label className="gender-type-wrapper">
              <input type="radio" name="gender" value="Others" />
              <span className="label-radio">Others</span>
            </label>
          </div>
        </div>
        <div className="date-of-birth-wrapper">
          <div className="label-sign-up form-label">Birthday</div>
          <input
            className="sign-up-birthday form-text-field"
            type="date"
            id="birthday"
            name="birthday"
          />
        </div>
        <ButtonGroup mgLeft={100} mgTop={10} mgBottom={10}>
          <Button
            width={170}
            height={30}
            fontSize={13}
            color={"black"}
            marginTop={20}
            bglight={true}
            border={"#5d5d5d 1.5px solid"}
            justifyContent={"center"}
            label="Enable Geolocation"
            prefix={
              <FontAwesomeIcon className="button-icon" icon={faMapMarkerAlt} />
            }
            onClick={() => relocating()}
          />
        </ButtonGroup>
        <div className="address-wrapper">
          <div className="label-sign-up form-label">Address</div>

          <div className="dynamic-address-detail-wrapper">
            <input
              className="sign-up-address form-text-field"
              value={address}
              type="text"
              id="address"
              name="address"
              disabled={true}
            />
          </div>
        </div>
        <ButtonGroup mgTop={10} mgBottom={10} mgLeft={100} gap={5}>
          <div
            className="p-pd-a-item address-type-style"
            onClick={() => setAddressType(1)}
            style={addressType === 1 ? selectedAddressType : { width: 105 }}
          >
            <div className="p-pd-a-image-wrapper">
              <FontAwesomeIcon icon={faHome} className="p-pd-a-icon" />
            </div>
            <span className="p-pd-a-label-radio">House</span>
          </div>
          <div
            className="p-pd-a-item"
            onClick={() => setAddressType(2)}
            style={
              addressType === 2 ? selectedAddressType : { width: 105, gap: 5 }
            }
          >
            <div className="p-pd-a-image-wrapper">
              <FontAwesomeIcon icon={faBuilding} className="p-pd-a-icon" />
            </div>
            <span className="p-pd-a-label-radio">Workplace</span>
          </div>
          <div
            className="p-pd-a-item"
            onClick={() => setAddressType(3)}
            style={addressType === 3 ? selectedAddressType : { width: 105 }}
          >
            <div className="p-pd-a-image-wrapper">
              <FontAwesomeIcon icon={faAddressBook} className="p-pd-a-icon" />
            </div>
            <span className="p-pd-a-label-radio">Other</span>
          </div>
        </ButtonGroup>
      </div>
      <div className="button-group">
        <button className="btn-skip-form btn-size">
          <div className="none-icon"></div>
          Skip
          <FontAwesomeIcon className="chevron-icon" icon={faChevronRight} />
        </button>
        <button className="btn-form btn-size">
          <div className="none-icon"></div>
          Update
          <FontAwesomeIcon className="chevron-icon" icon={faChevronRight} />
        </button>
      </div>
      <MapDialog
        showMapDialog={showMapDialog}
        setShowMapDialog={setShowMapDialog}
      />
      <AvatarEdit
        userProfilePic={userProfilePic}
        setUserProfilePic={setUserProfilePic}
        avatarState={avatarState}
        setAvatarState={setAvatarState}
      />
    </>
  );
}

export default DetailSignUpForm2;
