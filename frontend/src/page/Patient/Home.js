// import useAuthCheck from '../../hooks/useAuthCheck';
import {useFetchUser} from '../../context/userContext';
import useTokenCheck from '../../helper/tokenCheck';
import useDoctorAPI from '../../hooks/useDoctorAPI';
import DoctorCard from '../../components/DoctorCard';
import {useEffect, useState} from 'react';
import io from 'socket.io-client';

function Home() {
  //const {data: user, isPending, error} = useAuthCheck('http://localhost:5000/api/v1/auth/patient/');
  useTokenCheck();
  const {state} = useFetchUser();
  const {data: doctor} = useDoctorAPI('http://localhost:5000/api/v1/doctor');

  const [socket, setSocket] = useState(null);
  const [onlineDoc, setOnlineDoc] = useState(null);
  useEffect(() => {
    const newSocket = io('localhost:5000/');
    setSocket(newSocket);
    getOnlineDoc(newSocket, setOnlineDoc);
  }, [setSocket]);

  // console.log(Object.keys(onlineDoc));

  return (
    <div className='wrapper'>
      <div>Home</div>
      {state.isLoading && <div>loading</div>}
      {state.data && <div>{state.data.name}</div>}
      {state.data && <DoctorCard />}
      {onlineDoc != null && <div>{Object.keys(onlineDoc)}</div>}
    </div>
  );
}

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

export default Home;
