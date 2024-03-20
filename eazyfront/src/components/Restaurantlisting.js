import React, { useEffect, useState, useRef } from 'react';
import Cards from './card';
import { useNavigate } from 'react-router-dom';
import "./css/Items.css";
import Header from './Header';
import Footer from './Footer';

const RestaurantListing = () => {
  const [list, setList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsFound, setResultsFound] = useState(true);
  const restaurantsPerPage = 3;
  const navigate = useNavigate();
  const isInitialMount = useRef(true);
  const fetchDataRef = useRef();

  fetchDataRef.current = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setList(data);
      setResultsFound(data.length > 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const url = `http://localhost:3005/restaurants/select?page=${currentPage}&pageSize=${restaurantsPerPage}`;
    fetchDataRef.current(url);
  }, [currentPage]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let url = `http://localhost:3005/restaurants/select?`;
      if (searchQuery.trim() !== '') {
        url += `search=${searchQuery}`;
      } else {
        // If no search query provided, fetch all restaurants with pagination
        url += `page=${currentPage}&pageSize=${restaurantsPerPage}`;
      }
  
      fetchDataRef.current(url);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      // Clear the search query after submitting the form
      setSearchQuery('');
    }
  };
  
  

  const handleCardClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <Header />
      <div className="container my-3">
        <div className="search-bar">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search by Cuisine, Restaurant, or Location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='bar'
            />
            <button type='submit'>Search</button>
          </form>
        </div>
        {list.length === 0 && !resultsFound && (
          <div className="no-results-message">Sorry, no results found.</div>
        )}
        <div className="row">
          {list.map((restaurant) => (
            <div className="col-md-4" key={restaurant.id}>
              <div onClick={() => handleCardClick(restaurant.id)}>
                <Cards
                  id={restaurant.id}
                  title={restaurant.name}
                  location={restaurant.location}
                  imageUrl={restaurant.image}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="pagination-buttons">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>«</button>
          <button onClick={handleNextPage} disabled={currentPage === restaurantsPerPage}>»</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RestaurantListing;

