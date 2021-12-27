import { SET_DIALOG_BOX, REMOVE_DIALOG_BOX } from "store/actions/types";

export const setDialogBox =
  (messageContent, messageHeader, timeout) => (dispatch) => {
    dispatch({
      type: SET_DIALOG_BOX,
      payload: {
        loadDialogBox: true,
        messageDialogHeader:
          messageHeader || "Access Denied - Authentication Failed",
        messageDialogContent: messageContent || "Please try again.",
      },
    });
    setTimeout(
      () =>
        dispatch({
          type: REMOVE_DIALOG_BOX,
          payload: {
            loadDialogBox: false,
            messageDialogHeader: "",
            messageDialogContent: "",
          },
        }),
      timeout || 2000
    );
  };
