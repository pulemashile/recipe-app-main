import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function RegistrationPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(''); // For displaying validation or API errors
  const navigate = useNavigate();

  const handleRegistration = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Reset any previous error
    setError('');

    // Validate input fields
    if (!username || !password || !email) {
      setError('All fields are required!');
      return;
    }

    try {
      // Send registration request
      await axios.post('http://localhost:3000/users', { username, password, email });
      // Navigate to login page upon successful registration
      navigate('/login');
    } catch (error) {
      // Handle error response
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Display server error message
      } else {
        setError('An error occurred while registering. Please try again.');
        console.error('Error registering:', error);
      }
    }
  };

  return (
    <div className='loginform'>
      <h1>Sign up</h1>
      {error && <p className='error'>{error}</p>} {/* Display validation or API errors */}
      <form onSubmit={handleRegistration}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
}

export default RegistrationPage;
