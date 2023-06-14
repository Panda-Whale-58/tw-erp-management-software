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
    return (
      <form onSubmit={clickHandler}>
        <div className="form-group">
          <label htmlFor="name"></label>
          Username:
          <input id="userName"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
          Password:
          <input id="password"
            type="text"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="submit">Submit</button>
        </div>
      </form>
    );
}
export default Login;
