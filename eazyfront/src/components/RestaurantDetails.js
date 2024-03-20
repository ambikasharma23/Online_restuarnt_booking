//restaurant-details

import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./css/RestaurantDetails.css";
import Header from "./Header";
import Footer from "./Footer";

const RestaurantDetails = () => {
  const [restaurantData, setRestaurantData] = useState(null);
  const isMounted = useRef(false);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateError, setDateError] = useState("");
  const [slotError, setSlotError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    const fetchData = async () => {
      try {
        // Fetch restaurant details
        const restaurantResponse = await fetch(
          `http://localhost:3005/restaurants/${id}/details`
        );
        if (!restaurantResponse.ok) {
          throw new Error(
            `Failed to fetch restaurant details: ${restaurantResponse.statusText}`
          );
        }
        const restaurantData = await restaurantResponse.json();
        console.log("Fetched restaurant data:", restaurantData);

        setRestaurantData(restaurantData.restaurant);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    };

    const fetchAvailableDates = async () => {
      try {
        // Fetch available dates
        const availableDatesResponse = await fetch(
          `http://localhost:3005/restaurants/${id}/availableDates`
        );
        if (!availableDatesResponse.ok) {
          throw new Error(
            `Failed to fetch available dates: ${availableDatesResponse.statusText}`
          );
        }
        const datesData = await availableDatesResponse.json();
        console.log("Fetched available dates:", datesData);

        setAvailableDates(datesData);
      } catch (error) {
        console.error("Error fetching available dates:", error);
      }
    };

    fetchData();
    fetchAvailableDates();
    fetchSlotsByDate(); 
  }, [id]);

  const fetchSlotsByDate = async () => {
    try {
      // Fetch slots for the selected date
      const slotsByDateResponse = await fetch(
        `http://localhost:3005/restaurants/${id}/slotsByDate/${selectedDate}`
      );
      if (!slotsByDateResponse.ok) {
        throw new Error(
          `Failed to fetch slots for the selected date: ${slotsByDateResponse.statusText}`
        );
      }
      const slotsData = await slotsByDateResponse.json();
      console.log("Fetched slots for the selected date:", slotsData);
  
      // Check if the selected date is today
      const isToday = selectedDate === new Date().toISOString().split("T")[0];
  
      // Get the current time in IST
      const currentTimeIST = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      ).toLocaleTimeString("en-US", { hour12: false });
  
      // Update the state with the fetched slots
      setAvailableSlots(
        isToday
          ? slotsData.slots.filter(
              (slot) => slot.start_time > currentTimeIST
            )
          : slotsData.slots
      );
    } catch (error) {
      console.error("Error fetching slots for the selected date:", error);
    }
  };
  
  
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
    setSlotError("");
    fetchSlotsByDate();
  };


  const token = localStorage.getItem("accessToken");

  const handleBookNowClick = async () => {
    if (!token) {
      navigate("/");
    }

    setDateError("");
    setSlotError("");
    setPhoneNumberError("");

    let isErrorsPresent = false;

    if (!selectedDate) {
      setDateError("Not a valid date");
      isErrorsPresent = true;
    }

    if (!selectedSlot) {
      setSlotError("Not a valid slot");
      isErrorsPresent = true;
    }

    if (!phoneNumber || phoneNumber.length !== 10 || isNaN(phoneNumber)) {
      setPhoneNumberError("Not a valid contact");
      isErrorsPresent = true;
    }

    if (isErrorsPresent) {
      setPopupVisible(false);
    } else {
      setPopupVisible(true);
    }
  };

  const handleModifyBooking = () => {
    setPopupVisible(false);
  };

  const handleConfirmBooking = async () => {
    try {
      const customer_id = localStorage.getItem("user_id");
      const customer_name = localStorage.getItem("user_name");

      const selectedSlotData = availableSlots.find(
        (slot) => slot.start_time === selectedSlot
      );
  
      if (!selectedSlotData) {
        console.error("Selected slot not found in available slots");
        return;
      }
  
      const slotId = selectedSlotData.slot_id;
      const createBookingResponse = await fetch(
        "http://localhost:3005/bookings/createBooking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            slot_id: slotId,
            customer_id: customer_id,
            customer_name: customer_name,
            contact_number: phoneNumber,
            num_guests: numberOfGuests,
            booking_date: selectedDate,
          }),
        }
      );

      if (!createBookingResponse.ok) {
        if (createBookingResponse.status === 401) {
          // jwt expiration , redirect to login
          alert("Session has timed out. Please log in again.");
          localStorage.clear();
          navigate("/login");
          return;
        }
        throw new Error(
          `Failed to create booking: ${createBookingResponse.statusText}`
        );
      }

      console.log("Booking created successfully");

      navigate("/BookingConfirmation", {
        state: {
          bookingDetails: {
            restaurantName: restaurantData.name,
            selectedDate: selectedDate,
            selectedSlot: selectedSlot,
          },
        },
      });
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  if (!restaurantData) {
    return (
      <div>
        <Header />
        <div className="bgbg">
          <div className="restaurant-not-found">
            <p></p>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="bgbg">
        <div
          className="background-container"
          style={{
            backgroundImage: `url(https://c.ndtvimg.com/2023-11/c4bp49g_restaurant-generic_625x300_21_November_23.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=738)`,
          }}
        ></div>
        <div className="restaurant-details-container">
          <div className="restaurant-details">
            <img
              src={restaurantData.image}
              alt={restaurantData.name}
              className="restaurant-image"
            />
            <h2 className="restaurant-name">{restaurantData.name}</h2>
            <p className="restaurant-info">
              Cuisine: {restaurantData.cuisine_type}
            </p>
            <p className="restaurant-info">
              Location: {restaurantData.location}
            </p>
            <div className="booking-section">
              <label htmlFor="date">Select Date:</label>
              <select
                id="date"
                value={selectedDate}
                onChange={handleDateChange}
              >
                <option value="" disabled>
                  Select Date
                </option>
                {availableDates.map((date, index) => (
                  <option key={index} value={date}>
                    {new Date(date).toLocaleDateString()}
                  </option>
                ))}
              </select>
              <span className="error-message">{dateError}</span>

              <label htmlFor="slot">Select Time:</label>
              <select
                id="slot"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
              >
                <option value="" disabled>
                Select your slot
                </option>
                {availableSlots.map((slot, index) => (
                  <option key={index} value={slot.start_time}>
                    {slot.start_time}
                  </option>
                ))}
              </select>
              <span className="error-message">{slotError}</span>
              <label htmlFor="guests">Number of Guests:</label>
              <input
                type="number"
                id="guests"
                value={numberOfGuests}
                onChange={(e) =>
                  setNumberOfGuests(
                    Math.max(1, Math.min(4, parseInt(e.target.value, 10)))
                  )
                }
                min="1"
                max="4"
              />

              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                pattern="[0-9]{10}"
                maxLength="10"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="ip"
              />
              <span className="error-message">{phoneNumberError}</span>

              <button className="book-now-btn" onClick={handleBookNowClick}>
                Book Now
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <h2>
              <strong>Booking Details</strong>
            </h2>
            <p style={{ textAlign: "justify" }}>
              Restaurant: <strong>{restaurantData.name}</strong>
            </p>
            <p style={{ textAlign: "justify" }}>
              Date: <strong>{selectedDate}</strong>
            </p>
            <p style={{ textAlign: "justify" }}>
              Slot:<strong> {selectedSlot}</strong>
            </p>
            <p style={{ textAlign: "justify" }}>
              Guests: <strong>{numberOfGuests}</strong>
            </p>
            <p style={{ textAlign: "justify" }}>
              Phone Number: <strong>{phoneNumber}</strong>
            </p>
            <div className="popup-buttons">
              <button onClick={handleModifyBooking} className="cancel">
                Cancel
              </button>
              <button onClick={handleConfirmBooking} className="confirm">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetails;
