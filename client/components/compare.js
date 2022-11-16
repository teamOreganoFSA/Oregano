// import React, { useEffect, state, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
// import { cartQuantity, fetchCart, clearCart, deleteItem } from "../store/cart";
// import { conformCart } from "./helpfunctions/conformCart";
// import { FaTrash } from "react-icons/fa";
// import "../components/Styles/cart.css";

// const Cart = (props) => {
//   const [qty, setQty] = useState({});
//   const { cart } = useSelector((state) => state);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(cartQuantity());
//     dispatch(fetchCart());
//     setLoaded(true);
//   }, [qty]);

//   const [loaded, setLoaded] = useState(false);

//   const handleChange = (event, id) => {
//     setQty({ ...qty, [id]: event.target.value });
//     dispatch(cartQuantity(id, event.target.value));
//     return event.target.value;
//   };

//   // delete handler: dispatches deleteItem(id)
//   const deleteHandler = (e, id) => {
//     console.log("Printing id: ", id);
//     console.log("Printing e", e);
//     setQty({});
//     setLoaded(true);
//     dispatch(deleteItem(id));
//   };

//   const token = window.localStorage.getItem("token");
//   const localCart = JSON.parse(window.localStorage.getItem("cart"));
//   const newCart = conformCart(localCart);
//   console.log("Printing cart before condition: ", cart);
//   console.log("Printing newCart: ", newCart);
//   let cartToRender = token ? cart : newCart || [];
//   console.log("Printing cartToRender >>>>>", cartToRender);

//   /**
//    * cartToRender.map is not function (error)
//    * deleteHandler works but requires refresh and gives errors
//    *
//    */
//   return loaded ? (
//     <div>
//       {cartToRender.map((item, index) => {
//         return item.orderProducts ? (
//           <div style={{ border: "1px solid grey" }} key={item.id}>
//             <p>{item.name}</p>
//             <p>
//               ${item.price} x {item.orderProducts?.quantity}
//             </p>
//             <input
//               disabled={props.isCheckout}
//               onChange={(e, id = item.id) => {
//                 handleChange(e, id);
//               }}
//               style={{ width: "50px" }}
//               type="number"
//               min={1}
//               value={qty[item.id] || item.orderProducts?.quantity}
//             />
//             <FaTrash
//               onClick={(e, id = item.id) => {
//                 deleteHandler(e, id);
//               }}
//             />
//           </div>
//         ) : (
//           <h1 key={uuidv4()}>loading</h1>
//         );
//       })}
//       {!props.isCheckout && (
//         <div>
//           <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
//         </div>
//       )}
//       {!props.isCheckout && (
//         <Link to="/checkout">
//           <button disabled={!cartToRender.length}>Checkout</button>
//         </Link>
//       )}
//     </div>
//   ) : (
//     <h1>loading</h1>
//   );
// };

// export default Cart;

import axios from "axios";
import { conformCart } from "../components/helpfunctions/conformCart";
/**
 * ACTION TYPES
 */
const FETCH_CART = "FETCH_CART";
const ADD_TO_CART = "ADD_TO_CART";
const CLEAR_CART = "CLEAR_CART";
const DELETE_ITEM = "DELETE_ITEM";
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
const _deleteItem = (updatedCart) => ({
  type: DELETE_ITEM,
  updatedCart,
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
        const { data } = await axios.post(
          `/api/products/${product.id}/auth`,
          {},
          config
        );
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
export const deleteItem = (id) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          authorization: token,
        },
        data: {
          productId: id,
        },
      };
      const updatedCart = await axios.delete("/api/cart/auth", config);
      dispatch(_deleteItem(updatedCart));
    } else {
      const existingCart =
        JSON.parse(window.localStorage.getItem("cart")) || [];
      console.log("Printing updated cart: ", existingCart);
      const newCart = existingCart.reduce((accumulator, currentValue) => {
        if (currentValue.id !== id) {
          return [...accumulator, currentValue];
        } else return accumulator;
      }, []);
      window.localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };
};
export const clearCart = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          authorization: token,
        },
      };
      await axios.delete("/api/cart/auth/all", config);
      dispatch(_clearCart());
    }
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
    case DELETE_ITEM:
      return [action.updatedCart];
    default:
      return state;
  }
}
