import { useState } from 'react'
import './App.css'
import logo from "./assets/logo.png";
import { Link } from 'react-router-dom'

function Register() {
  return (
    <>
      <div className="body">
        <div className="header">
          <img src={logo} alt="website" />
          <h1>STUDENT APPLICATION TRACKER
          </h1>
        </div>

        <h2 className="x">
          An AI-Powered Solution for all your requests, all under one platform!
        </h2>


        <h4 className="ENTER">
          DEFINE YOUR ROLE
        </h4>

        <div className="b">
          <Link to="/student">
            <button className="i">
              Student
            </button>
          </Link>
          <Link to="/teacher">
            <button className="j">
              Teacher
            </button>
          </Link>
        </div>


        <p className="Owners">
          © 2024-CE-84 x 2024-CE-61
        </p>

      </div>
    </>





  )
}


export default Register
