import { SET_REGISTER_STEP, SET_USER_FORM_DATA } from "actions/types";

const initialState = {
  styling: [
    "register-step step-icon-active",
    "register-step step-icon-default",
    "register-step step-icon-default",
    "register-step step-icon-default",
  ],
  formData: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_REGISTER_STEP:
      return { ...state, ...payload };
    case SET_USER_FORM_DATA:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
