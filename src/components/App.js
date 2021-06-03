import React, { useState } from 'react';
import '../assets/styles/app.css';
import Header from './Header';
import Element from './Element';

const App = () => {
  return (
    <div className="ui container">
      <Header />
      <Element />
    </div>
  );
};

export default App;
