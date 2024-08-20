import React from 'react';
import Hero from '../components/hero/Hero';

function Home() {
  return (
    <div className='d-flex flex-column justify-content-center text-center align-items-center'>
      <h1 className="home-heading display-1">Welcome</h1>
      <h1 className="home-heading display-3">to the</h1>
      <h1 className="home-heading display-1 ">"Give and/or Take Hub"</h1>
      {/* <Hero /> */}
    </div>
  )
}

export default Home;
