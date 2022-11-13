import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
const loginForm = () => (
  <div>
    <div>
      <label htmlFor="email">
        <small>Email</small>
      </label>
      <input name="email" type="text" />
    </div>
    <div>
      <label htmlFor="password">
        <small>Password</small>
      </label>
      <input name="password" type="password" />
    </div>
  </div>
);
export const signupForm = () => (
  <div className="signupForm">
    <div>
      <label htmlFor="firstName">
        <small>First Name</small>
      </label>
      <input name="firstName" type="text" />
    </div>
    <div>
      <label htmlFor="lastName">
        <small>Last Name</small>
      </label>
      <input name="lastName" type="text" />
    </div>
    <div>
      <label htmlFor="address">
        <small>Address</small>
      </label>
      <input name="address" type="text" />
    </div>
    <div>
      <label htmlFor="email">
        <small>Email</small>
      </label>
      <input name="email" type="text" />
    </div>
    <div>
      <label htmlFor="password">
        <small>Password</small>
      </label>
      <input name="password" type="password" />
    </div>
  </div>
);

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit} name={name}>
        {displayName === "Login" && loginForm()}
        {displayName === "Sign Up" && signupForm()}
        <div>
          <button className="btn" type="submit">
            {displayName}
          </button>
        </div>

        {displayName === "Login" ? (
          <div className="signup">
            <Link to="/signup">
              <h5>New User Sign Up Now!</h5>
            </Link>
          </div>
        ) : (
          <div className="signup">
            <Link to="/login">
              <h5>Already Have An Account? Login In</h5>
            </Link>
          </div>
        )}

        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      const firstName = evt.target.firstName?.value;
      const lastName = evt.target.lastName?.value;
      const address = evt.target.address?.value;

      dispatch(
        authenticate(formName, email, password, firstName, lastName, address)
      );
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
