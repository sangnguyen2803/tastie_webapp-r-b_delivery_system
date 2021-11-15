import {
  UPDATE_REGISTER_STEP_STYLING,
  UPDATE_REGISTRATION_FORM_DATA,
  MAP_REGISTRATION_FORM,
} from "store/actions/types";
import {} from "store/actions/types";

const initialState = {
  styling: ["active", "default", "default", "default"],
  formData: {},
  currentForm: 0,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case MAP_REGISTRATION_FORM:
      return { ...state, ...payload };
    case UPDATE_REGISTER_STEP_STYLING:
      return { ...state, ...payload };
    case UPDATE_REGISTRATION_FORM_DATA:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
