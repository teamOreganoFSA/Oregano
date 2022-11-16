import axios from "axios";
import history from "../history";
import { fetchCart } from "./cart";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const config = {
      headers: {
        authorization: token,
      },
    };
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    const localCart = JSON.parse(window.localStorage.getItem("cart"));
    if (localCart) {
      const mapped = localCart.map((item) => item.id);
      for (let i = 0; i < mapped.length; i++) {
        await axios.post(`/api/products/${mapped[i]}/auth`, {}, config);

        if (i === mapped.length - 1) {
          window.localStorage.removeItem("cart");
        }
      }
    }
    dispatch(fetchCart());
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (method, email, password, firstName, lastName, address) =>
  async (dispatch) => {
    try {
      const res = await axios.post(
        `/auth/${method}`,
        method === "login"
          ? { email, password }
          : { email, password, firstName, lastName, address }
      );
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
      dispatch(fetchCart());
      history.push("/");
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
