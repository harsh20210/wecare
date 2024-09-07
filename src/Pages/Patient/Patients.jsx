
import React, { useEffect, useState } from "react";
import './Patients.css'
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const backendURL = "https://pococare1.onrender.com/";

const Patients = () => {
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [modalType, setModalType] = useState("");
  const [spinner, setSpinner] = useState(false);

  const patientName = localStorage.getItem("name");
  const patientId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Please login");
      navigate('/signin')
    }

    fetchAppointments(patientId);
    fetchDoctors();
  }, []);

  const fetchAppointments = async (id) => {
    try {
      const response = await fetch(`${backendURL}appointments/patapp/${id}`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      setAppointments(data.Appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`${backendURL}doctors/all`);
      const data = await response.json();
      setDoctors(data.Doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleBookAppointment = (doctorId, type) => {
    setSelectedDoctorId(doctorId);
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      localStorage.clear();
      const response = await fetch(`${backendURL}patients/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (response.ok) {
        alert("Logging you out");
        navigate('/');
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const renderAppointments = () => {
    return appointments.length === 0 ? (
      <p>No Appointments</p>
    ) : (
      appointments.map((appointment) => (
        <div key={appointment._id}>
          <img src={appointment.doctorId.image} alt={appointment.doctorId.name} className="doctor-image" />
          <p>{`Name: ${appointment.doctorId.name} | Date: ${new Date(appointment.date).toLocaleDateString()} | Start Time: ${appointment.startTime} | End Time: ${appointment.endTime}`}</p>
          <button onClick={() => handleBookAppointment(appointment._id, "patch")}>Edit</button>
          <button onClick={() => handleCancelAppointment(appointment._id)}>Cancel</button>
        </div>
      ))
    );
  };

  const renderDoctors = () => {
    return doctors.map((doctor) => (
      <div key={doctor._id} className="doctor-card">
        <img src={doctor.image} alt={doctor.name} className="doctor-image" />
        <h2>{doctor.name}</h2>
        <p>{doctor.email}</p>
        <p>Specialization: {doctor.specialization}</p>
        {doctor.videoCall === "YES" ? (
          <button onClick={() => handleBookAppointment(doctor._id, "post")}>
            Available for Video Consultation
          </button>
        ) : (
          <button disabled>Video Call Not Available</button>
        )}
        <button onClick={() => handleBookAppointment(doctor._id, "post")}>Book Appointment</button>
      </div>
    ));
  };

  const handleCancelAppointment = async (appointmentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");
    if (confirmDelete) {
      try {
        const response = await fetch(`${backendURL}appointments/delete/${appointmentId}`, {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        });
        if (response.ok) {
          alert("Appointment deleted");
          fetchAppointments(patientId);
        }
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="navbar">
        <h1>Patient Dashboard</h1>
        <div>
          <h2>Hi {patientName}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="appointments-container">
        <h2>Upcoming Appointments</h2>
        <div className="appointment-info">{renderAppointments()}</div>
      </div>

      <h1>Book any doctor for your Appointment</h1>
      <div className="doctors-container">{renderDoctors()}</div>

      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          doctorId={selectedDoctorId}
          modalType={modalType}
          fetchAppointments={fetchAppointments}
        />
      )}
    </div>
  );
};

export default Patients;

