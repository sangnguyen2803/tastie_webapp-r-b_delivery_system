import withAuth from "components/HigherOrderComponents(HOC)/withAuth";
import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Avatar from "assets/avatar.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExchangeAlt,
  faGlobe,
  faKey,
  faLanguage,
  faLock,
  faSignLanguage,
  faUserCog,
} from "@fortawesome/fontawesome-free-solid";
import { Formik, Form, Field } from "formik";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import "./AccountSetting.scss";
const LABEL_SIZE = 150;
const initialValues1 = {
  oldPassword: "",
  newPassword: "",
  recheckPassword: "",
};

function AccountSetting(props) {
  const [showEditPassword, setShowEditPassword] = useState(true);
  const handleSubmitForm1 = async (values) => {
    console.log(values);
  };
  return (
    <Fragment>
      <div className="profile-pd-container">
        <div
          className="p-cp-title"
          style={{
            margin: "10px 0 0 0",
            alignSelf: "flex-start",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 10,
            fontSize: 16,
          }}
        >
          <FontAwesomeIcon
            icon={faUserCog}
            style={{ color: "#303030", marginRight: 10 }}
          />
          <span>Account Settings</span>
        </div>
        <div
          className="p-pd-body-wrapper"
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 10,
            width: "calc(100% - 25px)",
            paddingLeft: 25,
            margin: "10px 0",
          }}
        >
          <img src={Avatar} className="setting-head-img" alt="avatar" />
          <span className="setting-head-text">
            <span>
              <b>{props.user.profile?.email}</b>
            </span>
            <span
              onClick={() => props.history.push("/profile/edit")}
              style={{ fontSize: 12, cursor: "pointer", color: "#610000" }}
            >
              Go to edit profile
            </span>
          </span>
        </div>
        <div className="p-pd-body-wrapper">
          <div className="p-pd-body-title">
            <span className="p-pd-title-text">
              <FontAwesomeIcon
                icon={faLock}
                style={{ color: "#303030", marginRight: 10 }}
              />
              <span>Account Security</span>
            </span>
          </div>
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
                <div className="p-pd-general-profile-wrapper">
                  <div className="p-pd-general-profile-row">
                    <span
                      className="p-pd-b-gp-label"
                      style={{ width: LABEL_SIZE }}
                    >
                      Username:
                    </span>
                    <Field
                      type="text"
                      name="username"
                      style={{ backgroundColor: "#F1F1F1" }}
                      value={props.user.profile?.email}
                      placeHolder={"Current password"}
                      className="p-pd-b-iu-input-general"
                    />
                  </div>
                  <div className="p-pd-general-profile-row">
                    <span
                      className="p-pd-b-gp-label"
                      style={{ width: LABEL_SIZE }}
                    >
                      Current password:
                    </span>
                    <Field
                      type="password"
                      nam
                      e="oldPassword"
                      placeHolder={"Current password"}
                      className="p-pd-b-iu-input-general"
                    />
                  </div>
                  <div className="p-pd-general-profile-row">
                    <span
                      className="p-pd-b-gp-label"
                      style={{ width: LABEL_SIZE }}
                    >
                      New password:
                    </span>
                    <Field
                      type="password"
                      name="newPassword"
                      placeHolder={"New password"}
                      className="p-pd-b-iu-input-general"
                    />
                  </div>
                  <div className="p-pd-general-profile-row">
                    <span
                      className="p-pd-b-gp-label"
                      style={{ width: LABEL_SIZE }}
                    >
                      Retype new password:
                    </span>
                    <Field
                      type="password"
                      name="recheckPassword"
                      placeHolder={"Confirm new password"}
                      className="p-pd-b-iu-input-general"
                    />
                  </div>{" "}
                  <span style={{ fontSize: 12 }}>
                    Make sure it's at least 15 characters OR at least 8
                    characters including a number and a lowercase letter.
                  </span>
                  <ButtonGroup
                    mgLeft={155}
                    mgTop={5}
                    mgBottom={5}
                    float={"flex-start"}
                  >
                    <Button
                      width={140}
                      height={25}
                      fontSize={13}
                      color={"black"}
                      marginTop={20}
                      bglight={true}
                      border={"#5d5d5d 1.5px solid"}
                      justifyContent={"center"}
                      label="Change Password"
                    />
                  </ButtonGroup>
                </div>
              </Fragment>
            );
          }}
        </Formik>
        <div className="p-pd-body-wrapper">
          <div className="p-pd-body-title">
            <span className="p-pd-title-text">
              <FontAwesomeIcon
                icon={faKey}
                style={{ color: "#303030", marginRight: 10 }}
              />
              <span>Reset password</span>
            </span>
          </div>
        </div>
        <div className="p-pd-general-profile-wrapper">
          <span style={{ fontSize: 12 }}>
            Lost your password? Please enter your email address. You will
            receive a link to create a new password via email.
          </span>
          <div className="p-pd-general-profile-row">
            <span className="p-pd-b-gp-label" style={{ width: LABEL_SIZE }}>
              Registered email:
            </span>
            <input
              type="text"
              name="forget_password_email"
              placeHolder={"Enter your email"}
              className="p-pd-b-iu-input-general"
              style={{ width: 500 }}
            />
          </div>
          <ButtonGroup mgLeft={155} mgTop={5} mgBottom={5} float={"flex-start"}>
            <Button
              width={140}
              height={25}
              fontSize={13}
              color={"black"}
              marginTop={20}
              bglight={true}
              border={"#5d5d5d 1.5px solid"}
              justifyContent={"center"}
              label="Reset password"
            />
          </ButtonGroup>
        </div>
        <div className="p-pd-body-wrapper">
          <div className="p-pd-body-title">
            <span className="p-pd-title-text">
              <FontAwesomeIcon
                icon={faGlobe}
                style={{ color: "#303030", marginRight: 10 }}
              />
              <span>Language Settings</span>
            </span>
          </div>
        </div>
        <div className="p-pd-general-profile-wrapper">
          <span style={{ fontSize: 12 }}>
            Select the language right below to change current web context.
          </span>
          <div className="p-pd-general-profile-row">
            <span className="p-pd-b-gp-label" style={{ width: LABEL_SIZE }}>
              Language:
            </span>
            <select className="p-pd-b-iu-input-general-select-3" name="city">
              <option value="" disabled hidden>
                Select a language...
              </option>
              <option value={"en"} label={"English"} />
              <option value={"fr"} label={"French"} />
              <option value={"vi"} label={"Vietnamese"} />
            </select>
          </div>
          <ButtonGroup mgLeft={155} mgTop={5} mgBottom={5} float={"flex-start"}>
            <Button
              width={140}
              height={25}
              fontSize={13}
              color={"black"}
              marginTop={20}
              bglight={true}
              border={"#5d5d5d 1.5px solid"}
              justifyContent={"center"}
              label="Set language"
            />
          </ButtonGroup>
        </div>
      </div>
    </Fragment>
  );
}

AccountSetting.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});

export default withRouter(
  withAuth(connect(mapStateToProps, null)(AccountSetting))
);
