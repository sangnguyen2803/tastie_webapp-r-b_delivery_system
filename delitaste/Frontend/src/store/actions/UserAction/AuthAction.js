import axios from "axios";

import { RETRIEVE_TOKEN } from "store/actions/types";

export const getAccessTokenAPI = (refreshToken) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ token: refreshToken });
  try {
    const endpoint = "/v1/api/auth/get-access-token";
    const res = await axios.post(endpoint, body, config);
    if (res.data) {
      dispatch({
        type: RETRIEVE_TOKEN,
        payload: { isUserAuthenticated: res.data.isAuth },
      });
    }
    if (res.data.isAuth) return res.data;
    return null;
  } catch (err) {
    console.log(err);
    const errs = err.response.data.errors;
    console.log(errs);
  }
};
