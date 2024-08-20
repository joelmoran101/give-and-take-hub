import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect } from 'vitest'
 import Home from './Home'

 describe('Home page', () => {
    it('should render the hero section with a background image and a tagline', () => {
      const { getByText, getByRole } = render(<Home />);
      
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/welcome to give and take hub/i);
      expect(screen.getByText(/welcome to give and take hub/i)).toBeInTheDocument();
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  })