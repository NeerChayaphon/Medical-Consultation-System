// import useAuthCheck from '../../hooks/useAuthCheck';
import {useFetchUser} from '../../context/userContext';
import useTokenCheck from '../../helper/tokenCheck';
// import useDoctorAPI from '../../hooks/useDoctorAPI';
// import CardDoctor from '../../components/CardDoctor';
import {useEffect, useState} from 'react';
import io from 'socket.io-client';
import Axios from 'axios';
import DoctorCard from '../../components/DoctorCard';
import Spinner from '../../components/Spinner';

function Home() {
  //const {data: user, isPending, error} = useAuthCheck('https://harmore.herokuapp.com/api/v1/auth/patient/');
  useTokenCheck(); // ***** Don't forget
  const {state} = useFetchUser();
  //const {data: doctor} = useDoctorAPI('https://harmore.herokuapp.com/api/v1/doctor');

  // eslint-disable-next-line
  const [socket, setSocket] = useState(null);
  const [onlineDoc, setOnlineDoc] = useState({
    data: [],
    isPending: true,
    error: null,
  });
  const [type, setType] = useState('All');
  const [search, setSearch] = useState('');
  const [specialization, setSpec] = useState({
    data: [],
    isPending: true,
    error: null,
  });

  useEffect(() => {
    const newSocket = io('harmore.herokuapp.com/');
    setSocket(newSocket);
    getOnlineDoc(newSocket, setOnlineDoc, type, search);
    fetchSpecialization(setSpec);
  }, [setSocket, type, search, setSpec]);

  //console.log(onlineDoc.data);

  //fillter

  // }
  console.log(specialization.data);

  if (onlineDoc.isPending) {
    return <Spinner />;
  } else if (!onlineDoc.isPending && onlineDoc.data.length === 0) {
    return (
      <div className='flex justify-center items-center mt-52'>
        <h1 className='font-fontPro text-4xl text-gray-700'>There is no online doctor at this moment.</h1>
      </div>
    );
  } else {
    return (
      <div className='antialiased flex flex-col mt-10'>
        <form
          action=''
          className=' mx-auto max-w-7xl w-full inputs space-y-6 px-10'
        >
          <div className='flex space-x-4'>
            <div className='lg:w-10/12 w-9/12'>
              <label className='px-1 text-black text-xs lg:text-sm'>
                Search by name
              </label>
              <div className='flex'>
                <input
                  className='block appearance-none w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none '
                  type='text'
                  name='search-doc'
                  id='search-doc'
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className='lg:w-2/12 w-3/12'>
              <label className='text-xs lg:text-sm px-1 text-black'>
                Specialization
              </label>
              <div className='relative'>
                <select
                  id='type'
                  className='block appearance-none w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none '
                  onChange={(e) => setType(e.target.value)}
                >
                  <option key='All' value='All'>
                    All{' '}
                  </option>
                  {specialization.data &&
                    specialization.data.map((item) => (
                      <option
                        key={item.specialization}
                        value={item.specialization}
                      >
                        {item.specialization}
                      </option>
                    ))}
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

        <div className='my-10 mx-auto max-w-7xl w-full px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
          {state.isLoading && <div>loading</div>}
          {!onlineDoc.isPending && onlineDoc.data ? (
            onlineDoc.data.map((data) => (
              <DoctorCard key={data.name} doctor={data} />
            ))
          ) : (
            <div></div>
          )}
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
}

const getOnlineDoc = (socket, setOnlineDoc, type, search) => {
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
      fetchDoctorData(Object.keys(doctor), setOnlineDoc, type, search);
    }
    disconnectSocket(socket);
    //console.log(Object.keys(doctor));
    //console.log(doctor);
  });
};
// const typeFillter = (type,data) => {
//   if (type != "All") {
//     data = data.filter(function (el) {
//       return el.specialization.specialization == type;
//     });
//   }

//   return data
// }

// const filterByValue = (array, string) => {
//   return array.filter(o =>
//       Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
// }

const fetchDoctorData = (doctorId, setOnlineDoc, type, search) => {
  const id = doctorId.toString();
  const fetchDoctor = async () => {
    try {
      let res = await Axios.get(
        `https://harmore.herokuapp.com/api/v1/doctor/${id}`,
        {
          headers: {
            'x-acess-token': localStorage.getItem('token'),
          },
        }
      );

      // if (type != 'All') {
      //   console.log(res.data.data.filter(function (el) {
      //     return el.specialization.specialization == "Otolaryngology";
      //   }))
      // }
      let data = res.data.data;

      //filtter by type
      if (type !== 'All') {
        //console.log(type)
        let fDoc = data.filter(function (el) {
          return el.specialization.specialization === type;
        });
        data = fDoc;
      }

      //filtter by type
      if (search !== '') {
        //console.log(type)
        let fDoc = data.filter(function (el) {
          return el.name.toLowerCase().includes(search.toLowerCase());
        });
        data = fDoc;
      }

      console.log(data);

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

const fetchSpecialization = (setSpec) => {
  const fetchType = async () => {
    try {
      let res = await Axios.get(
        `https://harmore.herokuapp.com/api/v1/specialization/`
      );
      let data = res.data.data;

      if (!Array.isArray(data)) {
        data = [data];
      }
      setSpec({
        data: data,
        isPending: false,
        error: null,
      });
    } catch (error) {
      setSpec({
        data: null,
        isPending: false,
        error: error,
      });
    }
  };
  fetchType();
};

export default Home;
