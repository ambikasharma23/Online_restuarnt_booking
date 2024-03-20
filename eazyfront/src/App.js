// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/login';
import RestaurantDetails from './components/RestaurantDetails';
// import ReviewBooking from './components/ReviewBooking';
import BookingConfirmation from './components/BookingConfirmation';
import Signup from './components/signup';
import RestaurantListing from './components/Restaurantlisting'; 
import BookingDetails from './components/book-details'; 
import ClockComponent from './components/clock';

const App = () => {
  return (

    <div>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Home" element={<HomePage />} />
      <Route path="/restaurant/:id" element={<RestaurantDetails />} />
      <Route path="/clock" element={<ClockComponent />} />
      
      <Route path="/BookingConfirmation" element={<BookingConfirmation />} />
      <Route path="/restaurant-listing" element={<RestaurantListing />} />
      <Route path="/booking-details" element={<BookingDetails />} />
    </Routes></div>
  );
};

export default App;
