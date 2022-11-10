import axios from "axios";
/**
 * ACTION TYPES
 */
const FETCH_ALL_PRODUCTS = "FECTH_ALL_PRODUCTS";

/**
 * ACTION CREATORS
 */
const _fetchAllProducts = (products) => ({
  type: FETCH_ALL_PRODUCTS,
  products,
});

/**
 * THUNK CREATORS
 */
export const fetchAllProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products");
      dispatch(_fetchAllProducts(data));
    } catch (error) {
      console.log("Unable to fetch products");
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
