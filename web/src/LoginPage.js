// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({ onLoginSuccess }) { // Make sure to accept the prop here
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Try to login
    const response = await fetch(`/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
    const result = await response.text();

    if (response.ok && result !== 'Invalid login credentials') {
      // Call the onLoginSuccess function with the username
      onLoginSuccess(username);  
      navigate('/'); // Navigate to homepage
    } else {
      alert(result); // Show error message
    }
  };
  
  const handleRegister = async () => {
    // Try to register
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username,
        password,
        state_id: '', // Placeholder, you will need to handle these inputs
        gender: '', // Placeholder, you will need to handle these inputs
      }),
    });

    const result = await response.text();

    if (response.ok && result !== 'Please provide all required information: username, password, state ID, and gender') {
      alert('Registration successful!');
      navigate('/'); // Redirect to homepage after successful registration
    } else {
      alert(result); // Show error message
    }
  };

  return (
    <div>
      <h1>Log in & Register</h1>
      <div>
        <input 
          type="text" 
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Log in</button>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default LoginPage;
