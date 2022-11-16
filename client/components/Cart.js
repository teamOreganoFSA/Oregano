import React, { useEffect, state, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { cartQuantity, fetchCart, clearCart, deleteItem } from "../store/cart";
import { conformCart } from "./helpfunctions/conformCart";
import { FaTrash } from "react-icons/fa";
import "../components/Styles/cart.css";

const Cart = (props) => {
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

  // delete handler: dispatches deleteItem(id)
  const deleteHandler = (e, id) => {
    console.log("Printing id: ", id);
    console.log("Printing e", e);
    setQty({});
    setLoaded(true);
    dispatch(deleteItem(id));
  };

  const token = window.localStorage.getItem("token");
  const localCart = JSON.parse(window.localStorage.getItem("cart"));
  const newCart = conformCart(localCart);
  console.log("Printing cart before condition: ", cart);
  console.log("Printing newCart: ", newCart);
  let cartToRender = token ? cart : newCart || [];
  console.log("Printing cartToRender >>>>>", cartToRender);

  /**
   * cartToRender.map is not function (error)
   * deleteHandler works but requires refresh and gives errors
   *
   */
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
            <FaTrash
              onClick={(e, id = item.id) => {
                deleteHandler(e, id);
              }}
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
};

export default Cart;
