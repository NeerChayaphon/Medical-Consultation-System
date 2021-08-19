import {useEffect, useState} from 'react';
import io from 'socket.io-client';

const DoctorInfo = ({match}) => {
  const [socket, setSocket] = useState(null);
  const [onlineDoc, setOnlineDoc] = useState(null);
  useEffect(() => {
    const newSocket = io('localhost:5000/');
    setSocket(newSocket);
    getOnlineDoc(newSocket, setOnlineDoc, match);
  }, [setSocket]);

  return <div></div>;
};
const getOnlineDoc = (socket, setOnlineDoc, match) => {
  socket.on('connect', () => {
    socket.emit('get-online-doctor', match.params.id);
  });

  // get Socket
  socket.on('patientGetSocket', (doctor) => {
    if (Object.keys(doctor).length === 0) {
      setOnlineDoc(null);
    } else {
      setOnlineDoc(doctor);
    }
    console.log(doctor);
  });
};

export default DoctorInfo;
