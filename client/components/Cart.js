import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { cartQuantity, fetchCart, clearCart, deleteItem } from "../store/cart";
import { conformCart } from "./helpfunctions/conformCart";
import { FaTrash } from "react-icons/fa";
import "../components/Styles/cart.css";

const Cart = (props) => {
  const [qty, setQty] = useState({});
  const [loaded, setLoaded] = useState(false);
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartQuantity());
    dispatch(fetchCart());
    setLoaded(true);
  }, [qty]);


  const handleChange = (event, id) => {
    setQty({ ...qty, [id]: event.target.value });
    dispatch(cartQuantity(id, event.target.value));
    return event.target.value;
  };

  const deleteHandler = (e, id) => {
    setQty({});
    setLoaded(true);
    dispatch(deleteItem(id));
  };
  
  const token = window.localStorage.getItem("token");

  if (!window.localStorage.getItem("cart")) {
    window.localStorage.setItem("cart", "[]");
  }
  const localCart = JSON.parse(window.localStorage.getItem("cart"));
  const newCart = conformCart(localCart);
  const cartToRender = token ? cart : newCart || [];

  let totalPrice = 0

  return loaded ? (
    <div style={{ margin: "2rem" }}>
      <h1>Your Cart</h1>
      {cartToRender.map((item) => {
        return item.orderProducts ? (
          <div style={{ border: "1px solid grey" }} key={item.id}>
            <p>{item.name}</p>
            <p>
              ${item.price} x {item.orderProducts?.quantity}
            </p>
            <p> Subtotal: $ {item.price * item.orderProducts?.quantity}</p>
            <img
              src={item.imageURL}
              style={{ height: "50px", width: "50px" }}
            ></img>
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
            <h4 id ="invisible">{totalPrice += (item.price * item.orderProducts?.quantity)}</h4>
            <FaTrash
              onClick={(e, id = item.id) => {
                deleteHandler(e, id);
              }}
            />
          </div>
        ) : (
          <h1 key={uuidv4()}>loading</h1>
        );
      }
      )}
       <h4 id = 'total' >Total : ${totalPrice}</h4>
      {!props.isCheckout && (
        <div>
          <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </div>
      )}
      {!props.isCheckout && (
        <Link to="/checkout">
          <button id="checkOut" disabled={!cartToRender.length}>Checkout</button>
        </Link>
      )}
     
    </div>
  ) : (
    <h1>loading</h1>
  );
};

export default Cart;
