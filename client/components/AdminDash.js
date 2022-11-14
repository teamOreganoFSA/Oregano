import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../store/allProducts";



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
          <div key={product.id} className="single-product">
            <p>{product.name}</p>
            <img src={product.imageURL} alt={product.description} />
            <Link to={`/edit-product/${product.id}`}>
              <button>Edit Product</button>
            </Link>
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
