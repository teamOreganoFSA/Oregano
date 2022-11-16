import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../store/allProducts";
import "../components/Styles/AdminDash.css";
import axios from "axios";

const AdminDash = () => {
  const { allProducts } = useSelector((state) => state);
  const [allUsers, setAllUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/users", {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      });
      setAllUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("allUsers", allUsers);
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
      <h2>All Users</h2>
      <div style={{ margin: "15px" }}>
        {allUsers.map((user) => {
          return (
            <div style={{ backgroundColor: "whitesmoke" }}>
              <p>
                {user.firstName} {user.lastName}
              </p>
              <p> {user.email}</p>
              <p> {user.address}</p>
              {user.userType === "ADMIN" && (
                <p style={{ color: "red" }}>ADMIN</p>
              )}
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDash;
