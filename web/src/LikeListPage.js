// LikeListPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LikeListPage() {
  const navigate = useNavigate();

  // 假设我们有一个状态来存储用户喜欢的车辆
  const [likedCars, setLikedCars] = useState(['Car1', 'Car2', 'Car3']);

  // 我们还需要一个状态来存储搜索词
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // 这里添加搜索的逻辑
    console.log(`Searching for: ${searchTerm}`);
  };

  const handleRemoveFromList = (car) => {
    // 这里添加从列表中移除车辆的逻辑
    setLikedCars(likedCars.filter((item) => item !== car));
  };

  const handleHomeClick = () => {
    // 这里添加返回HomePage的逻辑
    navigate('/');
  };

  return (
    <div>
      <h1>Like List</h1>
      <button onClick={handleHomeClick}>Home</button>
      <input
        type="text"
        placeholder="search for your cars in list"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {/* 这里添加"My List"的逻辑 */}
        {likedCars.map((car, index) => (
          <div key={index}>
            <p>{car}</p>
            <button onClick={() => handleRemoveFromList(car)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LikeListPage;
