import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Home from './views/Home';
import Form from './views/Form';
import DifferentForm from './views/DifferentForm';
import DestinationPage from './views/DestinationPage';
import './App.css';

import React, { Component } from 'react';

class App extends Component {

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/form" element={<Form/>}/>
          <Route path="/differentform" element={<DifferentForm/>}/>
          <Route path="/destination/:city" element={<DestinationPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route component={Error} />
        </Routes>
      </Router>
    );
  }
}

export default App;