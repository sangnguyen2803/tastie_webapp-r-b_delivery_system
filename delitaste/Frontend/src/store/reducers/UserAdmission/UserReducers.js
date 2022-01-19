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
  GET_PROFILE_SUCCESS,
  RETRIEVE_TOKEN,
  SET_LOADING,
  SIGN_OUT,
} from "store/actions/types";
import {} from "store/actions/types";

const initialState = {
  currentForm: 0,
  formData: {},
  isEmailVerified: false,
  isUserAuthenticated: false,
  isLoading: true, //loading component after calling api.
  loginState: false,
  providerId: -1,
  profile: null,
  styling: ["active", "default", "default", "default"],
  refreshToken: localStorage.getItem("refreshToken"),
  verifiedEmailToken: localStorage.getItem("verified_email_token"),
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("refreshToken", payload.refreshtoken);
      return {
        ...state,
        ...payload,
        currentForm: 2,
        profile: payload.profile,
        styling: ["finished", "finished", "active", "default"],
        isUserAuthenticated: true,
      };
    case REGISTER_FAIL:
      localStorage.removeItem("refreshToken");
      return {
        ...state,
        ...payload,
        refreshToken: null,
        isUserAuthenticated: false,
        profile: null,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("refreshToken", payload.refreshToken);
      return {
        ...state,
        ...payload,
        refreshToken: payload.refreshToken,
        profile: payload.profile,
        isUserAuthenticated: true,
      };
    case LOGIN_FAIL:
      localStorage.removeItem("refreshToken");
      return {
        ...state,
        ...payload,
        profile: null,
        isUserAuthenticated: true,
      };
    case SIGN_OUT:
      localStorage.removeItem("refreshToken");
      return {
        ...state,
        ...payload,
        refreshToken: null,
      };
    case CHECK_DUPLICATION_SUCCESS:
      return {
        ...state,
        ...payload,
        isForm1Submitted: true,
        currentForm: 1,
        styling: ["finished", "active", "default", "default"],
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
      };

    case SET_LOADING:
      return { ...state, ...payload };
    case MAP_REGISTRATION_FORM:
      return { ...state, ...payload };
    case UPDATE_REGISTER_STEP_STYLING:
      return { ...state, ...payload };
    case UPDATE_REGISTRATION_FORM:
      return { ...state, ...payload };
    case SET_EMAIL_VERIFICATION_STATUS:
      return { ...state, ...payload };
    case GET_PROFILE_SUCCESS:
      return { ...state, ...payload };
    case RETRIEVE_TOKEN:
      return { ...state, ...payload };
    default:
      return state;
  }
}
