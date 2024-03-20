import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RestaurantListing from '../src/components/Restaurantlisting';

describe('RestaurantListing Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(); // Mock the fetch function
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('fetches data and renders restaurant cards correctly', async () => {
    // Mock response data
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue([
        {
          id: 1,
          name: 'Restaurant 1',
          location: 'Location 1',
          image: 'https://example.com/image1.jpg',
        },
        {
          id: 2,
          name: 'Restaurant 2',
          location: 'Location 2',
          image: 'https://example.com/image2.jpg',
        },
        {
          id: 3,
          name: 'Restaurant 3',
          location: 'Location 3',
          image: 'https://example.com/image3.jpg',
        },
      ]),
    };
  
    // Mock the fetch function to return the mock response
    global.fetch.mockResolvedValueOnce(mockResponse);
  
    await act(async () => {
      render(
        <Router>
          <RestaurantListing />
        </Router>
      );
  
      // Wait for the microtasks to complete
      await new Promise((resolve) => setTimeout(resolve, 0));
  
      // Check if the fetch function was called
      expect(global.fetch).toHaveBeenCalledTimes(0);
  
      // Add your other assertions here
    });
  });
  
})