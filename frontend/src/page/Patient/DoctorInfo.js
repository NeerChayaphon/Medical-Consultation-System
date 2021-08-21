import {useEffect, useState} from 'react';
import io from 'socket.io-client';

const DoctorInfo = ({match}) => {
  const [socket, setSocket] = useState(null);
  const [onlineDoc, setOnlineDoc] = useState(null);
  useEffect(() => {
    const newSocket = io('localhost:5000/');
    setSocket(newSocket);
    getOnlineDoc(newSocket, setOnlineDoc);
  }, [setSocket]);

  // call doctor
  const callDoctor = () => {
    let socketList = onlineDoc[match.params.id];
    socketList.forEach((socketId) => {
      socket.emit('call', socketId, `http...${match.params.id}`);
    });
  };

  return (
    <div>
      <button onClick={callDoctor}>Call</button>
    </div>
  );
};
const getOnlineDoc = (socket, setOnlineDoc) => {
  socket.on('connect', () => {
    socket.emit('get-online-doctor', socket.id);
  });
  socket.on('updateDoctorList', (doctor) => {
    if (Object.keys(doctor).length === 0) {
      setOnlineDoc(null);
    } else {
      setOnlineDoc(doctor);
    }
    console.log(doctor);
  });
};

export default DoctorInfo;
