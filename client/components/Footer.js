import React from "react";
import { HiBuildingStorefront } from "react-icons/hi2";
import { FaPhone, FaMailBulk, FaGithub } from "react-icons/fa";
// import "./componentStyles/Footer.css"

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        
        <div className="left">
          <div className="location">
          <HiBuildingStorefront size={20} style={{ marginRight: "2rem" }} />
          <p>123 Plant Tree Avenue</p>
          <span></span>
            <p>Earth</p>
          </div>
        
          <div className="phone">
            <h4>
              <FaPhone size={20} style={{ marginRight: "2rem" }} />
              1-800-800-800
            </h4>
          </div>
          <div className="email">
            <h4>
              <FaMailBulk size={20} style={{ marginRight: "2rem" }} />
              TeamOregano@FSA.com
            </h4>
          </div>
        </div>

        <div className="right">
          <div className="social">
            <FaGithub size={20} style={{ marginRight: "2rem" }} />
            https://github.com/teamOreganoFSA
          </div>
          <h4>About the project</h4>
          <p>
            Oregano - a full-stack application that we made for the Grace
            Shopper E-commerce project. Focus on selling clothing products of
            all kind, 100% Organic
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
