import {useEffect, useState} from 'react';
import io from 'socket.io-client';
import {useHistory} from 'react-router-dom';

const DoctorDashboard = ({match}) => {
  const [socket, setSocket] = useState(null);
  const [call, setCall] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const newSocket = io('localhost:5000/');
    setSocket(newSocket);
    connectUser(newSocket, match, setCall);
  }, [setSocket, match]);

  if (call != null) {
    console.log(call);
  }

  if (socket) {
    socket.on('retrieve', (message) => {
      setCall(message);
    });
  }

  const answerCall = () => {
    var delayInMilliseconds = 1000; //2 second
    socket.emit('answerCall', call.from, true);
    // setTimeout(function () {
    //   history.push(`/call/${call.url}`);
    // }, delayInMilliseconds);
  };

  return (
    <div>
      {call && (
        <a onClick={answerCall} href={`/call/${call.url}`}>
          Answer call
        </a>
      )}
    </div>
  );
};
const connectUser = (socket, match, setCall) => {
  socket.on('connect', () => {
    socket.emit('online-user', socket.id, match.params.id);
  });
  // socket.on('updateuserList', (users) => {
  //   console.log(users);
  // });
};

export default DoctorDashboard;
