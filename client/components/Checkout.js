import React from "react";
import { useSelector } from "react-redux";

const Checkout = () => {
  // Possibly do amazon checkout style
  const { cart } = useSelector((state) => state);
  const { user } = useSelector((state) => state);

  return (
    <div>
      <h3>Checkout</h3>
      <div className="shipping">
        <h5>Shipping address</h5>
        <p>{user.address}</p>
      </div>
      <div className="payment">
        <h5>Payment method</h5>
        <p>{user.id}</p>
      </div>
      <div className="order">
        <h5>Review items and shipping</h5>
      </div>
      {/* hook up to place order */}
      <button>Place your order</button>
    </div>
  );
};

export default Checkout;
