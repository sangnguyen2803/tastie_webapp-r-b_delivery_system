import { SET_REGISTER_STEP, SET_USER_FORM_DATA } from "actions/types";
export const setRegisterStep = (stepStyle) => (dispatch) => {
  const stepStyling = {
    styling: [
      "register-step step-icon-" + stepStyle[0],
      "register-step step-icon-" + stepStyle[1],
      "register-step step-icon-" + stepStyle[2],
      "register-step step-icon-" + stepStyle[3],
    ],
  };
  dispatch({
    type: SET_REGISTER_STEP,
    payload: stepStyling,
  });
};
export const setRegisterFormData = (formData) => (dispatch) => {
  dispatch({
    type: SET_USER_FORM_DATA,
    payload: formData,
  });
};
