import { SET_DIALOG_BOX, REMOVE_DIALOG_BOX } from "store/actions/types";

export const setDialogBox = (msg, title, timeout) => (dispatch) => {
  dispatch({
    type: SET_DIALOG_BOX,
    payload: {
      loadingDialogBox: true,
      dialogBoxTitle: title || "Warning",
      dialogBoxMessage: msg || "Error",
    },
  });
  setTimeout(
    () =>
      dispatch({
        type: REMOVE_DIALOG_BOX,
        payload: {
          loadingDialogBox: false,
          dialogBoxTitle: "",
          dialogBoxMessage: "",
        },
      }),
    timeout || 2000
  );
};
