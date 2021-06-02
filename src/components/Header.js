import React from 'react';
import logo from '../assets/images/logo.png';
import '../assets/styles/header.css';

const Header = () => {
  return (
    <div className="headerDiv">
      <img src={logo} width="200" />
      <p className="headerP">
        Espacio de difusión de historia y realidad peruana en formato analítico.
      </p>
    </div>
  );
};

export default Header;
