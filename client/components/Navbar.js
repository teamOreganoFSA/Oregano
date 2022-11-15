import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHome, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout} from "../store/auth";
import { clearCart } from "../store/cart";
import "../components/Styles/Navbar.css"

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);


  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearCart());
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
            <FaShoppingCart /> {cart.length}
          </Link>
        </li>
        <li>
          {auth.email ? (
            <>
              <p>Welcome {auth.firstName}</p>
              {auth.userType === "ADMIN" && (
                <Link to="/admin">Admin Dashboard</Link>
              )}
              {auth.userType==="USER" && (<Link to= {`/user/${auth.id}`}>User Dashboard</Link>)}
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
