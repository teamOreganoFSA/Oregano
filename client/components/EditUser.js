import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
// import { fetchUser } from "../store/user";

const EditUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);
  const newUser = useSelector((state) => state.user);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
  });

  useEffect(() => {
    setFormValues({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      address: user.address,
    });
  }, [newUser]);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = window.localStorage.getItem("token");
      const config = { headers: { authorization: token } };
      await axios.put(`/api/users/${user.id}`, formValues, config);
      history.push(`/user/${user.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="signupForm"
      style={{ backgroundColor: "green", display: "flex" }}
    >
      <h2>Edit User Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">
            <small>First Name</small>
          </label>
          <input
            value={formValues.firstName}
            onChange={handleChange}
            name="firstName"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="lastName">
            <small>Last Name</small>
          </label>
          <input
            value={formValues.lastName}
            onChange={handleChange}
            name="lastName"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="address">
            <small>Address</small>
          </label>
          <input
            value={formValues.address}
            onChange={handleChange}
            name="address"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input
            value={formValues.email}
            onChange={handleChange}
            name="email"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input
            value={formValues.password}
            onChange={handleChange}
            name="password"
            type="password"
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditUser;
