import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
//assets
import Logo from "assets/logo.png";
import FacebookLogo from "assets/Icon/facebook.png";
import GoogleLogo from "assets/Icon/google.png";
import { useTranslation } from "react-i18next";
//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faTimes,
  faEyeSlash,
  faEye,
} from "@fortawesome/fontawesome-free-solid";
//scss
import "style/Common.scss";
import "./LoginForm.scss";

function LoginForm(props) {
  const { t, i18n } = useTranslation("translation", {
    keyPrefix: "userAdmission.signIn",
  });
  const [functionalIcon, setFunctionalIcon] = useState({
    enableRemoveText: false,
    enablePasswordVisibility: false,
  });
  const [userLoginInfo, setUserLoginInfo] = useState({
    email: "",
    password: "",
  });
  const updateUserLoginInfo = (e) =>
    setUserLoginInfo({ ...userLoginInfo, [e.target.name]: e.target.value });
  const loadClearTextInput = (inputType = "email") => {
    if (functionalIcon.enableRemoveText)
      return (
        <FontAwesomeIcon
          className="remove-text-icon"
          onClick={() => {
            userLoginInfo[inputType] = "";
          }}
          icon={faTimes}
        />
      );
  };
  const loadPasswordVisibility = () => {
    if (functionalIcon.enablePasswordVisibility)
      return (
        <FontAwesomeIcon
          className="eye-show-icon"
          onClick={() =>
            setFunctionalIcon({
              ...functionalIcon,
              enablePasswordVisibility:
                !functionalIcon.enablePasswordVisibility,
            })
          }
          icon={faEye}
        />
      );
    else
      return (
        <FontAwesomeIcon
          className="eye-slash-icon"
          onClick={() =>
            setFunctionalIcon({
              ...functionalIcon,
              enablePasswordVisibility:
                !functionalIcon.enablePasswordVisibility,
            })
          }
          icon={faEyeSlash}
        />
      );
  };

  return (
    <div className="login-section">
      <div className="login-form">
        <div className="login-form-wrapper">
          <div className="form-header">
            <img className="brand-logo-image-login" src={Logo} />
            <span className="login-form-title">Tastie!</span>
          </div>
          <div
            className="login-input-wrapper"
            onMouseOver={() =>
              setFunctionalIcon({
                ...functionalIcon,
                enableRemoveText: true,
              })
            }
            onMouseLeave={() =>
              setFunctionalIcon({
                ...functionalIcon,
                enableRemoveText: false,
              })
            }
          >
            <div className="form-label-login">{t("sign-in-username")}</div>
            <input
              className="login-input-username form-text-field"
              value={userLoginInfo.email}
              name="email"
              onChange={(e) => updateUserLoginInfo(e)}
              type="text"
              placeholder="Email or phone number"
              maxLength={50}
            />
            {loadClearTextInput("email")}
          </div>

          <div className="login-input-wrapper">
            <div className="form-label-login">{t("sign-in-password")}</div>
            <input
              className="login-input-password form-text-field"
              type={
                functionalIcon.enablePasswordVisibility ? "text" : "password"
              }
              placeholder="Password"
              maxLength={50}
            />
            {loadPasswordVisibility()}
          </div>
          <label className="remember-me-wrapper">
            <input type="checkbox" />
            <span className="remember-me">{t("sign-in-remember-me")}</span>
          </label>

          <button className="btn-form btn-login-position">
            <div className="none-icon"></div>
            {t("sign-in-button")}
            <FontAwesomeIcon className="chevron-icon" icon={faChevronRight} />
          </button>
          <div className="link-forget-password">
            <a>{t("sign-in-forget-password")}</a>
          </div>
          <div className="form-seperator">-OR-</div>
          <button className="btn-sign-up-google">
            <img
              className="google-icon"
              alt="Google sign-in"
              src={GoogleLogo}
            />
            <div className="sign-up-label-gooogle">
              {t("sign-in-with-google")}
            </div>
          </button>
          <button className="btn-sign-up-facebook">
            <img
              className="facebook-icon"
              alt="Facebook sign-in"
              src={FacebookLogo}
            />
            <div className="sign-up-label-facebook">
              {t("sign-in-with-facebook")}
            </div>
          </button>
          <div className="policy">
            By continuing, you agree to DeliTaste's{" "}
            <b className="text-3">Terms of Service, Privacy Policy</b>
          </div>
          <div className="label-redirect-sign-up">
            Not a member of Delitaste yet?
            <Link className="redirect-sign-up" to="/sign-up">
              {" "}
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LoginForm);
