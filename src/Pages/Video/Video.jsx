import React, { useState } from 'react';
import './Video.css'
import { useNavigate } from 'react-router-dom';

const VideoButton = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  const backendURL = "https://pococare1.onrender.com/";
  const url = "https://wecareyou.vercel.app/";

  const handleVideoClick = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${backendURL}video`);
      if (!response.ok) {
        throw new Error('Request failed');
      }

      const res = await response.json();

      await fetch(`${backendURL}email`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem("email"),
          url: `${url}/room?roomId=${res.roomId}`,
        }),
      });

      alert("Doctor will receive an email with the Meeting Link");

      // Redirect to room page
      navigate(`/room?roomId=${res.roomId}`)
    } catch (error) {
      console.error("Error during video request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
      <button id="videobutton" onClick={handleVideoClick} style={buttonStyle}>
        START VIDEO
      </button>

      {loading && (
        <div id="spinner" style={spinnerStyle}>
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

// Styles for the button and spinner
const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#4caf50',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '18px',
  transition: 'background-color 0.3s ease',
};

const spinnerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default VideoButton;

