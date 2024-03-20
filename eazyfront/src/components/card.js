import React from 'react';
import { Link } from 'react-router-dom';
import './css/Cards.css';

const Cards = ({ id, title, location, imageUrl }) => {
  const navigateToRestaurantDetails = () => {
    // Redirect to the restaurant details page when the button is clicked
    // Assuming the route for restaurant details is "/restaurant/:id"
    window.location.href = `/restaurant/${id}`;
  };

  return (
    <Link to={`/restaurant/${id}`} style={{ textDecoration: 'none' }}>
        <div className="my-3 restaurant-card">
          <div className="card">
            <img className="card-img-top" src={imageUrl} alt={title} />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{location}</p>
            </div>
          </div>
        </div>
      </Link>
  );
};

export default Cards;
