import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../store/cart";
import "../components/Styles/cart.css"

const Cart = () => {
  const { cart } = useSelector((state) => state);

  console.log(cart)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, []);
  
  return (
    
    <div className="cart">
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
