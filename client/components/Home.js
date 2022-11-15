import React from "react";
import { Link } from "react-router-dom";
import "../components/Styles/HomePage.css"
/**
 * COMPONENT
 */
export const Home = () => {
  return (
    <div className="homePage">
      <div className="homePage-Img">
        <img
          src="https://content.asos-media.com/-/media/homepages/unisex/generic-hp/september-2022/microsoftteams-image-169---dt--.png"
          alt="homepage"
        ></img>
        <h1>This is Oregano</h1>
        <h3>Live Organically</h3>
      </div>
      <div className="shop">
        <Link to="/products/MEN">
          <h3 id="men">Shop Men</h3>
        </Link>
        <Link to="/products/WOMEN">
          <h3 id="women">Shop Women</h3>
        </Link>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div
        data-aos="fade-right"
        data-aos-offset="250"
        data-aos-easing="ease-in-sine"
        data-aos-duration="1000"
      >
        <h2>What Is Oregano?</h2>

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
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="shop">
        <body>
          <span>
            <Link to="/products" className="shopnow" />
          </span>
        </body>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  );
};

export default Home;
