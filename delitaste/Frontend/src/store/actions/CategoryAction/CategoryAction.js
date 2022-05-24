import axios from "axios";

export const getAllCategoryAPI = () => async (dispatch) => {
  try {
    const endpoint = "/v1/api/tastie/home/get-all-category";
    const res = await axios.get(endpoint);
    if (res?.data) {
      return res.data.response;
    }
    return {};
  } catch (err) {
    console.log(err);
    return {};
  }
};