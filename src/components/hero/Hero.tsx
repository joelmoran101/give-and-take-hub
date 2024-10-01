import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import './Hero.css';

const Hero = () => {
  const { loggedInUser } = useContext(AuthContext);

  return (
    <div className="hero-container" aria-label='main hero'>
      <h1>A Sharing Platform</h1>
      <p className="hero-description">
        <strong>Core Concept:</strong> A platform where users can anonymously offer or request items or services for free. Instead of paying for the articles or services through the current monetary system, users are encourage to simply express their gratitude. And one way of doing that is through  <a href="https://gradido.net/en/what-is-gradido/" target="_blank" rel="noopener noreferrer">GraDiDo</a>. Click on the link to learn more about it. The term 'Gradido' stands for Gratitude, Dignity and Donation. 
        <br/>
        <strong>Unconditional giving or sharing is good not only for the recipient but also for the giver. It makes one feel connected.</strong>
      </p>
      <div className="hero-buttons">
        {!loggedInUser && (
          <>
            <Link to="/register"><button className="register-button">Register</button></Link>
            <Link to="/login"><button className="login-button">Login</button></Link>
          </>
        )}
        <Link to="/browse"><button className="browse-button">Browse</button></Link>
      </div>
    </div>
  );
}

export default Hero;