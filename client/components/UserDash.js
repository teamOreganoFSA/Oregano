import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUser } from "../store/user";



const UserDash = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(auth)
  useEffect(() => {
    dispatch(fetchUser());
  }, []);


  return (
    <div className="dash-container">
      <div className="products-container">
          <div key={auth.id} className="single-product">
            <p>{auth.firstName} {auth.lastName}</p>
            <Link to={`/edit-user/${auth.id}`}>
              <button>Edit User</button>
            </Link>
          </div>
      </div>
    </div>
  );
};

export default UserDash;
