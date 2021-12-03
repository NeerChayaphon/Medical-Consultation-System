// Doctor infomation page. Page for patient to view doctor information
import {useEffect, useState} from 'react';
import io from 'socket.io-client';
import {useHistory, useLocation} from 'react-router-dom';
import HospitalIcon from '../../img/hospital.png';
import StudyIcon from '../../img/graduation-cap.png';
import PhoneIcon from '../../img/phone.png';
import Medicalreport from '../../img/medical-report.png';
import VideoCameraIcon from '../../img/video-camera.png';
import {useFetchUser} from '../../context/userContext';

const DoctorInfo = ({match}) => {
  const [socket, setSocket] = useState(null); // socket.io
  const [onlineDoc, setOnlineDoc] = useState(null); // doctor information
  const [fetchFail, setFetchFail] = useState(false); // condition of fectching doctor data

  const history = useHistory();
  const location = useLocation();
  const {data} = location.state; // doctor data from the home page
  const {state} = useFetchUser(); // User data

  useEffect(() => {
    const newSocket = io('localhost:5000/'); // connect socket
    setSocket(newSocket);
    getOnlineDoc(newSocket, setOnlineDoc, setFetchFail); // get list of avaliable doctor
    newSocket.on('availableCall', (status) => { // listen for doctor to answer call
      if (status) {
        newSocket.disconnect();
        history.push({
          pathname: `/call/${match.params.id}`,
          state: {type: 'patient', user: 'Not a doctor'},
        });
      } else {
        setFetchFail(true);
      }
    });
    
  }, [setSocket, history, match.params.id]);

  // doctor is not avaliable
  if (fetchFail) {
    return (
      <>
        <div className='flex justify-center items-center mt-52'>
          <h1 className="font-fontPro text-4xl text-gray-700">This doctor is offline or in another call</h1>
        </div>
      </>
    );
  }

  // call doctor
  const callDoctor = () => {
    if (!fetchFail) {
      let socketList = onlineDoc[match.params.id];
      socketList.forEach((socketId) => {
        socket.emit('call', socketId, {
          from: socket.id,
          url: match.params.id,
          patient: state.data,
        });
      });
    }
  };

  // color of specialization
  const colorDoc = (doctor) => {
    let color = '';
    switch (doctor.specialization.specialization) {
      case 'Physician':
        color = 'blue-300';
        break;
      case 'Otolaryngologist':
        color = 'green-300';
        break;
      case 'Pediatricians':
        color = 'yellow-300';
        break;
      case 'Obstetrician-Gynecologist':
        color = 'pink-300';
        break;
      case 'Cardiologist':
        color = 'red-300';
        break;
      case 'Urologists':
        color = 'indigo-300';
        break;
      case 'Orthopedist':
        color = 'purple-300';
        break;
      case 'Psychiatrist':
        color = 'blue-200';
        break;
      case 'Surgeon':
        color = 'green-200';
        break;
      case 'Dermatologist':
        color = 'yellow-200';
        break;
      case 'Neurologist':
        color = 'pink-200';
        break;
      case 'Dentist':
        color = 'red-200';
        break;
      case 'Ophthalmologist':
        color = 'indigo-200';
        break;
      default:
        color = 'grap-200';
        break;
      // code block
    }
    return color;
  };

  return (
    <div className='font-fontPro'>
      <div className='p-3'>
        <button className='text-base text-gray-700' onClick={history.goBack}>
          <i className='fas fa-chevron-left text-gray-700'></i>
          <span> Back</span>
        </button>
      </div>
      <div className='flex justify-center px-20 py-2 mb-2'>
        <div className='w-1/3 bg-gray-200 py-10'>
          <div className='w-full px-20 py-5'>
            <img
              className='object-cover object-center rounded-full w-full border-solid border-white border-4'
              src={data.photo}
              alt='docpic'
            />
          </div>
          <div className='text-center text-xl p-5'>
            <h1> {data.name}</h1>
          </div>
          <div className='flex justify-center'>
            <h1
              className={`text-sm font-medium text-gray-700 mb-3 bg-${colorDoc(
                data
              )}  inline-block px-1 rounded-md text-center justify-center`}
            >
              {data.specialization.specialization}
            </h1>
          </div>
        </div>
        <div
          className='bg-white shadow-xl w-2/3 overflow-hidden rounded-lg'
          style={{maxWidth: 1000}}
        >
          <div className='w-full py-10 px-5 md:px-10'>
            <div className='flex py-2'>
              <img className='h-10 w-10' src={HospitalIcon} alt='Hospital' />
              <div id='body' className='flex flex-col ml-5'>
                <h1 className='p-2 text-xl'>Hospital : {data.hospital}</h1>
              </div>
            </div>
            <div className='flex py-2 mt-2'>
              <img className='h-10 w-10' src={StudyIcon} alt='Education' />
              <div id='body' className='flex flex-col ml-5'>
                <h1 className='p-2 text-xl'>background : {data.background}</h1>
              </div>
            </div>
            <div className='flex py-2'>
              <img className='h-10 w-10' src={PhoneIcon} alt='Phone' />
              <div id='body' className='flex flex-col ml-5'>
                <h1 className='p-2 text-xl'>
                  Phone number : {data.phone}
                  <p />
                </h1>
              </div>
            </div>
            <div className='flex py-2'>
              <img
                className='h-10 w-10'
                src={Medicalreport}
                alt='Medical record'
              />
              <div id='body' className='flex flex-col ml-5'>
                <h1 className='p-2 text-xl'>Specialization Detail : </h1>
              </div>
            </div>
            <div>
              <p className='ml-16 p-1 text-l break-words'>
                {data.specializationDetail}
              </p>
            </div>
            <div className='flex justify-center'>
              <button
                onClick={callDoctor}
                className='bg-green-400 hover:bg-green-500 font-bold py-2 px-4 mt-10 rounded inline-flex'
              >
                <img className='h-10 w-10' src={VideoCameraIcon} alt='' />
                <div className='flex flex-col ml-5'>
                  <h1 className='py-1.5 text-xl text-white -ml-3'>Call</h1>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// get the doctor information
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
