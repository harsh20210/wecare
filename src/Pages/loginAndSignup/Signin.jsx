import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signin.css'

const backendURL = "https://pococare1.onrender.com/";

const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patientCredentials, setPatientCredentials] = useState({ email: "", password: "" });
  const [doctorCredentials, setDoctorCredentials] = useState({ email: "", password: "" });
  const history = useNavigate();

  // Navigation buttons
  const handleAdminLogin = () => history('/Admin');
  const handleSignup = () => history('/Signup');
  const handleHome = () => history('/');

  // Patient login handler
  const handlePatientLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    let obj = {
      email: patientCredentials.email,
      password: patientCredentials.password,
    };

    const validationTimeout = setTimeout(() => {
      if (isLoading) {
        alert("Validation is taking longer than expected. Please wait.");
      }
    }, 6000);

    let verifyingLogin = await fetch(`${backendURL}patients/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });

    clearTimeout(validationTimeout);
    setIsLoading(false);

    let res = await verifyingLogin.json();
    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("name", res.name);
      localStorage.setItem("id", res.id);
      alert(res.message);
      setPatientCredentials({ email: "", password: "" });
      history('/patientdashboard');
    } else {
      alert("Invalid Credentials");
    }
  };

  // Doctor login handler
  const handleDoctorLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    let obj = {
      email: doctorCredentials.email,
      password: doctorCredentials.password,
    };

    const validationTimeout = setTimeout(() => {
      if (isLoading) {
        alert("Validation is taking longer than expected. Please wait.");
      }
    }, 6000);

    let verifyingLogin = await fetch(`${backendURL}doctors/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    });

    clearTimeout(validationTimeout);
    setIsLoading(false);

    let res = await verifyingLogin.json();
    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("name", res.name);
      localStorage.setItem("id", res.id);
      alert(res.message);
      setDoctorCredentials({ email: "", password: "" });
      history('/doctordashboard');
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div>
      <nav>
        <div id="index">
          <h1 onClick={handleHome}>WeCare</h1>
        </div>
        <div id="buttons">
          <button onClick={handleHome}>Home</button>
          <button onClick={handleAdminLogin}>Login as ADMIN</button>
          <button onClick={handleSignup}>Click to Create an account</button>
        </div>
      </nav>

      <h1>Welcome to Doctor's Appointment Booking Application</h1>

      <div className="container">
        <div className="form patient" style={{ display:"block" }}>
          <h2>Login as Patient</h2>
          <form onSubmit={handlePatientLogin}>
            <label>Email</label>
            <input 
              type="email" 
              value={patientCredentials.email}
              onChange={(e) => setPatientCredentials({ ...patientCredentials, email: e.target.value })}
              required 
            />
            <label>Password</label>
            <input 
              type="password" 
              value={patientCredentials.password}
              onChange={(e) => setPatientCredentials({ ...patientCredentials, password: e.target.value })}
              required 
            />
            <button type="submit">Login</button>
          </form>
        </div>
        <div className="form doctor" style={{ display:'block' }}>
          <h2>Login as Doctor</h2>
          <form onSubmit={handleDoctorLogin}>
            <label>Email</label>
            <input 
              type="email" 
              value={doctorCredentials.email}
              onChange={(e) => setDoctorCredentials({ ...doctorCredentials, email: e.target.value })}
              required 
            />
            <label>Password</label>
            <input 
              type="password" 
              value={doctorCredentials.password}
              onChange={(e) => setDoctorCredentials({ ...doctorCredentials, password: e.target.value })}
              required 
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>

      {isLoading && <div id="spinner">Loading...</div>}
    </div>
  );
};

export default Signin;

