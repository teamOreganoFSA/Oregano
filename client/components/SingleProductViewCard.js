import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/cart";

const SingleProductViewCard = (props) => {
  const { product } = props;
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  return (
    <div>
      <div className="card" data-aos="zoom-in" data-aos-duration="1500">
        <div className="inner">
          <img className="card_image" src={props.imageURL}></img>
        </div>
        <div className="card_body">
          <h2 className="card_name">{props.name}</h2>
          <h3 className="card_price">{props.price}</h3>
          <h4 className="card_description">{props.description}</h4>
          <button className="card_button" onClick = {()=>dispatch(addToCart(product, auth.id))}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductViewCard;
