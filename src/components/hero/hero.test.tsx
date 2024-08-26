// src/components/hero/hero.test.tsx
import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import Hero from './Hero';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../pages/Home';

describe('Hero component', () => {
  afterAll(() => {
    cleanup();
})
  it('renders hero component correctly', () => {    
    render(
    <MemoryRouter >
      (<Hero />);
    </MemoryRouter>
    );
    expect(screen.getByText(/a sharing platform/i)).toBeInTheDocument();
    });
  });

  // it('should render hero component without the buttons after the user successfully loggedin', () => {
  //   const { getByText } = render(
  //     <BrowserRouter>
  //       <Hero.isLoggedIn />
  //     </BrowserRouter>
  //   );

  //   expect(getByText('This is the hero component')).toBeInTheDocument();
  // });

  // it('renders hero component with correct link', () => {
  //   const { getByText } = render(
  //     <BrowserRouter>
  //       <Hero />
  //     </BrowserRouter>
  //   );

  //   const link = getByText('Learn More');
  //   expect(link).toHaveAttribute('href', '/learn-more');
  // });

  // it('calls onClick function when button is clicked', () => {
  //   const onClick = vi.fn();
  //   const { getByText } = render(
  //     <BrowserRouter>
  //       <Hero onClick={onClick} />
  //     </BrowserRouter>
  //   );

  //   const button = getByText('Click me');
  //   fireEvent.click(button);
  //   expect(onClick).toHaveBeenCalledTimes(1);
  // });



// src/components/hero/hero.test.js
// import React from 'react';
// import { render, fireEvent, screen } from '@testing-library/react';
// import Hero from './Hero';
// // import App from '../../App';
// import { MemoryRouter } from 'react-router-dom';


// describe('Hero component', () => {
//   it('renders hero component correctly', () => {
//   render(<MemoryRouter>
//       (<Hero />);
//       const heroEl = screen.getByText(/A Sharking Platform/i);
//       expect(heroEl).toBeInTheDocument();
//     </MemoryRouter>)
//   });

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
// });