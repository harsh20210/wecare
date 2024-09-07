import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../Pages/Home/HomePage";
import Admin from "../Pages/Admin/Admin";
import Signin from "../Pages/loginAndSignup/Signin";
import Signup from "../Pages/loginAndSignup/Signup";
import Doctor from "../Pages/Doctor/Doctor";
import Patients from "../Pages/Patient/Patients";
import Room from "../Pages/Room/Room";

export default function Routers() {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
         <Route path="/signup" element={<Signup/>} /> 
        <Route path="/signin" element={<Signin/>} />
        <Route path="/Admin" element={<Admin/>} />
        <Route path="/doctordashboard" element={<Doctor/>} />
        <Route path="/patientdashboard" element={<Patients/>} />
        <Route path="/room" element={<Room/>} />
    </Routes>
  )
}
