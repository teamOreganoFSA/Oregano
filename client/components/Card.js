import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/cart";
import "../components/Styles/Card.css";

const Card = (props) => {
  const { product } = props;
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div data-aos="zoom-in" data-aos-duration="1500">
      <div className="card">
        <div>
          <div>
            <div className="inner">
              <img src={product.imageURL}></img>
            </div>
            <h1>{product.name}</h1>
            <p>$ {product.price}</p>
            <button
              onClick={() => dispatch(addToCart(product, auth.id))}
              className="card_btn"
            >
              Add to Cart
            </button>
            <Link to={`/products/single/${props.id}`}>
              <button className="card_btn">View Product</button>
            </Link>
          </div>
        </div>
    </div>
    </div>
  
  );
};

export default Card;
