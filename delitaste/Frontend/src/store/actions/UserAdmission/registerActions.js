import {
  SET_REGISTER_STEP,
  SET_USER_FORM_DATA,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "store/actions/types";

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
/*
export const submitDataForm = (formData) => {
  const { firstname, lastname, phone, email, password } = formData;
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      firstname,
      lastname,
      phone,
      email,
      password,
    });
    try {
      const res = await axios.post("/api/users", body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      //if any errors, dispatch another action here to show alerts.
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
};
*/
//YUP
