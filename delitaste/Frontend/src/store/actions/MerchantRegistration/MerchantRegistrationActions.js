import axios from "axios";

import {
  UPDATE_MERCHANT_SUCCESS,
  UPDATE_MERCHANT_FAIL,
  CREATE_MERCHANT,
  UPDATE_SERVICE_INFO_FORM,
  UPDATE_REPRESENTATIVE_INFO_FORM,
  UPDATE_BUSINESS_UNIT_INFO_FORM,
} from "store/actions/types";

//create provider
export const createMerchantAPI = (id) => async (dispatch) => {
  const registered_at = new Date().toISOString().slice(0, 10);
  const provider_update_at = new Date().toISOString().slice(0, 10);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    user_id: id,
    user_role: 1,
    registered_at,
    provider_update_at,
  });

  try {
    const endpoint = "/v1/api/provider/sign-contract";
    const res = await axios.post(endpoint, body, config);
    if (res?.data.state) {
      dispatch({
        type: CREATE_MERCHANT,
        payload: { merchantId: res.data.providerID },
      });
      return res.data.providerID;
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
//form 2
export const updateRepresentativeInfoFormAPI =
  (id, data) => async (dispatch) => {
    data.update_at = new Date().toISOString().slice(0, 10);
    data.create_at = new Date().toISOString().slice(0, 10);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(data);
    try {
      const endpoint = `/v1/api/provider/register/${id}/representive`;
      const res = await axios.post(endpoint, body, config);
      if (res.data?.state) {
        dispatch({
          type: UPDATE_REPRESENTATIVE_INFO_FORM,
          payload: { isRepresentativeInfoFormSubmitted: true },
        });
        return true;
      }
      return false;
    } catch (err) {
      console.log(err.response.data.errors);
      return false;
    }
  };

//form 3
export const getCategoryAPI = (type) => async (dispatch) => {
  try {
    const endpoint = `/v1/api/provider/register/${type}/get-categories`;
    const res = await axios.get(endpoint);
    if (res.data?.status) {
      if (!res.data.result) return [];
      return res.data.result;
    }
  } catch (err) {
    console.log(err.response.data.errors);
  }
};

export const updateBusinessUnitInfoFormAPI = (id, data) => async (dispatch) => {
  data.update_at = new Date().toISOString().slice(0, 10);
  data.create_at = new Date().toISOString().slice(0, 10);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const endpoint = `/v1/api/provider/register/${id}/detail-info`;
    const res = await axios.post(endpoint, body, config);
    if (res.data?.state) {
      dispatch({
        type: UPDATE_BUSINESS_UNIT_INFO_FORM,
        payload: { isBusinessUnitInfoFormSubmitted: true },
      });
      return true;
    }
    return false;
  } catch (err) {
    console.log(err.response.data.errors);
    return false;
  }
};
