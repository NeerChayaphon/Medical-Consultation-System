import {useEffect, useState} from 'react';
import io from 'socket.io-client';

const DoctorDashboard = ({match}) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io('localhost:5000/');
    setSocket(newSocket);
    connectUser(newSocket, match);
  }, [setSocket]);

  return <div></div>;
};
const connectUser = (socket, match) => {
  socket.on('connect', () => {
    socket.emit('online-user', socket.id, match.params.id);
  });
  socket.on('updateuserList', (users) => {
    console.log(users);
  });
};

export default DoctorDashboard;
