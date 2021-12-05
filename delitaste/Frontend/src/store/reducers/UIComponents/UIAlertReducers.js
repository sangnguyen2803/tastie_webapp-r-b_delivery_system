import {
  SET_ALERT_NOTIFICATION,
  REMOVE_ALERT_NOTIFICATION,
} from "store/actions/types";
import {} from "store/actions/types";

const initialState = {
  msg: "",
  loadingAlert: false,
  alertStyling: "danger",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT_NOTIFICATION:
      return { ...state, ...payload };
    case REMOVE_ALERT_NOTIFICATION:
      return { ...state, ...payload };
    default:
      return state;
  }
}
