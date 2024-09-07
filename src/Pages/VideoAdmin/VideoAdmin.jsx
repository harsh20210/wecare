// import React, { useState, useEffect } from 'react';
// import './Video.css'
// const backendURL = "https://pococare1.onrender.com/";

// const AdminDashboard = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [userName, setUserName] = useState(localStorage.getItem('name'));

//   useEffect(() => {
//     // Fetch data when component mounts if needed
//   }, []);

//   const fetchDoctors = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${backendURL}doctors/all`);
//       const data = await response.json();
//       setDoctors(data.Doctors);
//     } catch (error) {
//       console.error('Error fetching doctors:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPatients = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${backendURL}patients/all`);
//       const data = await response.json();
//       setPatients(data.Patients);
//     } catch (error) {
//       console.error('Error fetching patients:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAppointments = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${backendURL}appointments`, {
//         method: "GET",
//         headers: {
//           Authorization: token,
//         },
//       });
//       const data = await response.json();
//       setAppointments(data.Appointments);
//     } catch (error) {
//       console.error('Error fetching appointments:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await fetch(`${backendURL}admin/logout`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token,
//         },
//       });
//       localStorage.removeItem('token');
//       localStorage.removeItem('name');
//       localStorage.removeItem('id');
//       window.location.href = `./admin.html`;
//       alert("Logging you out");
//     } catch (error) {
//       console.error('Logout request failed:', error);
//     }
//   };

//   const handleChangeVideoCall = async (id, currentStatus) => {
//     try {
//       const newStatus = currentStatus === "YES" ? "NO" : "YES";
//       setLoading(true);
//       await fetch(`${backendURL}doctors/update/${id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ videoCall: newStatus, role: "admin" }),
//       });
//       alert("Video Call Availability changed");
//       fetchDoctors(); // Refresh the list of doctors
//     } catch (error) {
//       console.error('Error changing video call status:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemoveDoctor = async (id) => {
//     try {
//       await fetch(`${backendURL}doctors/delete/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ role: 'admin' }),
//       });
//       alert("Doctor removed");
//       fetchDoctors(); // Refresh the list of doctors
//     } catch (error) {
//       console.error('Error deleting doctor:', error);
//     }
//   };

//   const handleRemovePatient = async (id) => {
//     try {
//       await fetch(`${backendURL}patients/delete/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ role: 'admin' }),
//       });
//       alert("Patient removed");
//       fetchPatients(); // Refresh the list of patients
//     } catch (error) {
//       console.error('Error deleting patient:', error);
//     }
//   };

//   const handleCancelAppointment = async (id) => {
//     try {
//       const confirmDelete = window.confirm('Are you sure you want to delete this appointment?');
//       if (confirmDelete) {
//         const token = localStorage.getItem('token');
//         await fetch(`${backendURL}appointments/delete/${id}`, {
//           method: 'DELETE',
//           headers: {
//             'Authorization': token,
//           },
//         });
//         alert('Appointment deleted');
//         fetchAppointments(); // Refresh the list of appointments
//       }
//     } catch (error) {
//       console.error('Error deleting appointment:', error);
//     }
//   };

//   return (
//     <div>
//       <div className="navbar">
//         <h1>Admin Dashboard</h1>
//         <div>
//           <h2 className="admin-name">Hi {userName}</h2>
//           <button className="logout-btn" onClick={handleLogout}>Logout</button>
//         </div>
//       </div>
//       <div>
//         <button id="viewDoc" onClick={fetchDoctors}>View all Doctors</button>
//         <button id="viewPat" onClick={fetchPatients}>View all Patients</button>
//         <button id="viewApp" onClick={fetchAppointments}>View all Appointments</button>
//       </div>
//       <div className="container">
//         {loading && <div className="spinner"></div>}
//         {doctors.length > 0 && (
//           <div>
//             {doctors.map(doctor => (
//               <div key={doctor._id} className="doctor-card">
//                 <img src={doctor.image} alt={`Doctor ${doctor.id}`} />
//                 <h2 className="doctor-name">{doctor.name}</h2>
//                 <p className="doctor-email">{doctor.email}</p>
//                 <p className="doctor-specialization">Specialization: {doctor.specialization}</p>
//                 <p className={`change${doctor._id}`}>Video Call Availability: {doctor.videoCall}</p>
//                 <button className='doctor-change' onClick={() => handleChangeVideoCall(doctor._id, doctor.videoCall)}>Change Availability</button>
//                 <button className='doctor-remove' onClick={() => handleRemoveDoctor(doctor._id)}>Remove</button>
//               </div>
//             ))}
//           </div>
//         )}
//         {patients.length > 0 && (
//           <div>
//             {patients.map(patient => (
//               <div key={patient._id} className="patient-card">
//                 <img src={patient.image} alt={`Patient ${patient.id}`} />
//                 <h2 className="patient-name">Name: {patient.name}</h2>
//                 <p className="patient-email">Email: {patient.email}</p>
//                 <button className='patient-remove' onClick={() => handleRemovePatient(patient._id)}>Remove</button>
//               </div>
//             ))}
//           </div>
//         )}
//         {appointments.length > 0 && (
//           <div>
//             {appointments.map(appointment => {
//               const date = new Date(appointment.date);
//               const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

//               return (
//                 <div key={appointment._id}>
//                   <img src={appointment.doctorId.image} alt={`Doctor ${appointment.doctorId.id}`} className='doctor-image' />
//                   <img src={appointment.patientId.image} alt={`Patient ${appointment.patientId.id}`} className='patient-image' />
//                   <p>{`Name: ${appointment.doctorId.name} | Date: ${formattedDate} | Start Time: ${appointment.startTime} | End Time: ${appointment.endTime}`}</p>
//                   <button className='cancel-appointment-btn' onClick={() => handleCancelAppointment(appointment._id)}>Cancel</button>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

