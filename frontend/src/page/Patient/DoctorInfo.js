import {useEffect, useState} from 'react';
import io from 'socket.io-client';
import {useHistory} from 'react-router-dom';

const DoctorInfo = ({match}) => {
  const [socket, setSocket] = useState(null);
  const [onlineDoc, setOnlineDoc] = useState(null);
  const [fetchFail, setFetchFail] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const newSocket = io('localhost:5000/');
    setSocket(newSocket);
    getOnlineDoc(newSocket, setOnlineDoc, setFetchFail);
    newSocket.on('availableCall', (status) => {
      if (status) {
        newSocket.disconnect();
        history.push(`/call/${match.params.id}`);
      } else {
        setFetchFail(true);
      }
    });
  }, [setSocket]);

  if (fetchFail) {
    return (
      <div>
        <h1>This doctor is offine or in another call</h1>
      </div>
    );
  }

  // call doctor
  const callDoctor = () => {
    let socketList = onlineDoc[match.params.id];
    socketList.forEach((socketId) => {
      socket.emit('call', socketId, {from: socket.id, url: match.params.id});
    });
    // console.log(socket.id);
    // socket.disconnect();
    // history.push(`/call/${match.params.id}`);
  };

  return (
    <div>
      <button onClick={callDoctor}>Call</button>
    </div>
  );
};
const getOnlineDoc = (socket, setOnlineDoc, setFetchFail) => {
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
    if (Object.keys(doctor).length === 0) {
      setFetchFail(true);
    }
  });
};

export default DoctorInfo;
