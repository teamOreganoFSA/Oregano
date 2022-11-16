import React,  { useEffect }from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHome, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/auth";
import { clearCart } from "../store/cart";
import "../components/Styles/Navbar.css";
import { fetchUser } from "../store/user";




const Navbar = () => {
  const user = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const newUser = useSelector((state)=>state.user) 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  },[]);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearCart());
  };

  if (!window.localStorage.getItem("cart")) {
    window.localStorage.setItem("cart", "[]");
  }

  // let token = JSON.parse(window.localStorage.getItem('cart'))
  // if(token){
  //   cart.length
  // }else{
    //use non-conform cart length
  // }


  return (
    <div className="header">
      <Link to="/">
        <img src="/logo.png"></img>
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
          {user.email ? (
            <>
              <p>Welcome {newUser.firstName}</p>
              {user.userType === "ADMIN" && (
                <Link to="/admin">Admin Dashboard</Link>
              )}
              {user.userType === "USER" && (
                <Link to={`/user/${user.id}`}>User Dashboard</Link>
              )}
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
