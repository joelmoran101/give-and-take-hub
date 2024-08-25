import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect } from 'vitest'
 import Home from './Home'

 describe('Home page header', () => {
  it('should render the header with the correct logo and navigation', () => {
    const { getByText, getByRole } = render(<Home />);
    
    // Test the logo
    expect(getByText('Give and Take')).toBeInTheDocument();
    
    // Test the navigation links
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Give & Take Hub')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Join')).toBeInTheDocument();
    expect(getByText('Logout')).toBeInTheDocument();
    
    // Test the navigation links have the correct href attribute
    const homeLink = getByText('Home');
    expect(homeLink).toHaveAttribute('href', 'src/pages/Home.test.tsx');
    
    const hubLink = getByText('Give & Take Hub');
    expect(hubLink).toHaveAttribute('href', 'src/pages/Hub.tsx');
    
    const aboutLink = getByText('About');
    expect(aboutLink).toHaveAttribute('href', 'src/pages/About.tsx');
    
    const joinLink = getByText('Join');
    expect(joinLink).toHaveAttribute('href', 'src/pages/Register.tsx');
    
    const logoutLink = getByText('Logout');
    expect(logoutLink).toHaveAttribute('href', '#');
  });
});

//  describe('Home page', () => {
//     it('should render the hero section with a background image and a tagline', () => {
//       const { getByText, getByRole } = render(<Home />);
      
//       expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/^welcome/i);
//       expect(screen.getByText(/to the/i)).toBeInTheDocument();
//       expect(screen.getByRole('img')).toBeInTheDocument();
//     });
//   })