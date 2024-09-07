import React, { useState } from "react";

const backendURL = "https://pococare1.onrender.com/";

const Modal = ({ closeModal, doctorId, modalType, fetchAppointments }) => {
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const token = localStorage.getItem("token");
  const patientId = localStorage.getItem("id");

  const handleConfirm = async () => {
    const startTime = convertTo24Hr(selectedTime);
    const endTime = calculateEndTime(startTime);

    const data = {
      doctorId,
      date: selectedDate,
      startTime,
      endTime,
      patientId,
    };

    const url = modalType === "post" ? "appointments/add" : `appointments/update/${doctorId}`;
    const method = modalType === "post" ? "POST" : "PATCH";

    try {
      await fetch(`${backendURL}${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data),
      });
      fetchAppointments(patientId);
      closeModal();
    } catch (error) {
      console.error("Error handling appointment:", error);
    }
  };

  const convertTo24Hr = (time) => {
    // Conversion logic from AM/PM to 24-hour format
  };

  const calculateEndTime = (startTime) => {
    // Logic to calculate end time based on start time
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Book Appointment</h2>
          <span onClick={closeModal} className="modal-close">
            &times;
          </span>
        </div>
        <div>
          <p>Date: </p>
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />

          <p>Select Time Interval:</p>
          <div>
            <input type="radio" value="10 AM-11 AM" onChange={(e) => setSelectedTime(e.target.value)} /> 10 AM-11 AM
          </div>
          {/* Add other time options similarly */}

          <button onClick={handleConfirm}>Confirm Appointment</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

