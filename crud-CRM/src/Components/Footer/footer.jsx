import React from "react";
import { FaLock } from 'react-icons/fa'; 
import "./footer.css";

const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <footer>
      <p>
        <FaLock className="footer-icon" /> 
        Wszelkie prawa zastrzeżone | CRM &copy; {currentYear}
      </p>
    </footer>
  );
}

export default Footer;