import React, { useContext } from 'react';
import Hero from '../components/hero/Hero';
import './Home.css';
import { Link } from 'react-router-dom';
import LanguageSelector from '../utilities/LanguageSelector';
import { AuthContext } from '../context/auth/AuthContext';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation(); // i18n hook to be added to all pages and components that need it to translate text contents which have to be previously defined as key value pairs on the i18n.js file
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
                        <li><Link className="nav-link" to="/">{t('Home')}</Link></li>
                        <li><Link className="nav-link" to="/browse">{t('Give & Take')}</Link></li>
                        <li><Link className="nav-link" to="/about">{t('About')}</Link></li>

                        {!loggedInUser && (
                          <>
                            <li><Link className="nav-link" to="/register">{t('Join')}</Link></li>
                            <li><Link className="nav-link" to="/login">Login</Link></li>
                          </>
                        )}

                        {loggedInUser && (
                          <>
                            <li><Link className="nav-link" to="/profile">{t('Profile')}</Link></li>
                            <li><Link className="nav-link" to="/logout">{t('Logout')}</Link></li>
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

      <div className='mt-5 d-flex flex-column justify-content-center text-center align-items-center'>
        <h1 className="home-heading display-1">{t('Welcome')}</h1>
        <h1 className="home-heading display-3">{t('to the')}</h1>
        <h1 className="home-heading display-1">{t('Give and Take Hub')}</h1>
      </div>
      
      <Hero />
      
    </div>
  );
}

export default Home;