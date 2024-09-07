const backendURL = "https://pococare1.onrender.com/";

export const fetchDoctorData = async (id, setVideoCall) => {
    try {
        const response = await fetch(`${backendURL}doctors/getdoctor/${id}`);
        const data = await response.json();
        setVideoCall(data.Doctor.videoCall);
    } catch (error) {
        console.error('Error fetching doctor data:', error);
    }
};

export const fetchAppointments = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${backendURL}appointments/docapp/${id}`, {
            method: "GET",
            headers: {
                Authorization: token,
            },
        });
        const data = await response.json();
        return data.Appointments;
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
};

export const updateVideoCallStatus = async (id, status) => {
    try {
        const response = await fetch(`${backendURL}doctors/update/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ videoCall: status, role: "doctor" }),
        });
        return response.ok;
    } catch (error) {
        console.error('Error updating video call status:', error);
    }
};

export const deleteAppointment = async (appointmentId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${backendURL}appointments/delete/${appointmentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        });
        return response.ok;
    } catch (error) {
        console.error('Error deleting appointment:', error);
    }
};

export const logout = async () => {
    try {
        const token = localStorage.getItem('token');
        await fetch(`${backendURL}doctors/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
    } catch (error) {
        console.error('Error during logout:', error);
    }
};

