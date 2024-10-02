import React, { useContext } from 'react';
import Hero from '../components/hero/Hero';
import './Home.css';
import { Link } from 'react-router-dom';
import LanguageSelector from '../utilities/LanguageSelector';
import { AuthContext } from '../auth/AuthContext';
import { Container, Nav, Navbar } from 'react-bootstrap';

const Home = () => {
  const { loggedInUser } = useContext(AuthContext);
  return (
    <div className='Home d-flex flex-column'>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
        <Navbar.Brand href="/src/assets/images/logo.jpg"><img className="logo" src="/src/assets/images/logo.jpg" alt="logo"/>
          <div>Give and Take</div>
        </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
                <header className="Header mb-5">
                  <div className="main-container">
                    <nav>
                      <ul>
                        <li><Link className="nav-link" to="/">Home</Link></li>
                        <li><Link className="nav-link" to="/browse">Give & Take Hub</Link></li>
                        <li><Link className="nav-link" to="/about">About</Link></li>

                        {!loggedInUser && (
                          <>
                            <li><Link className="nav-link" to="/register">Join</Link></li>
                            <li><Link className="nav-link" o="/login">Login</Link></li>
                          </>
                        )}

                        {loggedInUser && (
                          <>
                            <li><Link className="nav-link" to="/profile">Profile</Link></li>
                            <li><Link className="nav-link" to="/logout">Logout</Link></li>
                          </>
                        )}

                        <li><LanguageSelector /></li>

                      </ul>
                    </nav>
                  </div>
                </header>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  

      <Hero />
      
      <div className='mt-5 d-flex flex-column justify-content-center text-center align-items-center'>
        <h1 className="home-heading display-1">Welcome</h1>
        <h1 className="home-heading display-3">to the</h1>
        <h1 className="home-heading display-1">Give and Take Hub</h1>
      </div>
    </div>
  );
}

export default Home;