import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/home';
import About from './components/about';
import Evalutaion from './components/evaluation';
import './App.css';

function App() {
    return (
    <Router>
        <div>
          <h2>Oiga code test</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Courses </Link></li>
            {/* <li><Link to={'/about'} className="nav-link">About</Link></li> */}
            <li><Link to={'/evaluation'} className="nav-link">Evaluation</Link></li>
          </ul>
          </nav>
          <hr />
          <Routes>
              <Route exact path='/' element={<Home />} />
              {/* <Route path='/about' element={<About />} /> */}
              <Route path='/evaluation' element={<Evalutaion />} />
          </Routes>
        </div>
      </Router>
    );
  
}

export default App;