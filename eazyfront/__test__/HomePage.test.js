import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../src/components/HomePage';

describe('HomePage Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(); // Mock the fetch function
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('fetches top recommended restaurants on component mount', async () => {
    // Mock response data
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue([
        // Your mock data here
      ]),
    };

    // Mock the fetch function to return the mock response
    global.fetch.mockResolvedValueOnce(mockResponse);

    render(
      <Router>
        <HomePage />
      </Router>
    );

    // Wait for the API call to resolve
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3005/restaurants/select');
    });
  });

  // Add more test cases here to cover other functionalities of the HomePage component
});
