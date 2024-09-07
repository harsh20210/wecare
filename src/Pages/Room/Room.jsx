import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import io from 'socket.io-client';

const Room = () => {
  const [stream, setStream] = useState(null);
  const [peers, setPeers] = useState({});
  const videoGridRef = useRef(null);
  const myVideoRef = useRef(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const socket = io("https://pococare1.onrender.com/", {
    transports: ["websocket"]  // to avoid CORS
  });

  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const searchParams = new URLSearchParams(url.search);
  const ROOM_ID = searchParams.get('roomId');

  useEffect(() => {
    const myPeer = new Peer();

    // Get media stream (video/audio)
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(localStream => {
      setStream(localStream);

      const myVideo = myVideoRef.current;
      myVideo.srcObject = localStream;
      myVideo.muted = true;
      myVideo.addEventListener('loadedmetadata', () => {
        myVideo.play();
      });
      videoGridRef.current.append(myVideo);

      // Answering incoming call and render the user's stream
      myPeer.on('call', call => {
        call.answer(localStream);
        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
          addVideoStream(video, userVideoStream);
        });
      });

      // User connects
      socket.on('user-connected', userId => {
        connectToNewUser(userId, localStream, myPeer);
      });
    }).catch(err => {
      console.error('Failed to get local stream', err);
    });

    // User disconnects
    socket.on('user-disconnected', userId => {
      if (peers[userId]) peers[userId].close();
    });

    // Join room when Peer connection opens
    myPeer.on('open', id => {
      socket.emit('join-room', ROOM_ID, id);
    });

    return () => {
      socket.disconnect();  // Cleanup  on component unmount
    };
  }, [ROOM_ID, peers]);

  const connectToNewUser = (userId, localStream, myPeer) => {
    const call = myPeer.call(userId, localStream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream);
    });
    call.on('close', () => {
      video.remove();
    });

    setPeers(prevPeers => ({ ...prevPeers, [userId]: call }));
  };

  const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });
    videoGridRef.current.append(video);
  };

  const toggleVideoStream = () => {
    const videoTrack = stream.getVideoTracks()[0];
    if (videoTrack.enabled) {
      videoTrack.enabled = false;
      setIsVideoEnabled(false);
    } else {
      videoTrack.enabled = true;
      setIsVideoEnabled(true);
    }
  };

  const toggleAudio = () => {
    const audioTrack = stream.getAudioTracks()[0];
    if (audioTrack.enabled) {
      audioTrack.enabled = false;
      setIsAudioEnabled(false);
    } else {
      audioTrack.enabled = true;
      setIsAudioEnabled(true);
    }
  };

  const redirectToDashboard = () => {
    window.location.href = './patientdashboard.html';
  };

  return (
    <div>
      <h1>VIDEO CHAT ROOM</h1>
      <h2>Refresh ONLY if the other user has left or there is a delay in joining the Meet</h2>

      <div id="endButtonDiv">
        <button onClick={redirectToDashboard}>Go back to DASHBOARD</button>
      </div>

      <div id="video-grid" ref={videoGridRef}></div>

      <br />
      <button onClick={toggleVideoStream}>
        {isVideoEnabled ? 'Stop Video' : 'Start Video'}
      </button>
      <br /><br />
      <button onClick={toggleAudio}>
        {isAudioEnabled ? 'Mute' : 'Unmute'}
      </button>

      <video ref={myVideoRef} style={{ display: 'none' }}></video>
    </div>
  );
};

export default Room;
