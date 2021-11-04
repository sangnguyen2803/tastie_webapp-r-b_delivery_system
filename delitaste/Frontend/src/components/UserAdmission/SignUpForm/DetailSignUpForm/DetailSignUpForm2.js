import React, { useState, useEffect, useRef } from "react";
import Fragment from "react";
import "./DetailSignUpForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrashAlt,
  faIdCardAlt,
  faMapMarkerAlt,
  faUpload,
  faChevronRight,
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
  const [address, setAddress] = useState("");
  const [showMapDialog, setShowMapDialog] = useState(false);
  const [avatarState, setAvatarState] = useState("upload");
  const [avatarIconState, setAvatarIconState] = useState(faUpload);
  useEffect(() => {
    setAddress("");
    const cityAddress = cities.filter(
      (city) => city.code === selectedCode.cityCode
    );
    const districtAddress = districts.filter(
      (district) => district.code === selectedCode.districtCode
    );
    selectedCode.value = selectedCode.value.replace(
      /[^a-zA-Z0-9/ áàạảãăắằẳẵặâấầẩẫậóòỏõọôốồổỗộơớờợởỡúùủũụưứừửữựéèẻẽẹêểếềệễĐđíìỉĩị']/g,
      ""
    );
    setAddress(
      (selectedCode.value ? `${selectedCode.value}, ` : "") +
        (selectedCode.districtCode
          ? `${districtAddress[0].name}${
              districtAddress[0].type === "huyen" ||
              districtAddress[0].type === "quan"
                ? " district, "
                : " city, "
            }`
          : "") +
        (selectedCode.cityCode
          ? `${cityAddress[0].name}${
              cityAddress[0].type === "tinh" ? " province, " : " city, "
            }`
          : "") +
        "Viet Nam"
    );
  }, [selectedCode]);

  const updateDetailAddress = (e) => {
    setSelectedCode({ ...selectedCode, value: e.target.value });
  };
  const openSelectMapDialog = () => {
    {
      setShowMapDialog((prev) => !prev);
    }
  };
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
    setUserProfilePic(CurrentAvatar);
    setAvatarIconState(faPencilAlt);
    setAvatarState("edit");
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
              ></img>
            </div>
            <button
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
            </button>
            <button
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
            </button>
          </div>
        </div>
        <div className="gender-wrapper">
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
        <div className="address-wrapper">
          <div className="label-sign-up form-label">Address</div>
          <div className="dynamic-address-detail-wrapper">
            <input
              className="sign-up-address form-text-field"
              value={address}
              type="text"
              disabled
              id="address"
              name="address"
            />
            <FontAwesomeIcon
              onClick={openSelectMapDialog}
              className="form-icon-map"
              icon={faMapMarkerAlt}
            />
          </div>
        </div>
        <div className="address-detail-wrapper">
          <div className="address-input-detail-wrapper">
            <div className="address-detail-sign-up form-label">Country</div>
            <select
              defaultValue="Viet Nam"
              className="sign-up-detail-address form-text-field"
            >
              <option value="" selected disabled hidden>
                Select a country...
              </option>
              <option>Việt Nam</option>
            </select>
          </div>
          <div className="address-input-detail-wrapper">
            <div className="address-detail-sign-up form-label">City</div>
            <select
              onChange={(e) => {
                setSelectedCode({
                  ...selectedCode,
                  cityCode: e.target.value,
                  districtCode: "",
                });
              }}
              className="sign-up-detail-address form-text-field"
            >
              <option value="" selected disabled hidden>
                Select a city...
              </option>
              {cities.map((city) => (
                <option key={city.code} value={city.code}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div className="address-input-detail-wrapper">
            <div className="address-detail-sign-up form-label">District</div>

            <select
              onChange={(e) =>
                setSelectedCode({
                  ...selectedCode,
                  districtCode: e.target.value,
                })
              }
              className="sign-up-detail-address form-text-field"
            >
              <option value="" selected disabled hidden>
                Select a district...
              </option>
              {districts
                .filter((item) => item.parent_code === selectedCode.cityCode)
                .map((district) => (
                  <option key={district.code} value={district.code}>
                    {district.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="address-input-detail-wrapper">
            <div className="address-detail-sign-up form-label">Road/Ward</div>
            <input
              placeholder="Type your address..."
              onChange={(e) => updateDetailAddress(e)}
              className="sign-up-detail-address-input form-text-field"
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="button-group">
        <button className="btn-skip-form btn-size">
          <div className="none-icon"></div>
          Skip
          <FontAwesomeIcon className="chevron-icon" icon={faChevronRight} />
        </button>
        <button className="btn-login-form btn-size">
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
