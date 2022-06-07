import axios from "axios";

import { GET_PRODUCT_LIST } from "store/actions/types";

//Search
export const searchAPI =
  (query, type, long, lat, category_id) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(
      type === 3
        ? {
            q: query,
            type: 3,
            longitude: long,
            latitude: lat,
            category_infor: {
              category_type: "2",
              category_id: category_id,
            },
          }
        : {
            q: query,
            type,
            longitude: long,
            latitude: lat,
          }
    );
    try {
      const endpoint = "/v1/api/tastie/search";
      const res = await axios.post(endpoint, body, config);
      console.log(res.data);
      if (res.data?.status) return res.data.data;
      return {};
    } catch (err) {
      console.log(err);
      return {};
    }
  };

//Get product list
export const getProductListAPI = (providerId) => async (dispatch) => {
  try {
    const endpoint = `/v1/api/provider/dashboard/menu-overview/${providerId}/get-list-product`;
    const res = await axios.get(endpoint);
    if (res.data?.status) {
      if (!res.data.result) return [];
      dispatch({
        type: GET_PRODUCT_LIST,
        payload: { productList: res.data.result },
      });
      return res.data.result;
    }
    return [];
  } catch (err) {
    console.log(err);
  }
};

//Add product
export const addProductAPI = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  var today = new Date();
  var currentDateTime =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    " " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds();
  data.create_at = currentDateTime;
  data.update_at = currentDateTime;
  const body = JSON.stringify(data);
  try {
    const endpoint = `/v1/api/provider/dashboard/menu-overview/add-item`;
    const res = await axios.post(endpoint, body, config);
    console.log(res.data);
    if (res.data?.status) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err.response.data.errors);
    return false;
  }
};

//Remove product
export const removeProductAPI = (id) => async (dispatch) => {
  try {
    const endpoint = `/v1/api/provider/dashboard/menu-overview/${id}/remove-item`;
    const res = await axios.delete(endpoint);
    if (res.data?.status) {
      dispatch({
        type: GET_PRODUCT_LIST,
        payload: { productList: null },
      });
      return true;
    }
    return false;
  } catch (err) {
    console.log(err.response.data.errors);
    return false;
  }
};

//Get menu category
export const getMenuCategoryAPI = (id) => async (dispatch) => {
  try {
    const endpoint = `/v1/api/provider/dashboard/menu-overview/${id}/get-menu-items`;
    const res = await axios.get(endpoint);
    if (res.data?.status) {
      if (!res.data.result) return [];
      dispatch({
        type: GET_PRODUCT_LIST,
        payload: { productList: res.data.result },
      });
      return res.data.result;
    }
    return [];
  } catch (err) {
    console.log(err);
  }
};
