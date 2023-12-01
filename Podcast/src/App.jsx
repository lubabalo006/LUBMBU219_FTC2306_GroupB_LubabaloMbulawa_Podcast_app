import React, { useState, useEffect } from 'react';
import { SignUp, Login, Homepage } from './pages';
import { Routes, Route } from 'react-router-dom';
import FavoriteShows from "/src/pages/components/favorites";
import MainShows from '/src/pages/components/favorites';

const App = () => {
    const [token, setToken] = useState(false);
  
    if (token) {
      sessionStorage.setItem('token', JSON.stringify(token));
    }
  
    useEffect(() => {
      if (sessionStorage.getItem('token')) {
        let data = JSON.parse(sessionStorage.getItem('token'));
        setToken(data);
      }
    }, []);
  
    return (
      <div>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login setToken={setToken} />} />
  
          {token && <Route path="/homepage" element={<Homepage token={token} />} />}
  
          <Route path="/" exact element={<MainShows />} />
          <Route path="/favorites" element={<FavoriteShows />} />
        </Routes>
      </div>
    );
  };
  
  export default App;