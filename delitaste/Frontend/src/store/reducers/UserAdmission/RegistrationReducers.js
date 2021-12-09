import {
  UPDATE_REGISTER_STEP_STYLING,
  UPDATE_REGISTRATION_FORM,
  MAP_REGISTRATION_FORM,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CHECK_DUPLICATION_SUCCESS,
  SET_EMAIL_VERIFICATION_CODE,
  SET_EMAIL_VERIFICATION_STATUS,
} from "store/actions/types";
import {} from "store/actions/types";

const initialState = {
  currentForm: 0,
  formData: {},
  isEmailSent: false,
  isEmailVerified: false,
  isUserAuthenticated: false,
  loginState: false,
  profile: null,
  styling: ["active", "default", "default", "default"],
  refreshToken: localStorage.getItem("refresh_token"),
  verifiedEmailToken: localStorage.getItem("verified_email_token"),
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case MAP_REGISTRATION_FORM:
      return { ...state, ...payload };
    case UPDATE_REGISTER_STEP_STYLING:
      return { ...state, ...payload };
    case UPDATE_REGISTRATION_FORM:
      return { ...state, ...payload };
    case CHECK_DUPLICATION_SUCCESS:
      return {
        ...state,
        ...payload,
        isForm1Submitted: true,
        currentForm: 1,
        styling: ["finished", "active", "default", "default"],
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("refresh_token", payload.refreshtoken);
      return {
        ...state,
        ...payload,
        currentForm: 2,
        profile: payload.profile,
        styling: ["finished", "finished", "active", "default"],
        isUserAuthenticated: true,
      };
    case REGISTER_FAIL:
      localStorage.removeItem("refresh_token");
      return {
        ...state,
        ...payload,
        refreshToken: null,
        isUserAuthenticated: false,
        profile: null,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("refresh_token", payload.refreshtoken);
      return {
        ...state,
        ...payload,
        profile: payload.profile,
        isUserAuthenticated: true,
      };
    case LOGIN_FAIL:
      localStorage.removeItem("refresh_token");
      return {
        ...state,
        ...payload,
        profile: null,
        refreshToken: null,
        isUserAuthenticated: false,
      };
    case SET_EMAIL_VERIFICATION_CODE:
      localStorage.setItem(
        "verified_email_token",
        payload.result.verifyEmailToken
      );
      return {
        ...state,
        ...payload,
        verifiedEmailToken: payload.result.verifyEmailToken,
        isEmailSent: true,
      };
    case SET_EMAIL_VERIFICATION_STATUS:
      return { ...state, ...payload };
    default:
      return state;
  }
}
