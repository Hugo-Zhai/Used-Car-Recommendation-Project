import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CarSearch({ user }) { // Accept user as a prop here
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleMyListClick = () => {
    navigate('/likelist');
  };

  const handleSearchClick = () => {
    navigate('/searchresultpage');
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <div>
      {user.isLoggedIn && <h2>Welcome, {user.username}!</h2>}
      <h2>Find your favorite cars</h2>
      <input
        type="text"
        placeholder="search for your cars"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleLoginClick}>Log in & Register</button>
      <button onClick={handleSearchClick}>Search</button>
      <div>
        <h3>My List</h3>
        <button onClick={handleMyListClick}>Go to My List</button>
      </div>
      <div>
        <h3>Sample cars</h3>
        {/* Place logic for displaying sample cars here */}
      </div>
    </div>
  );
}

export default CarSearch;
