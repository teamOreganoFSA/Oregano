import React, { useEffect, state, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { cartQuantity, fetchCart, clearCart } from "../store/cart";
import { conformCart } from "./helpfunctions/conformCart";

import "../components/Styles/cart.css";

const Cart = (props) => {
  const [qty, setQty] = useState({});
  const { cart } = useSelector((state) => state);

  console.log(cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cartQuantity());
    dispatch(fetchCart());

    setLoaded(true);
  }, [qty]);
  const [loaded, setLoaded] = useState(false);

  const handleChange = (event, id) => {
    setQty({ ...qty, [id]: event.target.value });
    dispatch(cartQuantity(id, event.target.value));
    return event.target.value;
  };

  {
    const token = window.localStorage.getItem("token");
    if (!window.localStorage.getItem("cart")) {
      window.localStorage.setItem("cart", "[]");
    }
    const localCart = JSON.parse(window.localStorage.getItem("cart"));
    const newCart = conformCart(localCart);
    console.log("cart before condition >>", cart);
    const cartToRender = token ? cart : newCart || [];
    console.log("adding to cart ERROR >>>>>", cartToRender);
    console.log("Printing uuid: ", uuidv4());
    return loaded ? (
      <div>
        {cartToRender.map((item, index) => {
          return item.orderProducts ? (
            <div style={{ border: "1px solid grey" }} key={item.id}>
              <p>{item.name}</p>
              <p>
                ${item.price} x {item.orderProducts?.quantity}
              </p>
              <input
                disabled={props.isCheckout}
                onChange={(e, id = item.id) => {
                  handleChange(e, id);
                }}
                style={{ width: "50px" }}
                type="number"
                min={1}
                value={qty[item.id] || item.orderProducts?.quantity}
              />
            </div>
          ) : (
            <h1 key={uuidv4()}>loading</h1>
          );
        })}
        {!props.isCheckout && (
          <div>
            <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
          </div>
        )}
        {!props.isCheckout && (
          <Link to="/checkout">
            <button disabled={!cartToRender.length}>Checkout</button>
          </Link>
        )}
      </div>
    ) : (
      <h1>loading</h1>
    );
  }
};

export default Cart;
