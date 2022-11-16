import React from "react";
import { Link } from "react-router-dom";
import "../components/Styles/HomePage.css";

export const Home = () => {
  return (
    <body>
      <div className="hero-image">
        <div className="hero-text">
          <h1>This is Oregano</h1>
          <h3>Live Organically</h3>
        </div>
      </div>

      <Link to="/products/MEN">
        <h3 id="men">Shop Men</h3>
      </Link>
      <Link to="/products/WOMEN">
        <h3 id="women">Shop Women</h3>
      </Link>

      <div
        className="oregano"
        data-aos="fade-right"
        data-aos-offset="250"
        data-aos-easing="ease-in-sine"
        data-aos-duration="1000"
      >
        <h2 id="oregano">What Is Oregano?</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>

      <div className="shop">
        <span>
          <Link to="/products" className="shopnow" />
        </span>
      </div>
    </body>
  );
};

export default Home;
