import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from './Login';

describe('Login component', () => {
  it('renders login form with one-time login code input', () => {
    render(<Login />);
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByLabelText('One-time login code')).toBeInTheDocument();
  });

  it('submits form with one-time login code', () => {
    const onSubmit = jest.fn();
    render(<Login onSubmit={onSubmit} />);
    const codeInput = screen.getByLabelText('One-time login code');
    const submitButton = screen.getByRole('button', { type: 'submit' });
    fireEvent.change(codeInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({ code: '123456' });
  });
});