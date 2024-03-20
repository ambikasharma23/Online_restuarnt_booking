import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';


import { BrowserRouter as Router } from 'react-router-dom';
import Items from '../src/components/items';

describe('Items Component', () => {
  test('renders correctly with given props', () => {
    const allRestaurants = [
      {
        id: 1,
        name: 'Restaurant 1',
        location: 'Location 1',
        cuisine_type: 'Cuisine 1',
        image: 'https://example.com/image1.jpg'
      },
      {
        id: 2,
        name: 'Restaurant 2',
        location: 'Location 2',
        cuisine_type: 'Cuisine 2',
        image: 'https://example.com/image2.jpg'
      },
      {
        id: 3,
        name: 'Restaurant 3',
        location: 'Location 3',
        cuisine_type: 'Cuisine 3',
        image: 'https://example.com/image3.jpg'
      }
    ];

    const { getByText, getByAltText } = render(
        <Router>
          <Items allRestaurants={allRestaurants} />
        </Router>
      );
  

    // Assert that all restaurant titles are rendered
    expect(getByText('Restaurant 1')).toBeInTheDocument();
    expect(getByText('Restaurant 2')).toBeInTheDocument();
    expect(getByText('Restaurant 3')).toBeInTheDocument();

// Assert that all restaurant images are rendered with the correct alt text
expect(getByAltText('Restaurant 1')).toBeInTheDocument();
expect(getByAltText('Restaurant 2')).toBeInTheDocument();
expect(getByAltText('Restaurant 3')).toBeInTheDocument();


    // Assert that the "View all" button is rendered
    expect(getByText('View all')).toBeInTheDocument();
  });
});
