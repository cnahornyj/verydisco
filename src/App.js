import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Form from './views/Form';
import Destination from './views/Destination';
import './App.css';

import React, { Component } from 'react';

class App extends Component {

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/form" element={<Form/>}/>
          <Route path="/destination " element={<Destination/>}/>
          <Route component={Error} />
        </Routes>
      </Router>
    );
  }
}

export default App;