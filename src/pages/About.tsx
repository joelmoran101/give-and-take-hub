import React from 'react'
import './About.css'
import { Link } from 'react-router-dom'
import { t } from 'i18next'

<h1>About page</h1>
function About() {
 

  return (
    <div className='about-wrapper'>
      <div className="back-button-container">
        <Link to="/">
          <button className="back-button">Back to Home</button>
        </Link>
      </div>
      
     
      <img className="about-image" src="src/assets/images/TogetherImgPuzzle_noBG.png" alt="Image of people from diverse backgrounds coming together, with a subtle puzzle piece pattern in the background." />
      
      <h1>{t('About')}</h1>
      <h3>{t('Core Concept')}</h3>
        <p>{t('About paragraph1')}</p>
      <h3>{t('Unconditional giving')}</h3>
      <p>{t('About paragraph2')}</p>
      <p>{t('About paragraph3')}</p>

      <h3>{t('Our Logo')}</h3>
        <p>{t('Logo description')}</p>
      <h2 className="about-quote">"There is enough for everybody's needs but not enough for everyone's greed." - Mahatma Gandhi</h2>
        <p>We believe that by sharing what we have, we can help create a better world where everyone's needs could be met, and hopefully, where greed and scarcity are a thing of the past.</p>
      <h3>Our Purpose: </h3>
        <p>Our objective is to create a platform that facilitates unconditional giving and sharing, and to inspire a movement of kindness and compassion that can change the world.</p>
      <h3>Call to Action: </h3>
        <p>Join us in our mission to create a more compassionate and sustainable world. Sign up to offer or request items or services, and be part of a community that's changing the way we think about giving and sharing.</p>
      <Link className="login-link" to="/login">Login</Link>
    </div>
  )
}

export default About
