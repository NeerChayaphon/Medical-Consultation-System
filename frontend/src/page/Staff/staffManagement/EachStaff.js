// Each staff information page
import React from 'react';
import {useEffect, useState} from 'react';
import {useHistory, Link} from 'react-router-dom';
import EditIcon from '../../../img/edit.png';
import BinIcon from '../../../img/bin.png';
import Axios from 'axios';
import useTokenCheck from '../../../helper/staffTokenCheck';
import Spinner from '../../../components/Spinner';

const StaffProfile = ({match}) => {
  useTokenCheck(); // token check
  const [error, setError] = useState(false); // error
  const history = useHistory();

  // staff information
  const [staff, setStaff] = useState({
    data: null,
    isPending: true,
    error: null,
  });

  useEffect(() => {
    fetchStaff(setStaff, match.params.id); // get staff
  }, [setStaff, match.params.id]);

  // token
  const config = {
    headers: {
      'x-acess-token': localStorage.getItem('token'),
    },
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    Axios.delete(
      `http://localhost:5000/api/v1/staff/${match.params.id}`,
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

  if (staff.isPending) {
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
        <div className='flex items-center justify-center py-10'>
          <div
            className='bg-gray-100 shadow-xl w-full overflow-hidden rounded-lg'
            style={{maxWidth: '90%'}}
          >
            {staff.data && (
              <div className='md:flex w-full bg-white'>
                <div className='w-full py-10 px-5 md:px-10'>
                  <div className='flex -mx-3'>
                    <div className='w-2/3 px-3 mb-2'>
                      <label htmlFor className='text-xs px-1 text-black'>
                        Name
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <div className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                          {staff.data.name}
                        </div>
                      </div>
                    </div>
                    <div className='w-1/3 px-3 mb-2'>
                      <label htmlFor className='text-xs px-1 text-black'>
                        Phone number
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <div className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                          {staff.data.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex -mx-3'>
                    <div className='w-1/3 px-3 mb-2'>
                      <label htmlFor className='text-xs px-1 text-black'>
                        Email
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <div className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                          {staff.data.email}
                        </div>
                      </div>
                    </div>
                    <div className='w-1/3 px-3 mb-2'>
                      <label htmlFor className='text-xs px-1 text-black'>
                        Position
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <div className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                          {staff.data.position}
                        </div>
                      </div>
                    </div>
                    <div className='w-1/3 px-3 mb-2'>
                      <label htmlFor className='text-xs px-1 text-black'>
                        Salary
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <div className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                          {staff.data.salary}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex -mx-3'>
                    <div className='w-1/4 px-3 mb-2'>
                      <label htmlFor className='text-xs px-1 text-black'>
                        Gender
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <div className='w-1/2 -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                          {staff.data.gender}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='text-center mt-1'>
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
                      <img
                        className='w-8 h-10 py-1 -mr-3'
                        src={BinIcon}
                        alt=''
                      />
                      <div className='flex flex-col ml-5'>
                        <h1 className='py-2 text-xl text-white'>Delete</h1>
                      </div>
                    </button>
                    <Link
                      className='bg-yellow-300 hover:bg-yellow-400 font-bold py-2 px-4 mt-10 rounded inline-flex'
                      to={{
                        pathname: `/staff/staffManagement/${match.params.id}/edit`,
                        state: {data: staff.data},
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
            )}
          </div>
        </div>
      </div>
    );
  }
};
const fetchStaff = (setStaff, id) => {
  const fetchData = async () => {
    try {
      let res = await Axios.get(
        `http://localhost:5000/api/v1/staff/${id}`,
        {
          headers: {
            'x-acess-token': localStorage.getItem('token'),
          },
        }
      );
      let data = res.data.data;

      setStaff({
        data: data,
        isPending: false,
        error: null,
      });
    } catch (error) {
      setStaff({
        data: null,
        isPending: false,
        error: error,
      });
    }
  };
  fetchData();
};

export default StaffProfile;