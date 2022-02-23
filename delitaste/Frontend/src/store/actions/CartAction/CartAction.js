import axios from "axios";

import { INCREASE_PRODUCT, DESCREASE_PRODUCT } from "store/actions/types";

//Get product list
export const increaseProduct = (productId) => async (dispatch) => {
  dispatch({
    type: INCREASE_PRODUCT,
    payload: { id: productId },
  });
};

export const descreaseProduct = (productId) => async (dispatch) => {
  dispatch({
    type: DESCREASE_PRODUCT,
    payload: { id: productId },
  });
};

export const addToCart = (item) => async (dispatch) => {};
