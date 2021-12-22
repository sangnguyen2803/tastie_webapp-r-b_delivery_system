import axios from "axios";

import {
  UPDATE_MERCHANT_SUCCESS,
  UPDATE_MERCHANT_FAIL,
  CREATE_MERCHANT,
  UPDATE_SERVICE_INFO_FORM,
} from "store/actions/types";

//create provider
export const createMerchantAPI = (id) => async (dispatch) => {
  const registered_at = new Date().toISOString().slice(0, 10);
  const update_at = new Date().toISOString().slice(0, 10);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    registered_at,
    update_at,
    user_id: id,
  });
  try {
    const endpoint = "/v1/api/provider/sign-contract";
    const res = await axios.post(endpoint, body, config);
    if (res?.data.status) {
      dispatch({
        type: CREATE_MERCHANT,
        payload: { merchantId: res.data.result.insertId },
      });
      return res.data.result.insertId;
    }
    return -1;
  } catch (err) {
    const errs = err.response.data.errors;
    return -1;
  }
};
// update form 1:
export const updateServiceInfoFormAPI = (id, data) => async (dispatch) => {
  data.update_at = new Date().toISOString().slice(0, 10);
  data.registered_at = new Date().toISOString().slice(0, 10);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const endpoint = `/v1/api/provider/register/${id}/basic-info`;
    const res = await axios.post(endpoint, body, config);
    if (res.data?.state) {
      dispatch({
        type: UPDATE_SERVICE_INFO_FORM,
        payload: { isServiceFormSubmitted: true },
      });
      return true;
    }
    return false;
  } catch (err) {
    console.log(err.response.data.errors);
    return false;
  }
};
