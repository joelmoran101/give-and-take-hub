// src/components/hero/hero.test.js
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Hero from './hero';
import App from '../../App';


describe('Hero component', () => {
  it('renders hero component correctly', () => {
     render(<App />);
    //  const heroEl = screen.getByText(/A Sharing Platform/i);

    // expect(heroEl).toBeInTheDocument();
  });

//   it('renders hero component with correct text', () => {
//     const { getByText } = render(
//       <BrowserRouter>
//         <Hero />
//       </BrowserRouter>
//     );

//     expect(getByText('This is the hero component')).toBeInTheDocument();
//   });

//   it('renders hero component with correct link', () => {
//     const { getByText } = render(
//       <BrowserRouter>
//         <Hero />
//       </BrowserRouter>
//     );

//     const link = getByText('Learn More');
//     expect(link).toHaveAttribute('href', '/learn-more');
//   });

//   it('calls onClick function when button is clicked', () => {
//     const onClick = vi.fn();
//     const { getByText } = render(
//       <BrowserRouter>
//         <Hero onClick={onClick} />
//       </BrowserRouter>
//     );

//     const button = getByText('Click me');
//     fireEvent.click(button);
//     expect(onClick).toHaveBeenCalledTimes(1);
//   });
});