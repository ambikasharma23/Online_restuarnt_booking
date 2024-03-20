import React, { useState, useEffect, useRef } from "react";
import "./css/HomePage.css";
import RestaurantCard from "./card";
import Footer from "./Footer";
import Header from "./Header";
import Items from "./items";

const HomePage = () => {
  const [topRecommendedRestaurants, setTopRecommendedRestaurants] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userName, setUserName] = useState("");
  
  // Ref to track whether the component has mounted
  const isMounted = useRef(false);

  const handlemeal = () => {
    window.alert("Feature coming soon");
  };

  useEffect(() => {
    // Fetch the list of top recommended restaurants only after the initial mount
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    fetch("http://localhost:3005/restaurants/select")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch top recommended restaurants');
        }
        return response.json();
      })
      .then((data) => {
        setTopRecommendedRestaurants(data);
      })
      .catch((error) => {
        console.error('Error fetching top recommended restaurants:', error);
      });
  }, []);

  useEffect(() => {
    const userName = localStorage.getItem("user_name");
    const firstName = userName ? userName.split(' ')[0] : '';
    setUserName(firstName);
  }, []);

  // https://i.ibb.co/Tgg83vQ/salad.png
  return (
    <div className="home-container">
      
      <Header/>
      
      <div className="content">

        <h2 style={{fontWeight:'bold'}}>{userName ? `WELCOME ${userName.toUpperCase()} !!` : "WELCOME FOODIE !!"}</h2>
        <h3 style={{textShadow:'none',fontFamily:'-moz-initial'}}> It's Food O'Clock</h3>
        <div className="offer-section">
          <img src="https://cdn3d.iconscout.com/3d/premium/thumb/time-for-food-5760051-4833497.png?f=webp" alt="Special Offer" className="salad" />
        </div>
        {/* <h4>What's your pick for today ?</h4> */}
        <div className="meal-tabs">
          <button
            className="meal-btn"
            data-tooltip="Breakfast"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handlemeal}
          >
            &#x1F4CC; Near me &#x1F4CC;
          </button>
          <button
            className="meal-btn"
            data-tooltip="Breakfast"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handlemeal}
          >
           🍳 Breakfast 🍳
            
          </button>
          <button
            className="meal-btn"
            data-tooltip="Lunch"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handlemeal}
          >
            🍱 Lunch 🍱
          </button>
          <button
            className="meal-btn"
            data-tooltip="Dinner"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handlemeal}
          > 
            🍲 Dinner 🍲
          </button>
          <button
            className="meal-btn"
            data-tooltip="Bar/pub"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handlemeal}
          >
           🍻 Bar 🍻
          </button>

          <button
            className="meal-btn"
            data-tooltip="Bar/pub"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handlemeal}
          >
           🍷 Pub 🍷
          </button>

          <button
            className="meal-btn"
            data-tooltip="Bar/pub"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handlemeal}
          >
           🍽️ Buffet 🍽️
          </button>
        </div>
        <h4 style={{color:'darkred'}}>Top recommended restaurants !!</h4>
        <div className="card-container">
        <Items allRestaurants={topRecommendedRestaurants} />  {/* Pass top recommended restaurants as prop */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;

