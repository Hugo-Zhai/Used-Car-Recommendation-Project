// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarSearch from './CarSearch';
import LoginPage from './LoginPage';
import LikeListPage from './LikeListPage';
import SearchResultPage from './SearchResultPage';

function App() {
  const [user, setUser] = useState({ isLoggedIn: false, username: '' });

  const handleLoginSuccess = (username) => {
    setUser({ isLoggedIn: true, username });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CarSearch user={user} />} />
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/likelist" element={<LikeListPage />} />
        <Route path="/searchresultpage" element={<SearchResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
