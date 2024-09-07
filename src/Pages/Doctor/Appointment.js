import React from 'react';

const Appointment = ({ appointment, onDelete }) => {
    const { patientId, date, startTime, endTime } = appointment;

    const formattedDate = new Date(date).toLocaleDateString();

    return (
        <div className="appointment-info">
            <img src={patientId.image} alt="Patient" className="doctor-image" />
            <p>Name: {patientId.name} | Date: {formattedDate} | Start Time: {startTime} | End Time: {endTime}</p>
            <button onClick={onDelete} className="cancel-appointment-btn">Cancel</button>
        </div>
    );
};

export default Appointment;

