import axios from "axios";

import { GET_PRODUCT_LIST } from "store/actions/types";

//Search
export const searchAPI =
  (id, query, type, long, lat, category_id, category_type) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(
      type === "3"
        ? {
            user_id: id,
            q: "",
            type: "3",
            longitude: long,
            latitude: lat,
            category_infor: {
              category_type: category_type,
              category_id: category_id,
            },
          }
        : {
            user_id: id,
            q: query,
            type,
            longitude: long,
            latitude: lat,
          }
    );
    console.log(body);
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
export const addProductAPI = (data, image) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const uploadImageConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
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
      const image_upload_endpoint = `https://tastie18vp.com/upload/product/avatar`;
      let image_data = new FormData();
      image_data.append("product_id", res.data.infor.product_id);
      image_data.append("upload", image);
      const response = await axios.post(
        image_upload_endpoint,
        image_data,
        uploadImageConfig
      );
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

//Add product
export const updateProductAPI =
  (data, providerId, productId, image) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const uploadImageConfig = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
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
    data.update_at = currentDateTime;
    const body = JSON.stringify(data);
    try {
      const endpoint = `/v1/api/provider/dashboard/menu-overview/${providerId}/update-product`;
      console.log(body);
      const res = await axios.post(endpoint, body, config);
      console.log(res);
      if (res.data?.status) {
        const image_upload_endpoint = `https://tastie18vp.com/upload/product/avatar`;
        let image_data = new FormData();
        image_data.append("product_id", productId);
        image_data.append("upload", image);
        const response = await axios.post(
          image_upload_endpoint,
          image_data,
          uploadImageConfig
        );
        console.log(response);
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
    console.log(id);
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
      if (!res.data.menuItems) return [];
      dispatch({
        type: GET_PRODUCT_LIST,
        payload: { productList: res.data.menuItems },
      });
      return res.data.menuItems;
    }
    return [];
  } catch (err) {
    console.log(err);
  }
};

export const getUpcomingProductAPI = (id) => async (dispatch) => {
  try {
    const endpoint = `/v1/api/provider/dashboard/get-up-coming-product/${id}`;
    const res = await axios.get(endpoint);
    if (res.data) {
      return res.data.response;
    }
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const addUpcomingProductAPI = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const endpoint = `/v1/api/provider/dashboard/add-up-coming-product`;
    const res = await axios.post(endpoint, body, config);
    if (res.data?.status) {
      return res.data;
    }
    return {};
  } catch (err) {
    console.log(err.response.data.errors);
    return {};
  }
};

export const addSurveyProductAPI = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const endpoint = `/v1/api/provider/dashboard/add-survey-question`;
    const res = await axios.post(endpoint, body, config);
    if (res.data?.status) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err.response.data.errors);
    return false;
  }
};

export const submitSurveyUpcomingProductAPI = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const endpoint = `/v1/api/tastie/home/submit-upcoming-product-review`;
    const res = await axios.post(endpoint, body, config);
    if (res.data?.status) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err.response.data.errors);
    return false;
  }
};
