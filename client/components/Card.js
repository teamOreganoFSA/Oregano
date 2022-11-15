import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/cart";

const Card = (props) => {
  const { product } = props;
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="card" data-aos="zoom-in" data-aos-duration="1500">
        <div className="inner">
          <img className="card_image" src={product.imageURL}></img>
        </div>
        <div className="card_body">
          <h2 className="card_name">{product.name}</h2>
          <h3 className="card_price">{product.price}</h3>
          <h4 className="card_description">{product.description}</h4>
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
  );
};

export default Card;
