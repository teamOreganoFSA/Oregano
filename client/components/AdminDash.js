import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../store/allProducts";
import Card from "./Card";

const AdminDash = () => {
  const { allProducts } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  return (
    <div className="dash-container">
      <div className="products-container">
        {allProducts.map((product) => (
          <div className="single-product">
            <p>{product.name}</p>
            <img src={product.imageURL} alt={product.description} />
            <button>Edit Product</button>
          </div>
        ))}
      </div>
      <Link to="/new-product">
        <button>Add New Product</button>
      </Link>
    </div>
  );
};

export default AdminDash;
