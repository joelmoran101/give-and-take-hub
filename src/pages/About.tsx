import React from 'react'
import './About.css'
import { Link } from 'react-router-dom'
import { t } from 'i18next'

<h1>About page</h1>

function About() {
 

  return (
    <div className='about-wrapper'>
      <div className="back-button-container">
        <Link to="/browse">
          <button className="back-button">{t('Go back to browsing')}</button>
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
      <h2 className="about-quote">{t('About quote')}</h2>
      <h3>{t('Our Purpose')}</h3>
        <p>{t('About paragraph4')}</p>
      <h3>{t('Call to Action')}</h3>
        <p>{t('About paragraph5')}</p>
      <Link className="login-link" to="/login">{t('Login')}</Link>
    </div>
  )
}

export default About


