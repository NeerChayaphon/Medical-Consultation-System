// doctor management page for staff
import React from 'react';
import useTokenCheck from '../../../helper/staffTokenCheck';
import {useEffect, useState} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Spinner from '../../../components/Spinner';

const DoctorManagement = () => {
  useTokenCheck(); // token check
  const [doctor, setDoctor] = useState({
    data: [],
    isPending: true,
    error: null,
  }); // doctor in the database

  useEffect(() => {
    fetchDoctor(setDoctor); // get doctor
  }, [setDoctor]);

  if (doctor.isPending) {
    return (
      <Spinner/>
    );
  } else {
    return (
      <div className='font-fontPro'>
        <div className='mb-5 mt-10 mx-auto max-w-7xl w-full px-10 flex flex-col space-y-4'>
          <div className='mx-auto max-w-7xl w-full flex justify-between mb-3'>
            <h1 className='text-3xl'>Doctor</h1>

            <Link
              to='/add/doctorManagement'
              className='px-4 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white'
            >
              Add
            </Link>
          </div>
          <div className='flex flex-col'>
            <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                      <tr key=''>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-base font-medium  text-gray-500 uppercase tracking-wider'
                        >
                          Doctor
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Specialization
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider'
                        >
                          hospital
                        </th>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                      {doctor.data &&
                        doctor.data.map((data) => (
                          <tr key={data.id ? data.id : Math.random()}>
                            <td className='px-6 py-4 whitespace-nowrap'>
                              <div className='flex items-center'>
                                <div className='flex-shrink-0 h-10 w-10'>
                                  <img
                                    className='h-10 w-10 rounded-full'
                                    src={data.photo}
                                    alt=''
                                  />
                                </div>
                                <div className='ml-4'>
                                  <div className='text-base font-medium text-gray-900'>
                                    {data.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                              <div className='text-base text-gray-900'>
                                {data.specialization.specialization}
                              </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                              <span className='px-2 inline-flex text-base leading-5 '>
                                {data.hospital}
                              </span>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap '>
                              <Link
                                className='text-base font-bold text-purple-500 hover:text-pink-500'
                                to={`/staff/doctorManagement/${data.id}`}
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const fetchDoctor = (setDoctor) => {
  const fetchData = async () => {
    try {
      let res = await Axios.get(
        `http://localhost:5000/api/v1/doctor/?sort=name`,
        {
          headers: {
            'x-acess-token': localStorage.getItem('token'),
          },
        }
      );
      let data = res.data.data;

      if (!Array.isArray(data)) {
        data = [data];
      }
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

export default DoctorManagement;
