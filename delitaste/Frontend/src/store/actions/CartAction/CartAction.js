import axios from "axios";

import {
  ADD_TO_CART,
  REMOVE_CART,
  INCREASE_PRODUCT,
  DESCREASE_PRODUCT,
} from "store/actions/types";

export const addToCart = (cartItem) => async (dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    payload: {
      userCart: cartItem,
    },
  });
};
export const RemoveCart = (cartRemovedItem) => (dispatch) => {
  dispatch({
    type: REMOVE_CART,
    payload: {
      cartRemovedItem,
    },
  });
};

export const increaseProductQuantity = (productId) => async (dispatch) => {
  dispatch({
    type: INCREASE_PRODUCT,
    payload: {
      cart,
    },
  });
};

export const descreaseProductQuantity = (productId) => async (dispatch) => {
  dispatch({
    type: DESCREASE_PRODUCT,
    payload: {
      cart,
    },
  });
};

export const removeCart = (id) => async (dispatch) => {};
