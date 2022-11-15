import React, { useEffect, state, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartQuantity, fetchCart } from "../store/cart";
import { conformCart } from "./helpfunctions/conformCart";

const Cart = () => {
  const [qty, setQty] = useState({});
  const { cart } = useSelector((state) => state);
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
    const localCart = JSON.parse(window.localStorage.getItem("cart"));
    const newCart = conformCart(localCart);
    console.log("cart before condition >>", cart);
    const cartToRender = token ? cart : newCart || [];
    console.log("adding to cart ERROR >>>>>", cartToRender);
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
            <h1 key={index}>loading</h1>
          );
        })}
        <button>Checkout</button>
      </div>
    ) : (
      <h1>loading</h1>
    );
  }
};

export default Cart;
