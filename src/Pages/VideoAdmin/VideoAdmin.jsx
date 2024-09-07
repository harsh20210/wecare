import React, { useEffect, useState } from 'react';
import './VideoAdmin.css';

const backendURL = "https://pococare1.onrender.com/";

function VideoAdmin() {
    const [adminName, setAdminName] = useState(localStorage.getItem('name') || '');
    const [containerContent, setContainerContent] = useState(null);

    const fetchDoctors = async () => {
        try {
            const response = await fetch(`${backendURL}doctors/all`);
            const data = await response.json();
            setContainerContent(renderDoctors(data.Doctors));
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const fetchPatients = async () => {
        try {
            const response = await fetch(`${backendURL}patients/all`);
            const data = await response.json();
            setContainerContent(renderPatients(data.Patients));
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    const fetchAppointments = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${backendURL}appointments`, {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            });
            const data = await response.json();
            setContainerContent(renderAppointments(data.Appointments));
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const renderDoctors = (doctors) => (
        doctors.map(doctor => (
            <div key={doctor._id} className="doctor-card">
                <img src={doctor.image} alt={`Doctor ${doctor.id}`} />
                <h2>{doctor.name}</h2>
                <p>{doctor.email}</p>
                <p>Specialization: {doctor.specialization}</p>
                <p id={`change${doctor._id}`}>Video Call Availability: {doctor.videoCall}</p>
                <button onClick={() => changeAvailability(doctor._id, doctor.videoCall)}>Change Availability</button>
                <button onClick={() => removeDoctor(doctor._id)}>Remove</button>
            </div>
        ))
    );

    const renderPatients = (patients) => (
        patients.map(patient => (
            <div key={patient._id} className="patient-card">
                <img src={patient.image} alt={`Patient ${patient.id}`} />
                <h2>{patient.name}</h2>
                <p>{patient.email}</p>
                <button onClick={() => removePatient(patient._id)}>Remove</button>
            </div>
        ))
    );

    const renderAppointments = (appointments) => (
        appointments.map(appointment => {
            const formattedDate = new Date(appointment.date).toISOString().split('T')[0];
            return (
                <div key={appointment._id}>
                    <img src={appointment.doctorId.image} alt="Doctor" />
                    <img src={appointment.patientId.image} alt="Patient" />
                    <p>{appointment.doctorId.name} | {formattedDate} | {appointment.startTime} - {appointment.endTime}</p>
                    <button onClick={() => cancelAppointment(appointment._id)}>Cancel</button>
                </div>
            );
        })
    );

    const changeAvailability = async (id, currentAvailability) => {
        const newAvailability = currentAvailability === 'YES' ? 'NO' : 'YES';
        const obj = { videoCall: newAvailability, role: 'admin' };

        try {
            const response = await fetch(`${backendURL}doctors/update/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj),
            });
            if (response.ok) {
                fetchDoctors();
            } else {
                alert('Error updating availability');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const removeDoctor = async (id) => {
        try {
            const response = await fetch(`${backendURL}doctors/delete/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: 'admin' }),
            });
            if (response.ok) {
                fetchDoctors();
            } else {
                alert('Error removing doctor');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const removePatient = async (id) => {
        try {
            const response = await fetch(`${backendURL}patients/delete/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: 'admin' }),
            });
            if (response.ok) {
                fetchPatients();
            } else {
                alert('Error removing patient');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const cancelAppointment = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${backendURL}appointments/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: token,
                },
            });
            if (response.ok) {
                fetchAppointments();
            } else {
                alert('Error cancelling appointment');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleLogout = () => {
        const token = localStorage.getItem('token');
        localStorage.clear();
        fetch(`${backendURL}admin/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: token },
        }).then(response => {
            if (response.ok) {
                alert('Logged out');
                window.location.href = './admin.html';
            }
        }).catch(error => {
            console.error('Logout error:', error);
        });
    };

    return (
        <div>
            <div className="navbar">
                <h1>Admin Dashboard</h1>
                <div>
                    <h2>Hi {adminName}</h2>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className="controls">
                <button onClick={fetchDoctors}>View all Doctors</button>
                <button onClick={fetchPatients}>View all Patients</button>
                <button onClick={fetchAppointments}>View all Appointments</button>
            </div>
            <div className="container">
                {containerContent || <p>Select a section to view data</p>}
            </div>
        </div>
    );
}

export default VideoAdmin;
