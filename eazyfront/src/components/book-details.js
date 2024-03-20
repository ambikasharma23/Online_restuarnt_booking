import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './css/BookingDetails.css'; 
import { Link } from 'react-router-dom';

const BookingDetails = () => {
  const [bookings, setBookings] = useState([]);
  const name = localStorage.getItem("user_name");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const customer_id = localStorage.getItem('user_id');
        const response = await fetch(`http://localhost:3005/get-book/get-bookings/${customer_id}`);
        const data = await response.json();
        const sortedBookings = data.bookings.sort((a, b) => {
          return new Date(a.booking_date) - new Date(b.booking_date);
        });

        setBookings(sortedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const isDateBeforeToday = (date) => {
    const today = new Date().toISOString().split('T')[0];
    return date < today;
  };

  const liveBookings = bookings.filter(booking => !isDateBeforeToday(booking.booking_date));
  const expiredBookings = bookings.filter(booking => isDateBeforeToday(booking.booking_date));

  return (
    <div>
      <Header />
      <div
        className="background-container"
        style={{
          backgroundImage: `url(https://img.freepik.com/free-vector/orange-yellow-gradient-vector-background_53876-117274.jpg)`,filter:'blur(20px)'
        }}
      ></div>
      {liveBookings.length > 0 && <h1><strong><center>BOOKINGS</center></strong></h1>}
      {liveBookings.length > 0 && <h3 style={{ textAlign:'center',fontFamily: 'bangers',marginTop:'30px',color:'red',fontWeight:'bold',fontSize:'40px'  }}><center>Upcoming</center></h3>}
      <div className="booking-container">
        {liveBookings.map((booking) => (
          <div key={booking.booking_id} className="booking-box">
            <div className="booking-info">
              <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5em', fontFamily: 'bangers' }}>{booking.restaurant_name}</p>
              <p>Name: <strong>{name}</strong></p>
              <p>Number of Guests: <strong>{booking.num_guests}</strong></p>
              <p>Booking Date: <strong>{booking.booking_date.split('T')[0]}</strong></p>
              <p>Time: <strong>{booking.start_time}</strong></p>
            </div>
          </div>
        ))}

        {expiredBookings.length > 0 && (
          <div>
            <h3 style={{ textAlign:'center',fontFamily: 'bangers',marginTop:'30px'  }}><center>EXPIRED</center></h3>
            {expiredBookings.map((booking) => (
              <div key={booking.booking_id} className="booking-box expired-booking">
                <div className="booking-info-exp">
                  <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5em', fontFamily: 'bangers' }}>{booking.restaurant_name}</p>
                  <p>Name: <strong>{name}</strong></p>
                  <p>Number of Guests: <strong>{booking.num_guests}</strong></p>
                  <p>Booking Date: <strong>{booking.booking_date.split('T')[0]}</strong></p>
                  <p>Time: <strong>{booking.start_time}</strong></p>
                </div>
              </div>
            ))}
          </div>
        )}

        
        {bookings.length === 0 && (
          <div>
            <p style={{ marginTop: '30px', fontSize: '68px', fontFamily: 'bangers', textAlign:'center',marginBottom:'197px',color:'black',marginLeft:'20px' }}>No Bookings Available !</p>
            <Link to="/restaurant-listing" style={{textAlign:'justify',fontSize:'30px',marginLeft:'120PX'}}>
              Click here to explore Restaurants
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BookingDetails;
