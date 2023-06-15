import React, { useState } from 'react';
import { useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import bgPattern from '../assets/patternBg.svg'

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setLoggedIn } = props;
  const navigate = useNavigate();
  const [goToFeed, setGoToFeed] = useState(false);
  const [user, setUser] = useState({})

  useEffect(() => {
    // console.log('')
    async function fetchData() {
      // const cookie = await fetch('/')
      // console.log('login element checking cookie', document.cookie)
      //fix else statement in the server
      const cookie = await fetch('/getcookie').then(ans => ans.json());
      console.log('cookie inside of useeffect', cookie);
      if (cookie) {
        // setUser(cookie)
        localStorage.setItem("username", cookie.username);
        setGoToFeed(true)
      }
      // return cookie;
    }
    fetchData();
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (goToFeed) {
        // navigate('/feed')
        return navigate('/feed', { state: { userdata: {username: user.username} } })
      }
    }, 0)
  }, [goToFeed])

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
        if (data.err || data.error) {
          //clears fields if error
          // console.log('data err')
          setUsername('');
          setPassword('');
          //redirects to login
          navigate('/');
        } else {
          navigate('/feed');
        }
        // { state: { userdata: {username: username} } }
        // console.log('verification result', data)
      }
      )
      .catch(err => console.log('error', err));
  }

  const signupHandler = () => {
    navigate('/signup');
  }
  return (
    <div className='login_signup-background'>
      <img src={bgPattern} className='bg-pattern' />
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
              type="password"
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
          <button className='signup_login-btn' onClick={signupHandler}>Create an account</button>
        </div>
        <div className='OAuth-box'>
          <button className='OAuth-btn'>Sign in with Github</button>
        </div>
      </div>
    </div>
  );
}

export default Login;


// https://github.com/login/oauth/authorize?client_id=<client_id>&redirect_uri=http://localhost:3000/feed


// const oAuthHandler = () => {
//   fetch('/login', {
//     method: 'GET',
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8'
//     }
//   })
//   .then(data => data.json())
//   .then(data => {
//     console.log('data from logging in', data);
//     if (data.err || data.error) {
//       //clears fields if error
//       // console.log('data err')
//       setUsername('');
//       setPassword('');
//       //redirects to login
//       navigate('/login');
//     } else {
//       navigate('/feed');
//     }
    
//     // console.log('verification result', data)
//   }
//     )
//   .catch(err => console.log('error', err));
// };