import React, { useState } from 'react';
import Login from './Components/login.jsx';
import Signup from './Components/Signup.jsx';
import Feed from './Components/Feed.jsx';
import { Route, Routes, useNavigate, Navigate, Link} from 'react-router-dom';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [tempUser, setTempUser] = useState('Joe Smo')
  
  return (
    <>
      <Routes >
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path ='/feed' element={<Feed />}/>
      </Routes>
    </> 
  );
};

export default App;


// previous group
    // <div>
    //   <p>WE GOT THIS!</p>
      
    //   loggedIn ? loginpage:querypage
    //   {loggedIn && <Login setLoggedIn={setLoggedIn}/>}
    // </div>