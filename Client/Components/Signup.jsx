import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }
  
  const clickHandler = (event) => {
    console.log('clicked')
  };
  
  const navigate = useNavigate();

  return (
    <div className='login_signup-box'>
      <form onSubmit={clickHandler} className='form_div'>
        <h1 className='sub-title'> TW-ERP</h1>
        <h2 className='sub-title'>Sign-Up</h2>
        <div className="login-form">
          <label htmlFor="name"></label>
          <input id="userName"
            type="text"
            placeholder='Username'
            className='loginInputs'
            value={username}
            onChange={handleUsernameChange}
          />
          <br />
          <input id="password"
            type="text"
            placeholder='Password'
            className='loginInputs'
            value={password}
            onChange={handlePasswordChange}
          />
          <br />
          <button type="submit" className='login_signup-btn'>Sign in</button>
        </div>
      </form>
    </div>
  );
}

export default Signup