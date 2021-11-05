import {useEffect, useState} from 'react';
import io from 'socket.io-client';
import {useHistory,useLocation} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import HospitalIcon from '../../img/hospital.png';
import StudyIcon from '../../img/graduation-cap.png'
import PhoneIcon from '../../img/phone.png'
import Medicalreport from '../../img/medical-report.png'
import VideoCameraIcon from '../../img/video-camera.png'


const DoctorInfo = ({match}) => {
  const [socket, setSocket] = useState(null);
  const [onlineDoc, setOnlineDoc] = useState(null);
  const [fetchFail, setFetchFail] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const {data} = location.state;

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
    // fetchDoctor(setDoctor,match.params.id)
  }, [setSocket]);

  // console.log(doctor.data)
  console.log(data)

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

  // color
  const colorDoc = (doctor) => {
    let color = ""
    switch (doctor.specialization.specialization) {
      case "Physician":
        color = "blue-300"
        break;
      case "Otolaryngologist":
        color = "green-300"
        break;
      case "Pediatricians":
        color = "yellow-300"
        break;
      case "Obstetrician-Gynecologist":
        color = "pink-300"
        break;
      case "Cardiologist":
        color = "red-300"
        break;
      case "Urologists":
        color = "indigo-300"
        break;
      case "Orthopedist":
        color = "purple-300"
        break;
      case "Psychiatrist":
        color = "blue-200"
        break;
      case "Surgeon":
        color = "green-200"
        break;
      case "Dermatologist":
        color = "yellow-200"
        break;
      case "Neurologist":
        color = "pink-200"
        break;
      case "Dentist":
        color = "red-200"
        break;
      case "Ophthalmologist":
        color = "indigo-200"
        break;
      default:
        color = "grap-200"
        break;
      // code block
    }
    return color;
  };

  return (
    <div className="font-fontPro">
      <div className='p-3'>
        <button className='text-lg text-gray-700' onClick={history.goBack}>
        <i class="fas fa-chevron-left"></i>
          <span> Back</span>
        </button>
      </div>
      <div className='flex justify-center px-20 py-2 mb-2'>
        <div className='w-1/3 bg-gray-200 py-10'>
          <div className='w-full px-20 py-5'>
            <img
              className='object-cover object-center rounded-full w-full border-solid border-white border-4'
              src={data.photo}
            />
          </div>
          <div className='text-center text-xl p-5'>
            <h1> {data.name}</h1>
          </div>
          <div className='flex justify-center'>
            <h1 className={`text-sm font-medium text-gray-700 mb-3 bg-${colorDoc(data)}  inline-block px-1 rounded-md text-center justify-center`}>
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
              <img className='h-10 w-10' src={HospitalIcon} />
              <div id='body' className='flex flex-col ml-5'>
                <h1 className='p-2 text-xl'>Hospital : {data.hospital}</h1>
              </div>
            </div>
            <div className='flex py-2 mt-2'>
              <img className='h-10 w-10' src={StudyIcon} />
              <div id='body' className='flex flex-col ml-5'>
                <h1 className='p-2 text-xl'>
                Backgroud : {data.backgroud}
                </h1>
              </div>
            </div>
            <div className='flex py-2'>
              <img className='h-10 w-10' src={PhoneIcon} />
              <div id='body' className='flex flex-col ml-5'>
                <h1 className='p-2 text-xl'>
                Phone number : {data.phone}
                  <p />
                </h1>
              </div>
            </div>
            <div className='flex py-2'>
              <img className='h-10 w-10' src={Medicalreport}/>
              <div id='body' className='flex flex-col ml-5'>
                <h1 className='p-2 text-xl'>Specialization Detail :  </h1>
              </div>
            </div>
            <div>
              <p className='ml-16 p-1 text-l break-words'>
              {data.specializationDetail}
              </p>
              <h1 className='p-2 text-l' />
            </div>
            <div className='flex justify-center'>
              <button
                onClick={callDoctor}
                className='bg-green-400 hover:bg-green-500 font-bold py-2 px-4 mt-10 rounded inline-flex'
              >
                <img className='h-10 w-10' src={VideoCameraIcon} />
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
