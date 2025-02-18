import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import picture from "../assets/thumb-1920-918932.jpg";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  // For displaying error messages
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Reset error state
    setError('');

    // Validate input fields
    if (!username || !password) {
      setError('Username and password are required!');
      return;
    }

    try {
      // getting everythging isnside the localhost/user
      const response = await axios.get('http://localhost:3000/users');
      console.log(response);
      
      if (response.data) //it checks if the user if you are returning not null or zero
      {
        const user = response.data.find(user => user.username === username && user.password === password);//find an element with this password and usernmae
        // Store the authentication token
       
        
        if(user)
       {
        localStorage.setItem('authToken', JSON.stringify(user));
        // Redirect to the home page after successful login
        console.log(user);
        navigate('/');
        }
        else
        alert('Invalid username or password!');


      } else {
        // Handle case where token is not returned
        setError('Login failed. Please check your username and password.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Display server error message
      } else {
        setError('An error occurred while logging in. Please try again.');
        console.error('Error logging in:', error);
      }
    }
  };

  return (
    <div className='container'>
      <div className='image'>
        <img src={picture} alt="Background" />
      </div>
      <div className='loginform'>
        <h1>Login</h1>
        {error && <p className='error'>{error}</p>} {/* Display error message */}
        <form onSubmit={handleLogin}>
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
          <div className='loginbtn'>
            <button type="submit">Login</button>
            <p> Don't have an account? <Link to="/register">Register here</Link>.</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
