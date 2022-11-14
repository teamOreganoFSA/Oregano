import axios from "axios";
/**
 * ACTION TYPES
 */
const FETCH_CART = "FETCH_CART";
const ADD_TO_CART = "ADD_TO_CART";
const CLEAR_CART ="CLEAR_CART"

/**
 * ACTION CREATORS
 */
const _fetchCart = (cart) => ({
  type: FETCH_CART,
  cart,
});

const _addToCart = (product) => ({
  type: ADD_TO_CART,
  product,
});

export const clearCart = () => ({
type: CLEAR_CART
})

/**
 * THUNK CREATORS
 */
//all products WITH FILTER MEN OR WOMEN CONDITIONAL

export const fetchCart = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const localCart = window.localStorage.getItem("cart");
    // localCart && dispatch(_fetchCart(JSON.parse(localCart)));
    try {
      const { data } = await axios.get("/api/cart/auth", {
        headers: {
          authorization: token,
        },
      });
      console.log(data);
      dispatch(_fetchCart(data));
    } catch (error) {
      console.log("Unable to fetch cart");
      console.error(error);
    }
  };
};

export const addToCart = (props) => {
  const existingCart = JSON.parse(window.localStorage.getItem("cart")) || [];
  window.localStorage.setItem("cart", JSON.stringify([...existingCart, props]));
  return async (dispatch) => {
    dispatch(_addToCart(props));
  };
};

/**
 * REDUCER
 */

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_CART:
      return action.cart;
    case ADD_TO_CART:
      return [...state, action.product];
    case CLEAR_CART:
      return []
    default:
      return state;
  }
}
