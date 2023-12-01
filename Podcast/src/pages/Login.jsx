import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { supabase } from '/src/client';
import "./components/styles/login.css"

const Login = ({setToken}) => {
  let navigate = useNavigate()

  const [formData,setFormData] = useState({
        email:'',password:''
  })

  console.log(formData)

  function handleChange(event){
    setFormData((prevFormData)=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }

    })

  }

  async function handleSubmit(e){
    e.preventDefault()

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          })

      if (error) throw error
      console.log(data)
      setToken(data)
      navigate('/homepage')


      
    } catch (error) {
      alert(error)
    }
  }


return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-title">
          <span>Sign in to your</span>
        </div>
        <div className="title-2">
          <span>SPACE-APP</span>
        </div>
        <div className="input-container">
          <input
            className="input-mail"
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <section className="bg-stars">
          {/* Your star background */}
        </section>

        <div className="input-container">
          <input
            className="input-pwd"
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit">
          <span className="sign-text">Sign in</span>
        </button>

        <p className="signup-link">
        Don't have an account? <Link to='/SignUp'>Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login
