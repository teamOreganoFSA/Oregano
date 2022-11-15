import axios from "axios";
import { conformCart } from "../components/helpfunctions/conformCart";

/**
 * ACTION TYPES
 */
const FETCH_CART = "FETCH_CART";
const ADD_TO_CART = "ADD_TO_CART";
const CLEAR_CART = "CLEAR_CART";

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

export const _clearCart = () => ({
  type: CLEAR_CART,
});

/**
 * THUNK CREATORS
 */
//all products WITH FILTER MEN OR WOMEN CONDITIONAL

export const cartQuantity = (itemId, inputQty) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const localCart = window.localStorage.getItem("cart");
    try {
      if (token) {
        const config = {
          headers: {
            authorization: token,
          },
        };
        // fetchCart();
        // console.log("itemid", itemId);
        if (!itemId) {
          return;
        }
        const newQuantity = { productId: itemId, quantity: inputQty };
        const { data } = await axios.put("/api/cart/auth", newQuantity, config);
        dispatch(_fetchCart(data[1].dataValues));
      } else {
        const data = JSON.parse(localCart);
        const newData = conformCart(data);
        let foundId;
        for (let i = 0; i < newData.length; i++) {
          if (newData[i].id === itemId) {
            foundId = newData[i];
          }
        }
        // console.log("THE found Id>>>", foundId);
        if (!foundId) {
          dispatch(_fetchCart(newData));
        } else {
          foundId.orderProducts.quantity = inputQty;
          dispatch(_fetchCart(foundId));
        }
      }
    } catch (error) {
      console.log("Unable to change quantity");
      console.error(error);
    }
  };
};

export const fetchCart = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    try {
      if (token) {
        const config = {
          headers: {
            authorization: token,
          },
        };
        const { data } = await axios.get("/api/cart/auth", config);
        dispatch(_fetchCart(data));
      }
    } catch (err) {
      console.log("Unable to fetch cart");
      console.error(err);
    }
  };
};

export const addToCart = (product) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    try {
      if (token) {
        const config = {
          headers: {
            authorization: token,
          },
        };
        console.log("tokennn", token);

        const { data } = await axios.post(
          `/api/products/${product.id}/auth`,
          {},
          config
        );
        console.log("DATA >>>>", data);
        dispatch(_addToCart(data));
      }
      const existingCart =
        JSON.parse(window.localStorage.getItem("cart")) || [];
      window.localStorage.setItem(
        "cart",
        JSON.stringify([...existingCart, product])
      );

      dispatch(_addToCart(product));
    } catch (err) {
      console.log("Unable to add to cart");
      console.error(err);
    }
  };
};

export const clearCart = () => {
  return (dispatch) => {
    window.localStorage.removeItem("cart");
    dispatch(_clearCart);
  };
};

/**
 * REDUCER
 */

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_CART:
      if (!action.cart) {
        return [...state];
      }
      return action.cart;
    case ADD_TO_CART:
      return [...state, action.product];
    case CLEAR_CART:
      return [];
    default:
      return state;
  }
}
