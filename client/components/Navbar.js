import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHome, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";

const Navbar = () => {
  const isAuth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div className="header">
      <Link to="/">
        <img src="/picture/logo.png"></img>
      </Link>

      <ul className="nav-menu">
        <li>
          <Link to="/">
            Home{"  "}
            <FaHome />{" "}
          </Link>
        </li>
        <li>
          <Link to="/cart">
            Cart{"  "}
            <FaShoppingCart />{" "}
          </Link>
        </li>
        <li>
          {isAuth.username ? (
            <>
              <p>{isAuth.username}</p>
              <button
                onClick={() => {
                  logoutHandler();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              Login/SignUp{"  "}
              <FaUser />
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
