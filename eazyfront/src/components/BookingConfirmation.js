// BookingConfirmation.js
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "./css/BookingConfirmation.css";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

const BookingConfirmation = ({}) => {
  const location = useLocation();
  const { bookingDetails } = location.state || {};
  const user = localStorage.getItem("user_name");

  const [showConfetti, setShowConfetti] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Header />
      <div className={`confetti-container ${showConfetti ? "show" : "hide"}`}>{showConfetti && <Confetti gravity={0.5} />}</div>
      <img src="https://i.ibb.co/WgMhNKB/tick.png" className="tick"></img>
      <div className="confirmation-container">
        <div className="confirmation-card">
          <div
            className="background-image"
            style={{
              backgroundImage: `url("https://c.ndtvimg.com/2023-11/c4bp49g_restaurant-generic_625x300_21_November_23.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=738")`,
            }}
          ></div>
          <h2>Booking Confirmed!</h2>
          <p>
            See you {user} at <strong>{bookingDetails.restaurantName}</strong>{" "}
            around <strong>{bookingDetails.selectedSlot}</strong> on{" "}
            <strong>{bookingDetails.selectedDate}</strong>
            😄🍴
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingConfirmation;
