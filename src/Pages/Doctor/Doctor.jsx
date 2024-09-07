import React, { useEffect, useState } from 'react';
import { fetchDoctorData, fetchAppointments, updateVideoCallStatus, deleteAppointment, logout } from './services/services';
import Appointment from './Appointment';
import { useNavigate } from 'react-router-dom';
import './Doctor.css'

const Doctor = () => {
    const [videoCall, setVideoCall] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const doctorId = localStorage.getItem('id');
    const doctorName = localStorage.getItem('name');

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            alert("Please login");
            navigate('/signin');
        } else {
            fetchDoctorData(doctorId, setVideoCall);
            fetchAppointmentsData(doctorId);
        }
    }, [doctorId, navigate]);

    const fetchAppointmentsData = async (id) => {
        setLoading(true);
        const data = await fetchAppointments(id);
        setAppointments(data);
        setLoading(false);
    };

    const handleVideoCallChange = async () => {
        const updatedStatus = videoCall === 'YES' ? 'NO' : 'YES';
        await updateVideoCallStatus(doctorId, updatedStatus);
        setVideoCall(updatedStatus);
        alert('Video call availability updated successfully');
    };

    const handleDeleteAppointment = async (appointmentId) => {
        if (window.confirm('Are you sure you want to delete this appointment?')) {
            setLoading(true);
            await deleteAppointment(appointmentId);
            fetchAppointmentsData(doctorId);
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        localStorage.clear();
        navigate('/');
        alert("Logged out successfully");
    };

    return (
        <div>
            <div className="navbar">
                <h1>Doctor Dashboard</h1>
                <div>
                    <h2 className="doctor-name">Hi {doctorName}</h2>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </div>
            
            <div>
                <p>Video Call Availability: <strong>{videoCall}</strong></p>
                <button onClick={handleVideoCallChange}>Click here to change Video Call Availability</button>
            </div>
            
            <div className="appointments-container">
                <h2>Upcoming Appointments</h2>
                {loading ? <p>Loading...</p> : (
                    appointments.length === 0 
                        ? <p>No Appointments</p> 
                        : appointments.map((appointment) => (
                            <Appointment 
                                key={appointment._id} 
                                appointment={appointment} 
                                onDelete={() => handleDeleteAppointment(appointment._id)} 
                            />
                        ))
                )}
            </div>
        </div>
    );
};

export default Doctor;

