// Hero.js

import React from 'react';
import './Hero.css'; // Import your CSS file for styling

const Hero = () => {
    return (
        <div className="hero-container">
            <h1>Free Sharing Platform - “Give &/or Take Hub”</h1>
            <p className="hero-description">
                <strong>Core Concept:</strong> A platform where users can anonymously offer or request items or services for free.
            </p>
            <div className="hero-buttons">
                <button className="register-button">Register</button>
                <button className="login-button">Login</button>
            </div>
        </div>
    );
}

export default Hero;