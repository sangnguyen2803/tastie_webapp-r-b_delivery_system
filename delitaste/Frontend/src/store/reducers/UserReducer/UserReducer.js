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
} from "store/actions/types";
import {
  ADD_TO_CART,
  REMOVE_CART,
  INCREASE_PRODUCT,
  DESCREASE_PRODUCT,
} from "store/actions/types";
import {} from "store/actions/types";

const initialState = {
  currentForm: 0,
  formData: {},
  isEmailVerified: false,
  isUserAuthenticated: false,
  isLoading: true, //loading component after calling api.
  loginState: false,
  providerId: -1,
  profile: [],
  styling: ["active", "default", "default", "default"],
  refreshToken: localStorage.getItem("refreshToken"),
  verifiedEmailToken: localStorage.getItem("verified_email_token"),

  userCart: {
    providerId: -1,
    providerName: -1,
    date: "",
    status: -1,
    cart: [],
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
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

    case ADD_TO_CART:
      var itemInCart = [];
      let isProductExist = state.userCart.cart.some(
        (item) => item.productId === payload.userCart.cartItem.productId
      );
      if (isProductExist) {
        const newState = [...state.userCart.cart];
        const index = state.userCart.cart.findIndex(
          (element) => element.productId === payload.userCart.cartItem.productId
        );
        newState[index] = payload.userCart.cartItem;
        itemInCart = newState;
      } else {
        itemInCart = [...state.userCart.cart, payload.userCart.cartItem];
      }

      return {
        ...state,
        userCart: {
          providerId: payload.userCart.providerId,
          providerName: payload.userCart.providerName,
          date: payload.userCart.date,
          status: payload.userCart.status,
          cart: itemInCart,
        },
      };

    case REMOVE_CART:
      let copy = { ...state };
      let removedPosition = copy.userCart.cart.indexOf(payload.cartRemoved);
      copy.userCart.cart.splice(removedPosition, 1);

      // if the cart is empty
      if (copy.userCart.cart.length === 0) {
        return {
          ...state,
          userCart: {
            provider_id: null,
            provider_name: null,
            date: null,
            cart: [],
          },
        };
      }

      return {
        ...state,
        ...copy,
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
}
