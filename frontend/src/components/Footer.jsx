// src/components/Footer.jsx
import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
          <a href="#">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
