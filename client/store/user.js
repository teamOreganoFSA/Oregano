import axios from "axios";

/**
 * ACTION TYPES
 */
const FETCH_USER = "FETCH_USER";

/**
 * ACTION CREATORS
 */
const _fetchUser = (user) => ({
  type: FETCH_USER,
  user,
});

/**
 * THUNK CREATORS
 */
//all products WITH FILTER MEN OR WOMEN CONDITIONAL

export const fetchUser = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      try {
        const { data } = await axios.get("/api/users/userId", {
          headers: { authorization: token },
        });
        dispatch(_fetchUser(data));
      } catch (error) {
        console.log("Unable to fetch user");
        console.error(error);
      }
    }
  };
};

/**
 * REDUCER
 */

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.user;
    default:
      return state;
  }
}
