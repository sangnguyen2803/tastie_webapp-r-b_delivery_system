import axios from "axios";

import {
  CREATE_MERCHANT,
  UPDATE_SERVICE_INFO_FORM,
  UPDATE_REPRESENTATIVE_INFO_FORM,
  UPDATE_BUSINESS_UNIT_INFO_FORM,
  UPDATE_PRODUCT_DETAIL_INFO_FORM,
  UPDATE_BANK_INFO_FORM,
  GET_PROVIDER_DETAIL,
} from "store/actions/types";

//Create provider
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
    registered_at,
    provider_update_at,
  });
  console.log(body);
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
    return -1;
  }
};
// Update form 1:
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
// Update form 2
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

    console.log(body);
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

// Update form 3
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
// Update form 4
export const updateProductDetailInfoFormAPI =
  (id, data) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(data);
    try {
      const endpoint = `/v1/api/provider/register/${id}/menu-photo`;
      const res = await axios.post(endpoint, body, config);
      if (res.data?.state) {
        dispatch({
          type: UPDATE_PRODUCT_DETAIL_INFO_FORM,
          payload: { isProductDetailInfoFormSubmitted: true },
        });
        return true;
      }
      return false;
    } catch (err) {
      console.log(err.response.data.errors);
      return false;
    }
  };

// Update form 5
export const updateBankInfoFormAPI = (id, data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //update user_role to merchant account
  data.user_role = 2;
  const body = JSON.stringify(data);
  try {
    const endpoint = `/v1/api/provider/register/${id}/bank-info`;
    const res = await axios.post(endpoint, body, config);
    if (res.data?.state) {
      dispatch({
        type: UPDATE_BANK_INFO_FORM,
        payload: { isBankInfoFormSubmitted: true },
      });
      return true;
    }
    return false;
  } catch (err) {
    console.log(err.response.data.errors);
    return false;
  }
};
//get provider by id
export const getProviderByIdAPI = (id) => async (dispatch) => {
  try {
    const endpoint = `/v1/api/provider/dashboard/${id}/get-info`;
    const res = await axios.get(endpoint);
    if (res.data?.state) {
      if (!res.data.provider_info) return [];
      dispatch({
        type: GET_PROVIDER_DETAIL,
        payload: { currentProvider: res.data.provider_info },
      });
      return res.data.provider_info;
    }
  } catch (err) {
    console.log(err.response.data.errors);
  }
};

export const getScheduleTime = (id) => async (dispatch) => {
  try {
    const endpoint = `/v1/api/tastie/checkout/get_schedule_time/${id}`;
    const res = await axios.get(endpoint);
    if (res.data) {
      return res.data.response;
    }
  } catch (err) {
    console.log(err);
  }
};
