import {
  UPDATE_REGISTER_STEP_STYLING,
  UPDATE_REGISTRATION_FORM,
  MAP_REGISTRATION_FORM,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CHECK_DUPLICATION_SUCCESS,
} from "store/actions/types";
import {} from "store/actions/types";

const initialState = {
  currentForm: 0,
  formData: {},
  isAuthenticated: false,
  styling: ["active", "default", "default", "default"],
  token: localStorage.getItem("refresh_token"),
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
        currentForm: 1,
        styling: ["finished", "active", "default", "default"],
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("refresh_token", payload.refreshtoken);
      return {
        ...state,
        ...payload,
        currentForm: 2,
        styling: ["finished", "finished", "active", "default"],
      };
    case REGISTER_FAIL:
      localStorage.removeItem("refresh_token");
      return {
        ...state,
        ...payload,
        token: null,
      };
    default:
      return state;
  }
}
