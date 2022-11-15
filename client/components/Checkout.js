import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./Cart";
import { me } from "../store/auth";
import { fetchCart } from "../store/cart";

const Checkout = () => {
  // Possibly do amazon checkout style
  const { cart } = useSelector((state) => state);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
    dispatch(fetchCart());
  }, []);
  console.log("Printing user: ", cart);

  return (
    <div>
      <h3>Checkout</h3>
      <div className="shipping">
        <h5>Shipping address</h5>
        <p>{auth.address}</p>
      </div>
      <div className="payment">
        <h5>Payment method</h5>
        <p>{auth.id}</p>
      </div>
      <div className="order">
        <h5>Review items and shipping</h5>
        <Cart />
      </div>
      {/* hook up to place order */}
      <button>Place your order</button>
    </div>
  );
};

export default Checkout;
