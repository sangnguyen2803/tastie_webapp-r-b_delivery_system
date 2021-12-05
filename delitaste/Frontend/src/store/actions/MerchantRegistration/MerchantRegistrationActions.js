import axios from "axios";

import {
  UPDATE_MERCHANT_SUCCESS,
  UPDATE_MERCHANT_FAIL,
} from "store/actions/types";

export const updateMerchantFormAPI = (formData) => async (dispatch) => {
  const update_at = new Date().toISOString().slice(0, 10);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    formData,
    update_at,
  });

  try {
    const endpoint = "/v1/api/merchant-registration/update-form";
    const res = await axios.post(endpoint, body, config);
    if (res.data.updateState) {
      dispatch({
        type: UPDATE_MERCHANT_SUCCESS,
        payload: { formData: res.data },
      });
    } else {
      dispatch({
        type: UPDATE_MERCHANT_FAIL,
        payload: res.data.err,
      });
    }
  } catch (err) {
    const errs = err.response.data.errors;
    dispatch({
      type: UPDATE_MERCHANT_FAIL,
      payload: errs,
    });
  }
};
