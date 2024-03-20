import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../src/components/login';

describe('Login Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(); // Mock the fetch function
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('submits form when Log in button is clicked', async () => {
    // Mock response data
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ 
        meta: { AccessToken: 'mockAccessToken' },
        customer: { customer_id: 'mockUserId', customer_name: 'mockUserName' }
      }),
    };

    // Mock the fetch function to return the mock response
    global.fetch.mockResolvedValueOnce(mockResponse);

    const { getByTestId,getByText, getByPlaceholderText } = render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = await waitFor(() => getByTestId('login-button'));












    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    // Verify that the fetch function is called with the correct URL and request body
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3005/customers/signin', {
      method: 'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
      },
      "body": "{\"email\":\"john@example.com\",\"password\":\"password123\"}"
    });

    // Verify the expected behavior after form submission
    await waitFor(() => {
      // Add assertions here to verify the behavior after form submission
      // For example: Check if the user is redirected to the home page
      // expect(window.location.pathname).toBe('/home');
    });
  });
});

