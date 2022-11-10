import axios from "axios";
/**
 * ACTION TYPES
 */
const FETCH_ALL_PRODUCTS = "FETCH_ALL_PRODUCTS";
const ADD_NEW_PRODUCT = "ADD_NEW_PRODUCT";

/**
 * ACTION CREATORS
 */
const _fetchAllProducts = (products) => ({
  type: FETCH_ALL_PRODUCTS,
  products,
});

const _addNewProduct = (products) => ({
  type: FETCH_ALL_PRODUCTS,
  products,
});

/**
 * THUNK CREATORS
 */
//all products WITH FILTER MEN OR WOMEN CONDITIONAL

export const fetchAllProducts = (category) => {
  return async (dispatch) => {
    try {
      const url = category ? `/api/products/${category}` : `/api/products`;
      const { data } = await axios.get(url);

      dispatch(_fetchAllProducts(data));
    } catch (error) {
      console.log("Unable to fetch products");
      console.error(error);
    }
  };
};

export const addNewProduct = () => {
  return async (dispatch) => {
    try {
      const data = await axios.post("/api/products");
      console.log("data==>", data);
    } catch (error) {
      console.log("Unable to add product");
      console.error(error);
    }
  };
};

/**
 * REDUCER
 */

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_ALL_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
