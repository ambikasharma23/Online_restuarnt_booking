import React from 'react';
// import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter as Router
import Signup from '../src/components/signup';

describe('Signup Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(); // Mock the fetch function
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('submits form when Sign Up button is clicked', async () => {
    // Mock response data
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ message: 'Signup successful' }),
    };

    // Mock the fetch function to return the mock response
    global.fetch.mockResolvedValueOnce(mockResponse);

    const { getByText, getByPlaceholderText } = render(
      <Router> {/* Wrap Signup component inside BrowserRouter */}
        <Signup />
      </Router>
    );
    const nameInput = getByPlaceholderText('Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const signUpButton = getByText('Sign Up');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(signUpButton);

    // Verify that the fetch function is called with the correct URL and request body
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3005/customers/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      }),
    });

    // Verify the expected behavior after form submission
    await waitFor(() => {
      // Add assertions here to verify the behavior after form submission
      // For example: Check if a success message is displayed
      // expect(getByText('Signup successful')).toBeInTheDocument();
    });
  });
});
