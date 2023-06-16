import React, { useState } from 'react';
import { useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import bgPattern from '../assets/patternBg.svg'
import jwt_decode from 'jwt-decode';


function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setLoggedIn } = props;
  const navigate = useNavigate();
  const [goToFeed, setGoToFeed] = useState(false);
  const [user, setUser] = useState('')

  useEffect(() => {
    const userFromLocal = localStorage.getItem("username");
    console.log('userFromLocal', userFromLocal)
    if (userFromLocal === null || userFromLocal === 'signed out') {
      return;
    } else {
      navigate('/feed')
      // setGoToFeed(true)
    }

  }, []);

//Oauth setup for Google
  const handleCallbackResponse = (response) => {
    console.log('Encoded JWT ID token' + response.credential);
    const userObj = jwt_decode(response.credential)
    console.log(userObj)
    localStorage.setItem("username", userObj.name);

    navigate('/feed');
  };
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: '123087640507-k06ltp0o18vgtlvirkhmuda5cmj28foo.apps.googleusercontent.com',
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById('GoogleOAuth'),
      { type: "icon", theme: "outline", size: "large", shape: "circle" }
    );

    google.accounts.id.prompt();
  },[]);
  
  //Git Oauth setup
  useEffect(() => {
    const queryString = window.location.search;
    const urlParmas = new URLSearchParams(queryString);
    const codeParam = urlParmas.get('code');
    // console.log('codeParam', codeParam);
  },[])

  const handleGitAuth = () => {
     const client_id = encodeURIComponent('80ebd350ec5d93ad08ca');
    window.location.assign('https://github.com/login/oauth/authorize?client_id=' + client_id);


    // const client_id = encodeURIComponent('80ebd350ec5d93ad08ca');
    // const redirect_uri = encodeURIComponent('http://localhost:8080');
    // console.log(redirect_uri)
    // const fetchUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`;
    // fetch('fetchUrl', {method: 'GET'})
    //   .then(response => {
    //     console.log(response);
    //   });
  }


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
          localStorage.setItem("username", username);
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
          <h1 className='sub-title'>TW-ERP</h1>
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
        <div id='OAuth-box'>

          <div id='GoogleOAuth'></div>
          {/* <button onClick={handleGitAuth} id='GithubOAuth'>Github Button</button> */}
          {/* <img src="../assets/github-mark-white.png" ></img> */}
          {/* <img id='github-logo' src='../assets/github-logo.png' alt="GitHub logo" onClick={handleGitAuth}></img>*/}
          {/* <div id='github-logo'><i className="fa-brands fa-github"></i></div> */}
          {/* <div className="github-circle-container"></div> */}
          <div className="github-outer">
          <div onClick={handleGitAuth} id='github-logo'><i className="bi bi-github"></i></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;


// https://github.com/login/oauth/authorize?client_id=<client_id>&redirect_uri=http://localhost:3000/feed

