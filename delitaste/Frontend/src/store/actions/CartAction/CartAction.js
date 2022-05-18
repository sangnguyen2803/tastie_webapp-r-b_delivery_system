import axios from "axios";

import {
  GET_CART,
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_CART,
} from "store/actions/types";

export const clearCart = (userId, providerId, name) => async (dispatch) => {
  try {
    const endpoint = `/v1/api/tastie/tastie/clear-cart/${userId}`;
    const res = await axios.delete(endpoint);
    if (res.data?.status) {
      dispatch({
        type: CLEAR_CART,
        payload: {
          userCart: {
            provider_id: providerId,
            user_id: userId,
            provider_name: name,
            date: "",
            status: 1,
            cart: [],
          },
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const removeCartItem = (userId, productId, code) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    user_id: userId,
    product_id: productId,
    item_code: code,
  });
  try {
    const endpoint = "/v1/api/tastie/tastie/delete_cart";
    const res = await axios.post(endpoint, body, config);
    if (res.data.status) {
      dispatch({
        type: REMOVE_CART,
        payload: { product_id: productId, item_code: code },
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getCart = (id) => async (dispatch) => {
  var initialCart = {};
  try {
    const endpoint = `/v1/api/tastie/tastie/get_cart/${id}`;
    const res = await axios.get(endpoint);
    if (res.data?.status) {
      var cartItems = [];
      res.data.response.items?.forEach((item) => {
        let detailItem = {};
        detailItem.product_id = item.product_id;
        detailItem.product_name = item.productName;
        detailItem.product_image = item.productImage;
        detailItem.product_price = item.productPrice?.toFixed(2);
        detailItem.product_options = item.additionalOptions;
        detailItem.totalPrice = (item.productPrice * item.quantity)?.toFixed(2);
        detailItem.note = item.specialInstruction;
        detailItem.quantity = item.quantity;
        detailItem.item_code = item.item_code;
        cartItems.push(detailItem);
      });
      initialCart = {
        provider_id: parseInt(res.data.response.providerID),
        user_id: id,
        provider_name: res.data.response.providerName,
        date: "",
        status: 1,
        cart: cartItems,
      };
      dispatch({
        type: GET_CART,
        payload: { userCart: initialCart },
      });
      return initialCart;
    }
  } catch (err) {
    return [];
  }
};

export const updateCart = (updateCartItem, code) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    user_id: updateCartItem.user_id,
    product_id: updateCartItem.cartItem.product_id,
    special_instruction: updateCartItem.cartItem.note,
    quantity: updateCartItem.cartItem.quantity,
    item_code: code,
  });
  try {
    const endpoint = "/v1/api/tastie/tastie/update-quantity-and-note-into-cart";
    const res = await axios.post(endpoint, body, config);
    if (res.data.status && res.data.response) {
      dispatch({
        type: ADD_TO_CART,
        payload: {
          userCart: updateCartItem,
        },
      });
    }
  } catch (err) {
    console.log(err);
    return;
  }
};

export const addToCart = (cartItem) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    user_id: cartItem.user_id,
    product_id: cartItem.cartItem.product_id,
    quantity: cartItem.cartItem.quantity,
    special_instruction: cartItem.cartItem.note,
    additional_option: cartItem.cartItem.product_options || [],
  });
  try {
    const endpoint = "/v1/api/tastie/tastie/insert_product-into-cart";
    const res = await axios.post(endpoint, body, config);

    if (res.data.status && res.data.item_code) {
      dispatch({
        type: ADD_TO_CART,
        payload: {
          userCart: cartItem,
        },
      });
    } else {
      return;
    }
  } catch (err) {
    console.log(err);
    return;
  }
};
