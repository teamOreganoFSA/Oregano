import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUser } from "../store/user";



const UserDash = () => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  },[]);


  return (
    <div className="dash-container">
      <div className="products-container">
          <div key={user.id} className="single-product">
            <p>{user.firstName} {user.lastName}</p>
            <Link to={`/edit-user/${user.id}`}>
              <button>Edit User</button>
            </Link>
          </div>
      </div>
    </div>
  );
};

export default UserDash;
