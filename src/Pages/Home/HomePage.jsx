import React from 'react'
import './HomePage.css'
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  
  const handleclickEvent = (key) => {
    if(key === "login") {
     navigate('/signin')
   } else {
      navigate('/signup')
    }
 } 
  
  return (
    <>
          <nav>
        <div id="index">
          <h1>WeCare</h1>
        </div>

        <div id="buttons">
          <button id="login" onClick={() => handleclickEvent('login')}>LOGIN</button>

          <button id="signup" onClick={() => handleclickEvent('singup')}>SIGNUP</button>
        </div>
      </nav>
      <div id="maincard">
        <div>
          <h1>Welcome to Doctor Appointment Booking Application</h1>
        </div>

        <div>
          <img
            src="https://www.pococare.com/Images/banner_image.png"
            alt="wecare_image"
          />
        </div>
      </div>

      <h1 id="offer">What we offer</h1>

      <div id="services">
        <div>
          <div>
            <h1>Best Doctors Available All Over India</h1>
          </div>
          <div>
            <img
              src=" https://img.freepik.com/free-photo/doctor-nurses-special-equipment_23-2148980721.jpg?w=740&t=st=1687871336~exp=1687871936~hmac=cafebc5917234993975d2efff33e262d206fea3c6d412d1c81b4558437349277"
              alt=""
            />
          </div>
        </div>

        <br />
        <div>
          <div>
            <h1>Just Signup and Start Booking appointments</h1>
          </div>

          <div>
            <img
              src="https://img.freepik.com/free-photo/young-doctor-supporting-his-patient_1098-2237.jpg?w=740&t=st=1687871522~exp=1687872122~hmac=9b9f7ba79749f10e06f6beef15573378b2580eaba5912f123f461a0317d58ea8"
              alt=""
            />
          </div>
        </div>
        <br />
        <div>
          <div>
            <h1>
              Here, Our Doctors offer Video Call Consultations, Cool Isnt it?
            </h1>
          </div>

          <div>
            <img
              src="https://img.freepik.com/free-photo/old-disabled-woman-lying-hospital-bed-having-online-video-call-with-doctor-nurse-is-her_482257-20630.jpg?w=826&t=st=1687871700~exp=1687872300~hmac=0eda02317e5edf30b301b74a3acf912b496e8e67032765f2bc11d63e44e3fd39"
              alt=""
            />
          </div>
        </div>
      </div>

      <footer>
        <a href="https://github.com/DhaanuI">Follow us </a>
        <br />
        <br />
        <a href="https://dhaanui.github.io/">For More information</a>
      </footer>
    </>
  )
}

