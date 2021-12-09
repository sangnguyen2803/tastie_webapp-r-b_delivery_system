import axios from "axios";

import {
  AUTH_SUCCESS,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "store/actions/types";

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
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
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
