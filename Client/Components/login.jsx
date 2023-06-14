import React, {useState} from 'react';
import { useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

function Login (props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setLoggedIn} = props;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      // const cookie = await fetch('/')
      // console.log('login element checking cookie', document.cookie)
      const cookie = await fetch('/getcookie');
      console.log(cookie);
    }
    fetchData();
  }, [])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const clickHandler = (event) => {
    event.preventDefault();
    
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(data => data.json())
    .then(data => {
      console.log('data from logging in', data);
      if (data.err) {
        //clears fields if error
        setUsername('');
        setPassword('');
        //redirects to login
        navigate('/login');
      } else {
        navigate('/feed');
      }
      
      // console.log('verification result', data)
    }
      )
    .catch(err => console.log('error', err));
  }

  const signupHandler = () => {
    navigate('/signup');
  }
  return (
    <div className='login_signup-box'>
      <form onSubmit={clickHandler} className='form_div'>
        <h1 className='sub-title'> TW-ERP </h1>
        {/* <h2 className='sub-title'>Login</h2> */}
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
      <div className='createAccount'>
        <p className='newToTag'><span>New to TW-ERP?</span></p>
        <button className='login_signup-btn' onClick={signupHandler}>Join the TW-ERP family</button>
      </div>
    </div>
  );
}

export default Login;
