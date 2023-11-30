import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '/src/client';

const SignUp = () => {

  const [formData,setFormData] = useState({
    fullName:'',email:'',password:''
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
      const { data, error } = await supabase.auth.signUp(
        {
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
            }
          }
        }
      )
      if (error) throw error
      alert('Check your email for verification link')

      
    } catch (error) {
      alert(error)
    }
  }




  return (
<div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-title">
          <span>Sign up for your</span>
        </div>
        <div className="title-2">
          <span>SPACE</span>
        </div>

        <div className="input-container">
          <input
            className="input-mail"
            type="email"
            placeholder="Fullname"
            name="fullname"
            value={formData.fullName}
            onChange={handleChange}
          />
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
          {}
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
          <span className="sign-text">Sign Up</span>
        </button>

        <p className="signup-link">
        Have an account? <Link to='/login'>Login</Link>
        </p>
      </form>
    </div>
  )
}

export default SignUp
/*
<div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-title">
          <span>Sign up for your</span>
        </div>
        <div className="title-2">
          <span>SPACE</span>
        </div>

        <div className="input-container">
          <input
            className="input-mail"
            type="email"
            placeholder="Fullname"
            name="fullname"
            value={formData.fullName}
            onChange={handleChange}
          />
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
          {}
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
          <span className="sign-text">Sign Up</span>
        </button>

        <p className="signup-link">
          No account?
          <a href="#" className="up">
            Sign up!
          </a>
        </p>
      </form>
    </div>
    
*/
