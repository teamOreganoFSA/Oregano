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
    <div className="dash-container"  >
      <div style={{margin:"2rem", padding:"2rem"}}>
          <div key={user.id} className="single-product" style={{padding:"2rem", backgroundColor:"rgb(60, 184, 106)"}} >
            <h3 style={{padding:"1rem"}}>{user.firstName} {user.lastName}</h3>
            <Link to={`/edit-user/${user.id}`}>
              <button>Edit User</button>
            </Link>
          </div>
      </div>
    </div>
  );
};

export default UserDash;
