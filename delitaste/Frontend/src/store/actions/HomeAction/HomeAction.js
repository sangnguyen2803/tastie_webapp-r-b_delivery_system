import axios from "axios";
//UPDATE UI
export const getProviderGroup =
  (group_id, limit, offset, latitude, longitude) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      group_provider_id: group_id,
      limit: limit,
      offset: offset,
      latitude: latitude,
      longitude: longitude,
    });
    try {
      const endpoint = "/v1/api/provider/dashboard/home/get-group-provider";
      const res = await axios.post(endpoint, body, config);
      if (res?.data) {
        return res.data.response;
      }
      return [];
    } catch (err) {
      console.log(err);
      return [];
    }
  };

export const getAllProvider =
  (limit, offset, latitude, longitude) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      limit: limit,
      offset: offset,
      latitude: latitude,
      longitude: longitude,
    });
    try {
      const endpoint = "/v1/api/provider/dashboard/home/get-near-by-provider";
      const res = await axios.post(endpoint, body, config);
      if (res?.data) {
        return res.data.response;
      }
      return [];
    } catch (err) {
      console.log(err);
      return [];
    }
  };
