import React from 'react';
import Hero from '../components/hero/Hero';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <header className="Header">
        <div className="main-container">
          <div className="wrapper-logo" style={{ color: "black" }}>
            <img className="logo" src="/src/assets/images/free-logo.svg" alt="logo" />
            <div>Give and Take</div>
          </div>

          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/browse">Give & Take Hub</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/register">Join</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <Hero />
      
      <div className='d-flex flex-column justify-content-center text-center align-items-center'>
        <h1 className="home-heading display-1">Welcome</h1>
        <h1 className="home-heading display-3">to the</h1>
        <h1 className="home-heading display-1">Give and Take Hub</h1>
      </div>
    </div>
  );
}

export default Home;