import React from 'react';
import logo from '../assets/images/logoh.png';
import '../assets/styles/header.css';

const Header = () => {
  return (
    <div className="headerDiv">
      <img src={logo} width="200" />
      <div className="headerP">
        <p>Conozcamos al Perú que queremos cambiar</p>
      </div>
    </div>
  );
};

export default Header;
