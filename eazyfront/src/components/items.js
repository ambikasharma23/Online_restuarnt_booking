//items.js

import React, { useState, useEffect } from "react";
import Cards from "./card";
import "./css/Items.css";
import { Link } from 'react-router-dom'; 

const   Items = ({ allRestaurants }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Display only the first three restaurants initially
  const filteredList = allRestaurants.slice(0, 3).filter(
    (element) =>
      element.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      element.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      element.cuisine_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      
      <div className="container my-3">
        <div className="row">
          {filteredList.map((element) => (
            <div className={`col-md-4`} key={element.id}>
              <Cards
                id={element.id}
                title={element.name}
                location={element.location}
                imageUrl={element.image}
              />
            </div>
          ))}
        </div>
      </div>

      {/* See More button */}
      <div className="text-center mb-4">
      <Link to="/restaurant-listing" className="btn btn-primary">View all</Link>
      </div>
    </div>
  );
};


export default Items;
