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
  useTokenCheck(); // ***** Don't forget
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
    <div className='antialiased flex flex-col mt-10'>
      <form
        action=''
        className=' mx-auto max-w-7xl w-full inputs space-y-6 px-10'
      >
        <div className='flex space-x-4'>
          <div className='w-10/12'>
            <label className='text-sm px-1 text-black'>Search by name</label>
            <div className='flex'>
              <input
                className='block appearance-none w-full pl-4 pr-3 py-2 rounded-l-lg border-2 border-gray-200 border-r-0 outline-none '
                type='text'
                name='search-doc'
                id='search-doc'
              />
              <button className='mx-auto px-4 appearance-none rounded-r-lg border-2 border-l-0 border-gray-200 text-gray-500 bg-transparent outline-none hover:bg-gray-100'>
                <i className='fas fa-search'></i>
              </button>
            </div>
          </div>

          <div className='w-2/12'>
            <label className='text-sm px-1 text-black'>Specialization</label>
            <div className='relative'>
              <select
                id='type'
                className='block appearance-none w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none '
              >
                <option value='All'>All</option>
                <option value='1'>type 1</option>
                <option value='2'>type 2</option>
                <option value='3'>type 3</option>
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                <svg
                  className='fill-current h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className=' mx-auto max-w-7xl w-full inputs space-y-6 px-10'>
        <div className='grid grid-cols-3 gap-4'>
          
        </div>
      </div>

      {/* <div>Home</div>
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
      )} */}
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
      let res = await Axios.get(`http://localhost:5000/api/v1/doctor/${id}`, {
        headers: {
          'x-acess-token': localStorage.getItem('token'),
        },
      });

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
