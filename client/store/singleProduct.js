import axios from "axios";
/**
 * ACTION TYPES
 */
const FETCH_SINGLE_PRODUCT = "FETCH_SINGLE_PRODUCT";

/**
 * ACTION CREATORS
 */
const _fetchSingleProduct = (product) => ({
  type: FETCH_SINGLE_PRODUCT,
  product,
});


/**
 * THUNK CREATORS
 */
export const fetchSingleProduct = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/single/${productId}`)
      dispatch(_fetchSingleProduct(data));
    } catch (error) {
      console.log("Unable to fetch product");
      console.error(error);
    }
  };
};


/**
 * REDUCER
 */

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_SINGLE_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
