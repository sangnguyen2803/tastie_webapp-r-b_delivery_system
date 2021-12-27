import {
  SET_ALERT_NOTIFICATION,
  REMOVE_ALERT_NOTIFICATION,
  SET_DIALOG_BOX,
  REMOVE_DIALOG_BOX,
} from "store/actions/types";
import {} from "store/actions/types";

const initialState = {
  msg: "",
  loadingAlert: false,
  loadDialogBox: false,
  messageDialogHeader: "",
  messageDialogContent: "",
  alertStyling: "danger",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT_NOTIFICATION:
      return { ...state, ...payload };
    case REMOVE_ALERT_NOTIFICATION:
      return { ...state, ...payload };
    case SET_DIALOG_BOX:
      return { ...state, ...payload };
    case REMOVE_DIALOG_BOX:
      return { ...state, ...payload };
    default:
      return state;
  }
}
