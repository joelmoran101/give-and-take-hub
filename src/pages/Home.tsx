import React from 'react';
import Hero from '../components/hero/Hero';
import './Home.css';

function Home() {
  return (
    <>
      <header className="Header">
        <div className="main-container">
          <div className="wrapper-logo" style={{ color: "black" }}>
            <img class="logo" src="/src/assets/images/free-logo.svg" alt="logo" />
            <div>Give and Take</div>
          </div>

          <nav>
            <ul>
              <li><a href="src/pages/Home.test.tsx">Home</a></li>
              <li><a href="src/pages/Hub.tsx">Give & Take Hub</a></li>
              <li><a href="src/pages/About.tsx">About</a></li>
              <li><a href="src/pages/Register.tsx">Join</a></li>
              <li><a href="#">Logout</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className='d-flex flex-column justify-content-center text-center align-items-center'>
        <h1 className="home-heading display-1">Welcome</h1>
        <h1 className="home-heading display-3">to the</h1>
        <h1 className="home-heading display-1">Give and Take Hub</h1>
        <Hero />
      </div>
    </>
  );
}

export default Home;