// import useAuthCheck from '../../hooks/useAuthCheck';
import {useFetchUser} from '../../context/userContext';
import useTokenCheck from '../../helper/tokenCheck';
// import useDoctorAPI from '../../hooks/useDoctorAPI';
import DoctorCard from '../../components/DoctorCard';
import {useEffect, useState} from 'react';
import io from 'socket.io-client';
import Axios from 'axios';

function Home() {
  //const {data: user, isPending, error} = useAuthCheck('http://localhost:5000/api/v1/auth/patient/');
  useTokenCheck();
  const {state} = useFetchUser();
  //const {data: doctor} = useDoctorAPI('http://localhost:5000/api/v1/doctor');

  const [socket, setSocket] = useState(null);
  const [onlineDoc, setOnlineDoc] = useState({
    data: [],
    isPending: true,
    error: null,
  });

  useEffect(() => {
    const newSocket = io('localhost:5000/');
    setSocket(newSocket);
    getOnlineDoc(newSocket, setOnlineDoc);
  }, [setSocket]);

  console.log(onlineDoc.data);

  return (
    <div className='wrapper'>
      <div>Home</div>
      {state.isLoading && <div>loading</div>}
      {state.data && <div>{state.data.name}</div>}
      {!onlineDoc.isPending && onlineDoc.data ? (
        onlineDoc.data.map((data) => (
          <div key={data._id}>
            <DoctorCard doctor={data} />
          </div>
        ))
      ) : (
        <div></div>
      )}
      {/* {onlineDoc != null && <div>{Object.keys(onlineDoc)}</div>} */}
    </div>
  );
}

const getOnlineDoc = (socket, setOnlineDoc) => {
  socket.on('connect', () => {
    socket.emit('get-online-doctor', socket.id);
  });
  socket.on('updateDoctorList', (doctor) => {
    if (Object.keys(doctor).length === 0) {
      setOnlineDoc({
        data: [],
        isPending: false,
        error: 'No doctor Online',
      });
    } else {
      //setOnlineDoc(doctor);
      fetchDoctorData(Object.keys(doctor), setOnlineDoc);
    }
    disconnectSocket(socket);
    //console.log(Object.keys(doctor));
    //console.log(doctor);
  });
};
const fetchDoctorData = (doctorId, setOnlineDoc) => {
  const id = doctorId.toString();
  const fetchDoctor = async () => {
    try {
      let res = await Axios.get(`http://localhost:5000/api/v1/doctor/${id}`);

      let data = res.data.data;
      if (!Array.isArray(data)) {
        data = [data];
      }
      setOnlineDoc({
        data: data,
        isPending: false,
        error: null,
      });
    } catch (error) {
      setOnlineDoc({
        data: null,
        isPending: false,
        error: error,
      });
    }
  };
  fetchDoctor();
};

const disconnectSocket = (socket) => {
  socket.disconnect();
};

export default Home;
