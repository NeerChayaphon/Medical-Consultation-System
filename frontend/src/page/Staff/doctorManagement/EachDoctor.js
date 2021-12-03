// each doctor is a page to show each doctor information
import React from 'react';
import {useEffect, useState} from 'react';
import {useHistory, Link} from 'react-router-dom';
import EditIcon from '../../../img/edit.png';
import BinIcon from '../../../img/bin.png';
import Axios from 'axios';
import Spinner from '../../../components/Spinner';

const EachDoctor = ({match}) => {
  const [error, setError] = useState(false);
  const history = useHistory();

  // doctor
  const [doctor, setDoctor] = useState({
    data: null,
    isPending: true,
    error: null,
  });

  useEffect(() => {
    fetchDoctor(setDoctor, match.params.id); // get doctor
  }, [setDoctor,match.params.id]);

  // token
  const config = {
    headers: {
      'x-acess-token': localStorage.getItem('token'),
    },
  };

  // delete
  const handleDelete = async (e) => {
    e.preventDefault();
    Axios.delete(
      `http://localhost:5000/api/v1/doctor/${match.params.id}`,
      config
    )
      .then(() => {
        history.goBack();
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data);
      });
  };

  if (doctor.isPending) {
    return (
      <Spinner/>
    );
  } else {
  return (
    <div className='font-fontPro'>
      <div className='p-3'>
        <button className='text-base text-gray-700' onClick={history.goBack}>
          <i className='fas fa-chevron-left text-gray-700'></i>
          <span> Back</span>
        </button>
      </div>

      <div className='flex-col'>
        <div className='text-center mb-2'>
          <h1 className='text-2xl font-bold'>Doctor's Profile</h1>
        </div>
        {doctor.data && (
          <div className='flex justify-center px-20 py-2 mb-2'>
            <div className='w-1/3 bg-gray-200 py-10'>
              <div className='w-full px-20 py-5'>
                <img
                  className='object-cover object-center rounded-full w-full border-solid border-white border-4'
                  src={doctor.data.photo}
                  alt='docpic'
                />
              </div>
              <div className='text-center text-xl p-5'>
                <h1>Specialization</h1>
              </div>
              <div className='flex justify-center'>
                <h1 className='text-center bg-pink-200 rounded-lg w-32'>
                  {doctor.data.specialization.specialization}
                </h1>
              </div>
            </div>
            <div
              className='bg-white shadow-xl w-2/3 overflow-hidden rounded-lg'
              style={{maxWidth: 1000}}
            >
              <div className='w-full py-10 px-5 md:px-10 bg-white'>
                <div className='flex -mx-3'>
                  <div className='w-1/2 px-3 mb-2'>
                    <label className='text-xs px-1 text-black'>Name</label>
                    <div className='flex'>
                      <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                      <div className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                        {doctor.data.name}
                      </div>
                    </div>
                  </div>
                  <div className='w-1/2 px-3 mb-2'>
                    <label className='text-xs px-1 text-black'>Gender</label>
                    <div className='flex'>
                      <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                      <div className='w-1/2 -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                        {doctor.data.gender}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex -mx-3'>
                  <div className='w-1/2 px-3 mb-2'>
                    <label className='text-xs px-1 text-black'>Email</label>
                    <div className='flex'>
                      <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                      <div className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                        {doctor.data.email}
                      </div>
                    </div>
                  </div>
                  <div className='w-1/2 px-3 mb-2'>
                    <label className='text-xs px-1 text-black'>
                      Phone number
                    </label>
                    <div className='flex'>
                      <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                      <div className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                        {doctor.data.phone}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex -mx-3'>
                  <div className='w-1/2 px-3 mb-2'>
                    <label className='text-xs px-1 text-black'>Hospital</label>
                    <div className='flex'>
                      <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                      <div className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                        {doctor.data.hospital}
                      </div>
                    </div>
                  </div>
                  <div className='w-1/2 px-3 mb-2'>
                    <label className='text-xs px-1 text-black'>Education</label>
                    <div className='flex'>
                      <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                      <div className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                        {doctor.data.background}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex -mx-3'>
                  <div className='w-1/2 px-3 mb-2'>
                    <label className='text-xs px-1 text-black'>
                      Specialization detail Example
                    </label>
                    <div className='flex'>
                      <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                      <div className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                        {doctor.data.specializationDetail}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='text-center'>
                  {error ? (
                    <h1 className='text-base text-red-700 font-normal'>
                      {error}
                    </h1>
                  ) : (
                    <span> </span>
                  )}
                </div>
                <div className='flex justify-end'>
                  <button
                    className='bg-red-500 hover:bg-red-600 font-bold py-2 px-4 mt-10 mr-3 rounded inline-flex'
                    onClick={handleDelete}
                  >
                    <img className='w-8 h-10 py-1 -mr-3' src={BinIcon} alt=""/>
                    <div className='flex flex-col ml-5'>
                      <h1 className='py-2 text-xl text-white'>Delete</h1>
                    </div>
                  </button>
                  <Link
                    className='bg-yellow-300 hover:bg-yellow-400 font-bold py-2 px-4 mt-10 rounded inline-flex'
                    to={{
                      pathname: `/staff/doctorManagement/${match.params.id}/edit`,
                      state: {data: doctor.data},
                    }}
                  >
                    <img className='w-8 h-10 py-1 -mr-3' src={EditIcon} alt=""/>
                    <div className='flex flex-col ml-5'>
                      <h1 className='py-2 text-xl text-white'>Edit</h1>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
}

// get doctor information
const fetchDoctor = (setDoctor, id) => {
  const fetchData = async () => {
    try {
      let res = await Axios.get(`http://localhost:5000/api/v1/doctor/${id}`, {
        headers: {
          'x-acess-token': localStorage.getItem('token'),
        },
      });
      let data = res.data.data;

      setDoctor({
        data: data,
        isPending: false,
        error: null,
      });
    } catch (error) {
      setDoctor({
        data: null,
        isPending: false,
        error: error,
      });
    }
  };
  fetchData();
};

export default EachDoctor;
