// Doctor profile page
import React from 'react';
import {useHistory, Link} from 'react-router-dom';
import {useFetchUser} from '../../context/userContext';
import EditIcon from '../../img/edit.png';
import useTokenCheck from '../../helper/doctorTokenCheck';
import Spinner from '../../components/Spinner';

const DoctorProfile = () => {
  useTokenCheck(); // token check
  const history = useHistory();
  const {state} = useFetchUser(); // user informarion

  if (state.data === null) {
    return <Spinner />;
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
          {state.data && (
            <div className='flex justify-center px-20 py-2 mb-2'>
              <div className='w-1/3 bg-gray-200 py-10'>
                <div className='w-full px-20 py-5'>
                  <img
                    className='object-cover object-center rounded-full w-full border-solid border-white border-4'
                    src={state.data.photo}
                    alt='docpic'
                  />
                </div>
                <div className='text-center text-xl p-5'>
                  <h1>Specialization</h1>
                </div>
                <div className='flex justify-center'>
                  <h1 className='text-center bg-pink-200 rounded-lg w-32'>
                    {state.data.specialization.specialization}
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
                          {state.data.name}
                        </div>
                      </div>
                    </div>
                    <div className='w-1/2 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>Gender</label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <div className='w-1/2 -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                          {state.data.gender}
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
                          {state.data.email}
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
                          {state.data.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex -mx-3'>
                    <div className='w-1/2 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>
                        Hospital
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <div className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                          {state.data.hospital}
                        </div>
                      </div>
                    </div>
                    <div className='w-1/2 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>
                        Education
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <div className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                          {state.data.background}
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
                          {state.data.specializationDetail}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-end'>
                    <Link
                      className='bg-yellow-300 hover:bg-yellow-400 font-bold py-2 px-4 mt-10 rounded inline-flex'
                      to={{
                        pathname: `/doctor/profile/edit`,
                        state: {data: state.data},
                      }}
                    >
                      <img
                        className='w-8 h-10 py-1 -mr-3'
                        src={EditIcon}
                        alt=''
                      />
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
  }
};

export default DoctorProfile;
