import {useEffect, useState} from 'react';
import io from 'socket.io-client';
import {Redirect} from 'react-router-dom';

const DoctorDashboard = ({match}) => {
  const [socket, setSocket] = useState(null);
  const [call, setCall] = useState(null);
  useEffect(() => {
    const newSocket = io('localhost:5000/');
    setSocket(newSocket);
    connectUser(newSocket, match, setCall);
  }, [setSocket]);
  if (call != null) {
    console.log(call);
    //return <Redirect to={`/call/${call}`} />;
  }

  return <div>{call && <a href={`/call/${call}`}>Some one is calling</a>}</div>;
};
const connectUser = (socket, match, setCall) => {
  socket.on('connect', () => {
    socket.emit('online-user', socket.id, match.params.id);
  });
  // socket.on('updateuserList', (users) => {
  //   console.log(users);
  // });
  socket.on('retrieve', (message) => {
    setCall(message);
    // let obj = {url: message};
    // setCall((oldArray) => [...oldArray, message]);
    // here
  });
};

export default DoctorDashboard;
