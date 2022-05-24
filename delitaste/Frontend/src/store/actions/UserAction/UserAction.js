import axios from "axios";

import {
  UPDATE_REGISTER_STEP_STYLING,
  UPDATE_REGISTRATION_FORM,
  MAP_REGISTRATION_FORM,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_ALERT_NOTIFICATION,
  REMOVE_ALERT_NOTIFICATION,
  CHECK_DUPLICATION_SUCCESS,
  SET_EMAIL_VERIFICATION_CODE,
  SET_EMAIL_VERIFICATION_STATUS,
  GET_PROFILE_SUCCESS,
  SET_LOADING,
  SIGN_OUT,
  GET_CONTACT,
} from "store/actions/types";

//UPDATE UI
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
    type: UPDATE_REGISTRATION_FORM,
    payload: { formData: formData },
  });
};

export const mapRegistrationForm = (form, msg) => (dispatch) => {
  dispatch({
    type: MAP_REGISTRATION_FORM,
    payload: { currentForm: form },
  });
};

export const setLoading = (state) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: { isLoading: state },
  });
};

export const userSignOut = () => (dispatch) => {
  dispatch({
    type: SIGN_OUT,
    payload: { isUserAuthenticated: false, profile: null, loginState: false },
  });
};

//REGISTRATION API
//form 1: When user clicks on "Sign Up" button -> call this api to check email & phone duplication
export const checkDuplicationAPI = (email, phone) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    email,
    phone,
  });
  try {
    const endpoint = "v1/api/auth/check-exist-email-and-phone";
    const res = await axios.post(endpoint, body, config);
    const { isPhoneDuplicated, isEmailDuplicated } = res.data;
    if (isPhoneDuplicated || isEmailDuplicated) {
      const alertMsg = "Your account has already in use.";
      dispatch({
        type: SET_ALERT_NOTIFICATION,
        payload: {
          loadingAlert: true,
          msg: alertMsg,
        },
      });
    } else {
      dispatch({
        type: CHECK_DUPLICATION_SUCCESS,
        payload: {},
      });
      dispatch({
        type: REMOVE_ALERT_NOTIFICATION,
        payload: {
          loadingAlert: false,
          msg: "",
        },
      });
    }
  } catch (err) {
    const errs = err.response.data.errors;
    console.log(errs);
  }
};

//form 2: When user clicks on "Verify Email" button -> call this api to insert submittedFormData to database
export const accountRegistrationAPI = (formData) => async (dispatch) => {
  const { email, password, phone, first_name, last_name } = formData;
  const registered_at = new Date().toISOString().slice(0, 10);
  const role = 1;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    first_name,
    last_name,
    phone,
    email,
    password,
    role,
    registered_at,
  });

  try {
    const endpoint = "/v1/api/auth/sign-up";
    const res = await axios.post(endpoint, body, config);
    console.log(res);
    if (res.data.registerState) {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: { formData: res.data },
      });
    } else {
      dispatch({
        type: REGISTER_FAIL,
        payload: res.data.err,
      });
    }
  } catch (err) {
    const errs = err.response.data.errors;
    dispatch({
      type: REGISTER_FAIL,
      payload: errs,
    });
  }
};

export const sendEmailVerificationCodeAPI = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    email,
  });
  try {
    const endpoint = "/v1/api/auth/send-code-with-email";
    const res = await axios.post(endpoint, body, config);

    dispatch({
      type: SET_EMAIL_VERIFICATION_CODE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const checkEmailVerificationCodeAPI = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const endpoint = "/v1/api/auth/verify-code-with-email";
    const res = await axios.post(endpoint, body, config);
    if (res.data.status) {
      dispatch({
        type: SET_EMAIL_VERIFICATION_STATUS,
        payload: { isEmailVerified: res.data.status },
      });
    } else {
      const alertMsg =
        "Your email verified code is incorrect. Please try again.";
      dispatch({
        type: SET_ALERT_NOTIFICATION,
        payload: {
          loadingAlert: true,
          msg: alertMsg,
        },
      });
    }
    return res.data.status;
  } catch (err) {
    console.log(err);
  }
};
//get profile
export const getUserProfileAPI = (accessToken) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ accessToken: accessToken });
  try {
    const endpoint = "/v1/api/auth/get_profile";
    const res = await axios.post(endpoint, body, config);
    if (res.data) {
      dispatch({
        type: GET_PROFILE_SUCCESS,
        payload: {
          profile: res.data.profile,
          provider_id: res.data.provider_id,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getAddressBookAPI = (id) => async (dispatch) => {
  try {
    const endpoint = `/v1/api/tastie/checkout/get_contact/${id}`;
    const res = await axios.get(endpoint);
    console.log(res.data);
    if (res.data?.status) {
      let phone = res.data.response.user_phone;
      let address = res.data.response.user_address;
      dispatch({
        type: GET_CONTACT,
        payload: {
          phone,
          address,
        },
      });
      return { phone, address };
    }
  } catch (err) {
    return { phone: "", address: [] };
  }
};

export const addAddressAPI = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const endpoint = "/v1/api/tastie/add-customer-address";
    const res = await axios.post(endpoint, body, config);
    console.log(res.data);
    if (res.data) {
      console.log(res.data);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getDeliveryFee = (id, longitude, latitude) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    provider_id: id,
    longitude,
    latitude,
  });
  try {
    const endpoint = "/v1/api/tastie/tastie/delivery-fee-to-checkout";
    const res = await axios.post(endpoint, body, config);
    if (res.data) return res.data.delivery_fee;
    return 0;
  } catch (err) {
    console.log(err);
  }
};

export const accountSignInAPI = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const endpoint = "/v1/api/auth/sign-in";
    const res = await axios.post(endpoint, body, config);
    if (res.data.loginState) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
        payload: res.data,
      });
    }
    return {
      state: res.data.loginState || "",
      msg: res.data.loginState ? "" : res.data.err.message,
    };
  } catch (err) {
    const errs = err.response.data.errors;
    console.log(err);
    dispatch({
      type: LOGIN_FAIL,
      payload: errs,
    });
    return false;
  }
};
