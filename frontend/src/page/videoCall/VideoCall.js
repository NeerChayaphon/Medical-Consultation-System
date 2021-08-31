import React from 'react';
import './Call.css';
import {useEffect, useState, useRef} from 'react';
import Peer from 'peerjs';
import io from 'socket.io-client';

const Call = ({match}) => {
  const [socket, setSocket] = useState(null);
  const [stream, setStream] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const userVideo = useRef();
  const otherVideo = useRef();

  const [isMute, setMute] = useState(false);
  const [isVideoOff, setVideoOff] = useState(false);
  useEffect(() => {
    const newSocket = io('localhost:5000/');
    setSocket(newSocket);
    const myPeer = new Peer(undefined, {
      host: 'localhost',
      port: 9000,
      path: '/myapp',
    });

    const peers = {};
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
        myPeer.on('call', (call) => {
          call.answer(stream);
          setCallAccepted(true);

          call.on('stream', (userVideoStream) => {
            if (otherVideo.current) {
              otherVideo.current.srcObject = userVideoStream;
            }
          });
        });

        newSocket.on('user-connected', (userId) => {
          connectToNewUser(userId, stream);
        });
      });

    newSocket.on('user-disconnected', (userId) => {
      if (peers[userId]) peers[userId].close();
      setCallAccepted(false);
    });

    myPeer.on('open', (id) => {
      newSocket.emit('join-room', match.params.id, id);
    });

    function connectToNewUser(userId, stream) {
      const call = myPeer.call(userId, stream);
      setCallAccepted(true);

      call.on('stream', (userVideoStream) => {
        if (otherVideo.current) {
          otherVideo.current.srcObject = userVideoStream;
        }
      });
      call.on('close', () => {
        setCallAccepted(false);
      });
      peers[userId] = call;
    }
  }, [match.params.id]);

  let UserVideo;
  if (stream) {
    UserVideo = <video playsInline muted ref={userVideo} autoPlay />;
  }
  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = <video playsInline ref={otherVideo} autoPlay />;
  }

  const mute = () => {
    const enabled = stream.getAudioTracks()[0].enabled;
    if (enabled) {
      stream.getAudioTracks()[0].enabled = false;
      setMute(true);
    } else {
      stream.getAudioTracks()[0].enabled = true;
      setMute(false);
    }
  };
  const videoControl = () => {
    const enabled = stream.getVideoTracks()[0].enabled;
    if (enabled) {
      stream.getVideoTracks()[0].enabled = false;
      setVideoOff(true);
    } else {
      stream.getVideoTracks()[0].enabled = true;
      setVideoOff(false);
    }
  };

  return (
    <div>
      {UserVideo}
      {PartnerVideo ? PartnerVideo : <div></div>}
      <div className='options__left'>
        <button onClick={videoControl} id='stopVideo' className='options__button'>
          {isVideoOff ? <i className='fas fa-video-slash'></i> : <i className='fas fa-video'></i>}
        </button>
        <button onClick={mute} id='muteButton' className='options__button'>
          {isMute ? (
            <i className='fas fa-microphone-slash'></i>
          ) : (
            <i className='fa fa-microphone'></i>
          )}
        </button>
      </div>
    </div>
  );
};

export default Call;
