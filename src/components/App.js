import React, { useState } from 'react';
import '../assets/styles/app.css';
import Header from './Header';
import Element from './Element';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="ui container">
        <Header />
        <Element />
      </div>
    </Router>
  );
};

export default App;
