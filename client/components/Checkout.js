import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import { me } from "../store/auth";
import { fetchCart, checkOut } from "../store/cart";

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
        <h4>
          {auth.firstName} {auth.lastName}
        </h4>
        <h5>Shipping address</h5>
        <p>{auth.address}</p>
      </div>
      <div className="payment">
        <h5>Payment method</h5>
        <p>{auth.id}</p>
      </div>
      <div className="order">
        <h5>Review items and shipping</h5>
        <Cart isCheckout={true} />
        <Link to="/cart">
          <button>Edit cart</button>
        </Link>
      </div>
      {/* hook up to place order */}
      <button
        onClick={() => {
          dispatch(checkOut());
          window.alert(`Thank you for your order!${auth.firstName}`);
        }}
      >
        Place your order
      </button>
    </div>
  );
};

export default Checkout;
