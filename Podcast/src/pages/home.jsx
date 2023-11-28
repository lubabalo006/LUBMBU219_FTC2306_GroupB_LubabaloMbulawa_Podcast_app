import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from "/src/pages/components/navbar"


const Homepage = ({token}) => {
  let navigate = useNavigate()
  
  function handleLogout(){
    sessionStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div>
      <h3>  <Navbar/>  {token.user.user_metadata.full_name}</h3>
      <button onClick={handleLogout}>Logout</button>

    </div>
  )
}

export default Homepage