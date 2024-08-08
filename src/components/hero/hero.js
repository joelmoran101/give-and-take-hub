// Hero.js

import React from 'react';
import './Hero.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="hero-container">
            <h1>Free Sharing Platform - “Give &/or Take Hub”</h1>
            <p className="hero-description">
                <strong>Core Concept:</strong> A platform where users can anonymously offer or request items or services for free.
            </p>
            <div className="hero-buttons">
                <Link to="/register"><button className="register-button">Register</button></Link>
                <Link to="/login"><button className="login-button">Login</button></Link>
            </div>
        </div>
    );
}

export default Hero;