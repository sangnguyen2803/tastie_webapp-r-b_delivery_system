import {
  UPDATE_REGISTER_STEP_STYLING,
  UPDATE_REGISTRATION_FORM,
  MAP_REGISTRATION_FORM,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CHECK_DUPLICATION_SUCCESS,
  SET_EMAIL_VERIFICATION_CODE,
  SET_EMAIL_VERIFICATION_STATUS,
  GET_PROFILE_SUCCESS,
  RETRIEVE_TOKEN,
  SET_LOADING,
  SIGN_OUT,
  GET_PROVIDER_DETAIL,
  GET_CONTACT,
} from "store/actions/types";
import {
  GET_CART,
  ADD_TO_CART,
  UPDATE_CART,
  CLEAR_CART,
  REMOVE_CART,
  INCREASE_PRODUCT,
  DESCREASE_PRODUCT,
} from "store/actions/types";
import axios from "axios";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "user",
  storage,
  whitelist: [],
};

const initialState = {
  currentForm: 0, //provider-registration
  formData: {},
  isEmailVerified: false,
  isUserAuthenticated: false,
  isLoading: true, //loading component after calling api.
  loginState: false,
  provider_id: -1, //provider created by user
  profile: [],
  styling: ["active", "default", "default", "default"],
  refreshToken: localStorage.getItem("refreshToken"),
  verifiedEmailToken: localStorage.getItem("verified_email_token"),
  currentAddress: {
    address: "",
    latitude: 0,
    longitude: 0,
  },
  phone: null,
  location: [],
  userCart: {
    cart: [],
    date: "",
    provider_id: -1,
    provider_name: -1,
    status: -1,
    user_id: -1,
  },
  currentProvider: {},
};
const UserReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CONTACT:
      return { ...state, phone: payload.phone, location: payload.address };

    case REGISTER_SUCCESS:
      localStorage.setItem("refreshToken", payload.refreshtoken);
      return {
        ...state,
        ...payload,
        currentForm: 2,
        profile: payload.profile,
        styling: ["finished", "finished", "active", "default"],
        isUserAuthenticated: true,
      };
    case REGISTER_FAIL:
      localStorage.removeItem("refreshToken");
      return {
        ...state,
        ...payload,
        refreshToken: null,
        isUserAuthenticated: false,
        profile: null,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("refreshToken", payload.refreshToken);
      return {
        ...state,
        ...payload,
        refreshToken: payload.refreshToken,
        profile: payload.profile,
        isUserAuthenticated: true,
      };
    case LOGIN_FAIL:
      localStorage.removeItem("refreshToken");
      return {
        ...state,
        ...payload,
        profile: null,
        isUserAuthenticated: true,
      };
    case SIGN_OUT:
      localStorage.removeItem("refreshToken");
      return {
        ...state,
        ...payload,
        refreshToken: null,
      };
    case CHECK_DUPLICATION_SUCCESS:
      return {
        ...state,
        ...payload,
        isForm1Submitted: true,
        currentForm: 1,
        styling: ["finished", "active", "default", "default"],
      };
    case SET_EMAIL_VERIFICATION_CODE:
      localStorage.setItem(
        "verified_email_token",
        payload.result.verifyEmailToken
      );
      return {
        ...state,
        ...payload,
        verifiedEmailToken: payload.result.verifyEmailToken,
      };

    case SET_LOADING:
      return { ...state, ...payload };
    case MAP_REGISTRATION_FORM:
      return { ...state, ...payload };
    case UPDATE_REGISTER_STEP_STYLING:
      return { ...state, ...payload };
    case UPDATE_REGISTRATION_FORM:
      return { ...state, ...payload };
    case SET_EMAIL_VERIFICATION_STATUS:
      return { ...state, ...payload };
    case GET_PROFILE_SUCCESS:
      return { ...state, ...payload };
    case RETRIEVE_TOKEN:
      return { ...state, ...payload };
    case GET_PROVIDER_DETAIL:
      return { ...state, ...payload };
    case GET_CART:
      return { ...state, ...payload };
    case CLEAR_CART:
      return { ...state, ...payload };
    case REMOVE_CART:
      let copy = { ...state };
      let removedPosition = copy.userCart.cart.findIndex(
        (element) =>
          element.product_id === payload.product_id &&
          element.item_code === payload.item_code
      );
      console.log(removedPosition);
      copy.userCart.cart.splice(removedPosition, 1);
      return {
        ...state,
        ...copy,
      };
    case ADD_TO_CART:
      if (payload.userCart.provider_id !== state.userCart.provider_id) {
        return {
          ...state,
          userCart: {
            provider_id: parseInt(payload.userCart.provider_id),
            user_id: payload.userCart.user_id,
            provider_name: payload.userCart.provider_name,
            date: payload.userCart.date,
            status: payload.userCart.status,
            cart: [payload.userCart.cartItem],
          },
        };
      }
      var itemInCart = [];
      let isProductExist = state.userCart.cart.some(
        (item) => item.product_id === payload.userCart.cartItem.product_id
      );
      if (isProductExist) {
        const newState = [...state.userCart.cart];
        const index = state.userCart.cart.findIndex(
          (element) =>
            element.product_id === payload.userCart.cartItem.product_id
        );
        newState[index] = payload.userCart.cartItem;
        itemInCart = newState;
      } else {
        itemInCart = [...state.userCart.cart, payload.userCart.cartItem];
      }

      return {
        ...state,
        userCart: {
          provider_id: parseInt(payload.userCart.provider_id),
          user_id: payload.userCart.user_id,
          provider_name: payload.userCart.provider_name,
          date: payload.userCart.date,
          status: payload.userCart.status,
          cart: itemInCart,
        },
      };
    case UPDATE_CART:
      return {
        ...state,
        userCart: {
          provider_id: payload.userCart.provider_id,
          user_id: payload.userCart.user_id,
          provider_name: payload.userCart.provider_name,
          date: payload.userCart.date,
          status: payload.userCart.status,
          cart: itemInCart,
        },
      };
    case INCREASE_PRODUCT: {
      let prevCart = [...state.userCart.cart];
      let position = state.userCart.cart.indexOf(payload.cart);

      prevCart[position].quantity += 1;
      prevCart[position].totalProductPrice += prevCart[position].productPrice;
      return {
        ...state,
        userCart: {
          ...state.userCart,
          cart: prevCart,
        },
      };
    }
    case DESCREASE_PRODUCT: {
      let prevCart = [...state.userCart.cart];
      let position = state.userCart.cart.indexOf(payload.cart);
      prevCart[position].quantity -= 1;
      prevCart[position].totalProductPrice -= prevCart[position].productPrice;
      return {
        ...state,
        userCart: {
          ...state.userCart,
          cart: prevCart,
        },
      };
    }
    default:
      return state;
  }
};

export default persistReducer(persistConfig, UserReducer);
