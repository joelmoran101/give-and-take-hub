import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect } from 'vitest'
 import Home from './Home'

 describe('Home page', () => {
    it('should render the hero section with a background image and a tagline', () => {
      const { getByText, getByRole } = render(<Home />);
      
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/^welcome/i);
      expect(screen.getByText(/to the/i)).toBeInTheDocument();
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  })