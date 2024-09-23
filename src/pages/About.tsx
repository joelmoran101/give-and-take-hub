import React from 'react'
import './About.css'
import { Link } from 'react-router-dom'

<h1>About page</h1>
function About() {
 

  return (
    <div className='about-wrapper'>
      <div className="back-button-container">
        <Link to="/">
          <button className="back-button">Back to Home</button>
        </Link>
      </div>
      
      <h1>About Us</h1>
      <img className="about-image" src="src/assets/images/TogetherImgPuzzle_noBG.png" alt="Image of people from diverse backgrounds coming together, with a subtle puzzle piece pattern in the background." />
      <h3>Core Concept: </h3>
        <p>Welcome to the "Give and Take Hub", a platform where users can anonymously offer or request items or services for free. Our core concept is rooted in the belief that unconditional giving and sharing can bring people together, foster a sense of community, and create a more sustainable future.</p>
      <h3>The Power of Unconditional Giving: </h3>
        <p>Research has shown that giving without expecting anything in return can have a profound impact on both the giver and the receiver. It can increase feelings of happiness, empathy, and social connection. By providing a platform for people to give and receive freely, we aim to create a ripple effect of kindness that can spread far and wide.</p>
      <h3>Our Logo:</h3>
        <p>The logo features two interlocking puzzle pieces, symbolizing collaboration and connectivity. The design highlights unity and harmony, which are essential elements for a sustainable future. Just as puzzle pieces fit together to form a complete picture, we believe that individuals coming together can create a more complete and compassionate community.</p>
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
