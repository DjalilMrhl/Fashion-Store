import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer--container">
        <h1>ECOMMERCE</h1>
          <div className="ul">
            <h1>ABOUTS US</h1>
                    <ul>
            <li>Careers</li>
            <li>Our Stores</li>
            <li>Terms & Conditions</li>
            <li>Privacy & Policy</li>
                    </ul>
          </div>
          <div className="ul">
            <h1>CUSTOMER CARE</h1>
                    <ul>
            <li>Help Center</li>
            <li>Track Your Order</li>
            <li>Corporate & Bulk</li>
            <li>Return & Refunds</li>
                    </ul>
          </div>
          <div className="ul">
            <h1>CONTACT US</h1>
                    <ul>
            <li>49 Northen kiler, Washington DC 19077</li>
            <li>Email: whatever2200@email.com</li>
            <li>(123)-444-777-4555</li>
                    </ul>
          </div>
      </div>
    </footer>
  );
}

export default Footer;
