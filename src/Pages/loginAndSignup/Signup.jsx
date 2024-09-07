import React, { useState } from 'react';
import './Signup.css'

const Signup = () => {
  const backendURL = "https://pococare1.onrender.com/";

  const [isDoctor, setIsDoctor] = useState(false);
  const [spinner, setSpinner] = useState(false);

  // Form states
  const [doctorForm, setDoctorForm] = useState({
    name: '',
    email: '',
    password: '',
    specialisation: 'heart',
    videoCall: 'NO',
    image: ''
  });

  const [patientForm, setPatientForm] = useState({
    name: '',
    email: '',
    password: '',
    image: ''
  });

  const handleDoctorChange = (e) => {
    setDoctorForm({ ...doctorForm, [e.target.name]: e.target.value });
  };

  const handlePatientChange = (e) => {
    setPatientForm({ ...patientForm, [e.target.name]: e.target.value });
  };

  // Submitting doctor form
  const handleDoctorSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    
    try {
      const response = await fetch(`${backendURL}doctors/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(doctorForm)
      });
      const data = await response.json();
      setSpinner(false);
      alert(data.message);
      window.location.href = `/signin`;
    } catch (error) {
      console.error(error);
      setSpinner(false);
    }
  };

  // Submitting patient form
  const handlePatientSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    
    try {
      const response = await fetch(`${backendURL}patients/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(patientForm)
      });
      const data = await response.json();
      setSpinner(false);
      alert(data.message);
      window.location.href = `/signin`;
    } catch (error) {
      console.error(error);
      setSpinner(false);
    }
  };

  return (
    <div>
      <nav>
        <div id="index">
          <h1 onClick={() => window.location.href = `/`}>WeCare</h1>
        </div>

        <div id="buttons">
          <button onClick={() => window.location.href = `/`}>Home</button>
          <button onClick={() => window.location.href = `/signin`}>Click if you already have an account</button>
        </div>
      </nav>

      <h1>Welcome to Doctor's Appointment Booking Application</h1>

      <div className="role-buttons">
        <h1>Are you</h1>
        <button onClick={() => setIsDoctor(true)}>Doctor</button>
        <button onClick={() => setIsDoctor(false)}>Patient</button>
      </div>

      <div className="container">
        {isDoctor ? (
          <div className="form" style={{ display:"block" }}>
            <h2>Doctor Signup</h2>
            <form onSubmit={handleDoctorSubmit}>
              <label htmlFor="doctorName">Name</label>
              <input type="text" id="doctorName" name="name" value={doctorForm.name} onChange={handleDoctorChange} required />

              <label htmlFor="doctorEmail">Email</label>
              <input type="email" id="doctorEmail" name="email" value={doctorForm.email} onChange={handleDoctorChange} required />

              <label htmlFor="doctorPassword">Password</label>
              <input type="password" id="doctorPassword" name="password" value={doctorForm.password} onChange={handleDoctorChange} required />

              <label htmlFor="doctorSpecialisation">Specialisation</label>
              <select id="doctorSpecialisation" name="specialisation" value={doctorForm.specialisation} onChange={handleDoctorChange}>
                <option value="heart">Heart</option>
                <option value="kidney">Kidney</option>
                <option value="general">General</option>
              </select>

              <label htmlFor="doctorVideocall">Video Call Availability</label>
              <select id="doctorVideocall" name="videoCall" value={doctorForm.videoCall} onChange={handleDoctorChange}>
                <option value="NO">NO</option>
                <option value="YES">YES</option>
              </select>

              <label htmlFor="doctorImage">Image (URL)</label>
              <input type="text" id="doctorImage" name="image" value={doctorForm.image} onChange={handleDoctorChange} required />

              <button type="submit">Signup</button>
            </form>
          </div>
        ) : (
          <div className="form" style={{ display:"block" }}>
            <h2>Patient Signup</h2>
            <form onSubmit={handlePatientSubmit}>
              <label htmlFor="patientName">Name</label>
              <input type="text" id="patientName" name="name" value={patientForm.name} onChange={handlePatientChange} required />

              <label htmlFor="patientEmail">Email</label>
              <input type="email" id="patientEmail" name="email" value={patientForm.email} onChange={handlePatientChange} required />

              <label htmlFor="patientPassword">Password</label>
              <input type="password" id="patientPassword" name="password" value={patientForm.password} onChange={handlePatientChange} required />

              <label htmlFor="patientImage">Image (URL)</label>
              <input type="text" id="patientImage" name="image" value={patientForm.image} onChange={handlePatientChange} required />

              <button type="submit">Signup</button>
            </form>
          </div>
        )}
      </div>

      {spinner && <div id="spinner">Loading...</div>}
    </div>
  );
};

export default Signup;

