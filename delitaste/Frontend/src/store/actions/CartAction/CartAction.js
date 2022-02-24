import axios from "axios";

import {
  ADD_TO_CART,
  INCREASE_PRODUCT,
  DESCREASE_PRODUCT,
} from "store/actions/types";

//Get product list
export const addToCart = (item) => async (dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    payload: item,
  });
};

export const increaseProductQuantity = (productId) => async (dispatch) => {
  dispatch({
    type: INCREASE_PRODUCT,
    payload: { id: productId },
  });
};

export const descreaseProductQuantity = (productId) => async (dispatch) => {
  dispatch({
    type: DESCREASE_PRODUCT,
    payload: { id: productId },
  });
};

export const removeCart = (id) => async (dispatch) => {};
