import React, { useEffect, state, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../store/cart";

const Cart = () => {
  const [qty, setQty] = useState(0);
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  const handleChange = (event, id) => {
    setQty(event.target.value);
    console.log("HANDLE CHANGE", id, event.target.value);
    return event.target.value;
  };

  const localCart = JSON.parse(window.localStorage.getItem("cart"));

  const conformCart = (arr) => {
    let result = [];
    let lookup = {};
    arr.forEach((item) => {
      lookup[item.id] = lookup[item.id] ? ++lookup[item.id] : 1;
    });
    arr.forEach((item) => {
      item.orderProducts = {};
      item.orderProducts.quantity = lookup[item.id];

      if (lookup[item.id]) result.push(item);
      delete lookup[item.id];
    });
    return result;
  };
  console.log(conformCart(localCart));
  {
    conformCart(cart);
    return (
      <div>
        {cart.map((item) => {
          console.log("ITEMMM", item);
          if (!item.orderProducts.quantity) {
            return;
          }
          return (
            <div style={{ border: "1px solid grey" }} key={item.id}>
              <p>{item.name}</p>
              <p>
                ${item.price} x {item.orderProducts.quantity}
              </p>
              <input
                onChange={(e, id = item.id) => {
                  handleChange(e, id);
                }}
                style={{ width: "50px" }}
                type="number"
                min={1}
                value={qty}
              />
            </div>
          );
        })}
        <button>Checkout</button>
      </div>
    );
  }
};

export default Cart;
