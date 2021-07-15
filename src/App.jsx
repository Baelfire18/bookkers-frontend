import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import 'bulma/css/bulma.css';

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
