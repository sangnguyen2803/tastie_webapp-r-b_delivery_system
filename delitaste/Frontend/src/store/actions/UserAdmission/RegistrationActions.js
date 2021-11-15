import {
  UPDATE_REGISTER_STEP_STYLING,
  UPDATE_REGISTRATION_FORM_DATA,
  MAP_REGISTRATION_FORM,
  LOAD_REGISTER_FORM,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "store/actions/types";

export const updateStepStyling = (stepStyle) => (dispatch) => {
  dispatch({
    type: UPDATE_REGISTER_STEP_STYLING,
    payload: {
      styling: stepStyle,
    },
  });
};

export const updateRegistrationFormData = (formData) => (dispatch) => {
  dispatch({
    type: UPDATE_REGISTRATION_FORM_DATA,
    payload: formData,
  });
};

export const mapRegistrationForm = (form, msg) => (dispatch) => {
  dispatch({
    type: MAP_REGISTRATION_FORM,
    payload: { currentForm: form },
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
