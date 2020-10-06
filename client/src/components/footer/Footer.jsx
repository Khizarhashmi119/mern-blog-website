import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; copyright {currentYear} Made by Mohd. Khizar Hashmi</p>
    </footer>
  );
};

export default Footer;
