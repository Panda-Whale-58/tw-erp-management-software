import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const signupHandler = (event) => {
    event.preventDefault();
    if (password === confirmPassword && username.length !== 0 && password.length !== 0){
      fetch('/signup', 
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      })
      .then(data => data.json())
      .then(data => {
        console.log('Data from logging in: ', data);
        if (data.err || data.error) {
          setUsername('');
          setPassword('');

          navigate('/login');
        } else {
          navigate('/feed');
        }
        
        // console.log('verification result', data)
      }
        )
      .catch(err => console.log('error', err));
    } else{
      window.alert('Cannot leave required fields blank')
      setPassword('');
      setConfirmPassword('');
    }
  }

  const loginHandler = () => {
    navigate('/login');
  };
  
  const navigate = useNavigate();

  return (
    <div className='login_signup-background'>
      <div className='login_signup-box'>
        <form onSubmit={signupHandler} className='form_div'>
          <h1 className='sub-title'> TW-ERP </h1>
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
              type="password"
              placeholder='Password'
              className='loginInputs'
              value={password}
              onChange={handlePasswordChange}
            />
            <br />
            <input id="confirm-password"
              type="password"
              placeholder='Confirm password'
              className='loginInputs'
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <br />
            <button type="submit" className='login_signup-btn'>Create Account</button>
          </div>
        </form>
        <div className='createAccount'>
          <p className='newToTag'><span>Already have an account?</span></p>
          <button className='signup_login-btn' onClick={loginHandler}>Sign in here</button>
        </div>
      </div>
    </div>
  );
}

export default Signup