import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
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
          <button className="card_btn">Add to Cart</button>
          <Link to={`/products/single/${props.id}`}>
            <button className="card_btn">View Product</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
