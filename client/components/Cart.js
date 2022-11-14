import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../store/cart";

const Cart = () => {
  const { cart } = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  console.log(cart)
  return (
    <div>
      {cart.map((item) => {
        return (
          <div style={{ border: "1px solid grey" }}>
            <p>{item.name}</p>
            <p>
              ${item.price} x {item.orderProducts.quantity}
            </p>
            <input
              style={{ width: "50px" }}
              type="number"
              min={1}
              value={item.orderProducts.quantity}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
