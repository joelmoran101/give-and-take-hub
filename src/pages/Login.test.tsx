import React from 'react';
import { render, screen } from '@testing-library/react'; 
import { userEvent } from '@testing-library/user-event';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { vi, Mocked } from 'vitest';
vi.mock('axios');

describe('Login component', () => {
  it('renders login form with one-time password button', () => {
    render(
    
    <BrowserRouter>
      <Login />
    </BrowserRouter>);

    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /request password/i })).toBeInTheDocument();
  });

  it('submits form with username or email value', async () => {
//  * const mockedAxios
    vi.mocked(axios, true).post.mockRejectedValueOnce({data: {success: false}});
    render(
    
      <BrowserRouter>
        <Login />
      </BrowserRouter>
      );
    const inputField = screen.getByLabelText(/Enter Username or Email/i);
    const submitButton = screen.getByRole('button', { name: /request password/i });
    
    await userEvent.type(inputField, 'joel.moran');
    await userEvent.click(submitButton);
    expect (await axios.post).toHaveBeenCalledTimes(1);
    expect(await axios.post).toHaveBeenCalledWith('http://localhost:4000/api/get-login-code', { username_or_email: 'joel.moran' });
  });
});