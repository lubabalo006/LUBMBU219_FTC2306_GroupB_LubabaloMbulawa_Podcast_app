import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Main from "/src/pages/components/main"
import "./components/styles/navbar.css"





const Homepage = ({token}) => {
  let navigate = useNavigate()
  
  function handleLogout(){
    sessionStorage.removeItem('token')
    navigate('/')
  }


  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
      setDarkMode(!darkMode);
  };


  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
            <div className="theme">
                <button onClick={toggleDarkMode}>
                {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </button>
            </div>

      <h3>  <Main />  {token.user.user_metadata.full_name}</h3>
      <button onClick={handleLogout}>Logout</button>

    </div>
  )
}

export default Homepage