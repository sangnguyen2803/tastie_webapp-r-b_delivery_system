import {
  SET_ALERT_NOTIFICATION,
  REMOVE_ALERT_NOTIFICATION,
} from "store/actions/types";

export const setAlertNotification = (alertMsg, timeout) => (dispatch) => {
  dispatch({
    type: SET_ALERT_NOTIFICATION,
    payload: {
      loadingAlert: true,
      msg: alertMsg,
    },
  });
  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT_NOTIFICATION,
        payload: {
          loadingAlert: false,
          msg: "",
        },
      }),
    timeout
  );
};

export const removeAlertNotification = () => (dispatch) => {
  dispatch({
    type: REMOVE_ALERT_NOTIFICATION,
    payload: {
      loadingAlert: false,
      msg: "",
    },
  });
};
