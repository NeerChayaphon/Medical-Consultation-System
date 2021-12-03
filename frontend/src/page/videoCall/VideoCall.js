// Video consultation page
import React from 'react';
import {useEffect, useState, useRef} from 'react';
import Peer from 'peerjs';
import io from 'socket.io-client';
import endCallIcon from '../../img/endcall.png';
import medicalIcon from '../../img/medical-report-white.png'
import useTokenCheck from '../../helper/tokenCheck';
import {Link, useLocation} from 'react-router-dom';

const Call = ({match}) => {
  // User auth
  useTokenCheck(); // ***** Don't forget
  const location = useLocation();
  const {type,user} = location.state;
  console.log(type)
  console.log(user)

// eslint-disable-next-line
  const [socket, setSocket] = useState(null); // socket
  const [stream, setStream] = useState(); // video WebRTC
  const [callAccepted, setCallAccepted] = useState(false);
  const userVideo = useRef(); // your video
  const otherVideo = useRef(); // other video

  // video feature
  const [isMute, setMute] = useState(false);
  const [isVideoOff, setVideoOff] = useState(false);

  useEffect(() => {
    const newSocket = io('localhost:5000/'); // connect socket
    setSocket(newSocket);

    const myPeer = new Peer(); // create peer
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
        // call
        myPeer.on('call', (call) => {
          call.answer(stream);
          setCallAccepted(true);

          // sent user's video to other
          call.on('stream', (userVideoStream) => {
            if (otherVideo.current) {
              otherVideo.current.srcObject = userVideoStream;
            }
          });
        });

        // user connection
        newSocket.on('user-connected', (userId) => {
          connectToNewUser(userId, stream);
        });
      });

    // other user disconnect
    newSocket.on('user-disconnected', (userId) => {
      if (peers[userId]) peers[userId].close();
      setCallAccepted(false);
    });

    // join doctor consultation room
    myPeer.on('open', (id) => {
      newSocket.emit('join-room', match.params.id, id);
    });

    function connectToNewUser(userId, stream) {
      const call = myPeer.call(userId, stream);
      setCallAccepted(true);
      // sent user's video to other
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
    UserVideo = (
      <video
        className='w-auto rounded-3xl'
        playsInline
        muted
        ref={userVideo}
        autoPlay
      />
    );
  }
  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <video
        className='w-full rounded-3xl'
        playsInline
        ref={otherVideo}
        autoPlay
      />
    );
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
      <div className='h-screen overflow-auto bg-gray-100 p-4'>
        <div className='flex content-center mx-6 my-2 h-5/6'>
          <div
            className='w-1/2 h- lg:shadow-lg rounded-lg flex lg:border-r border-gray-200 p-4 '
            style={{backgroundColor: '#B5E3FE'}}
          >
            {UserVideo}
          </div>
          <div
            className='w-1/2 h-full lg:shadow-lg rounded-lg flex lg:border-r border-gray-200 p-4 ml-4'
            style={{backgroundColor: '#FFCCD0'}}
          >
            {PartnerVideo ? PartnerVideo : <div></div>}
          </div>
        </div>
        <div className='flex mx-2 p-4 gap-2 mt-8'>
          <div className='w-3/4'>
            <div className='flex justify-start gap-2'>
              <button
                onClick={mute}
                className='h-12 w-12 items-center lg:shadow-sm rounded-lg bg-purple-500 hover:bg-purple-700 mr-1'
              >
                {isMute ? (
                  <i className='text-white fas fa-microphone-slash'></i>
                ) : (
                  <i className='text-white  fa fa-microphone'></i>
                )}
              </button>
              <button
                onClick={videoControl}
                className='h-12 w-12 items-center lg:shadow-sm rounded-lg bg-purple-500 hover:bg-purple-700 mr-1'
              >
                {isVideoOff ? (
                  <i className='text-white fas fa-video-slash'></i>
                ) : (
                  <i className='text-white fas fa-video'></i>
                )}
              </button>
              { type==='doctor' && <Link
                to={ {pathname : `/manageMedicalRecord/${user.id}`}}
                target="_blank" rel="noopener noreferrer"
                className='h-12 py-1 px-4 items-center inline-flex lg:shadow-sm rounded-lg bg-indigo-500 hover:bg-indigo-600'
              >
                <img className='w-8 py-1 -mr-3' src={medicalIcon} alt=""/>
                <h1 className='ml-5 py-2 text-base text-white'>Medical Record</h1>
              </Link>
              }

            </div>
          </div>
          <div className='w-1/4'>
            <div className='flex justify-end gap-2'>
              <a
                href={type === "patient" ? "/patient/medicalRecord" : "/doctor"}
                className='flex-col justify-center h-12 w-12 bg-red-400 hover:bg-red-500 font-bold py-2 px-2 rounded-lg inline-flex'
              >
                <img src={endCallIcon} alt=""/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Call;
