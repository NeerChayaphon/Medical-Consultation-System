import {useEffect, useState} from 'react';
import io from 'socket.io-client';
import {v4} from 'uuid';
import {useHistory} from 'react-router-dom';

const Waiting = ({doctorId}) => {
  const [socket, setSocket] = useState(null);
  const [onlineDoc, setOnlineDoc] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const newSocket = io('localhost:5000/');
    getOnlineDoc(newSocket, doctorId);

    newSocket.on('retrieveCall', (status) => {
      if (status) {
        newSocket.disconnect();
        history.push(`/call/${doctorId}`);
      }
    });
  }, []);

  return <div>Waiting</div>;
};
const getOnlineDoc = (socket, doctorId) => {
  socket.on('connect', () => {
    socket.emit('get-online-doctor', socket.id);
  });
  socket.on('updateDoctorList', (doctor) => {
    if (Object.keys(doctor).length === 0) {
    } else {
      let socketList = doctor[doctorId];
      socketList.forEach((socketId) => {
        socket.emit('call', socketId, {from: socket.id, url: doctorId});
      });
      console.log(socket.id);
    }
    console.log(doctor);
  });
};

export default Waiting;
