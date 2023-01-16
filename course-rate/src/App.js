import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Courses from './components/courses';
import Evalutaion from './components/evaluation';
import logo from './assets/logo.png'
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img src={logo} alt="test" width="250" height="50" className="d-inline-block align-text-top" />
            </a>
          </div>
        </nav>
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> <span class="navbar-brand mb-0 h1">Courses</span> </Link></li>
            <li><Link to={'/evaluation'} className="nav-link"><span class="navbar-brand mb-0 h1">Evaluation</span></Link></li>
          </ul>
        </nav>
        <hr />
        <Routes>
          <Route exact path='/' element={<Courses />} />
          <Route path='/evaluation' element={<Evalutaion />} />
        </Routes>
      </div>
    </Router>
  );

}

export default App;