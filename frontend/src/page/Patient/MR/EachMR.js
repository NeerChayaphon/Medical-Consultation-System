// Each medical record of patient
import {useEffect, useState} from 'react';
import Axios from 'axios';
import {useHistory, Link} from 'react-router-dom';
import useTokenCheck from '../../../helper/tokenCheck';
import {useFetchUser} from '../../../context/userContext';
import EditIcon from '../../../img/edit.png';
import BinIcon from '../../../img/bin.png';
import Spinner from '../../../components/Spinner';

const EachMR = ({match}) => {
  useTokenCheck(); // token check
  const {state} = useFetchUser(); // User data
  const history = useHistory();
  const [error, setError] = useState(false); // error
  const [Mr, setMr] = useState({ // Medical record
    data: null,
    isPending: true,
    error: null,
  });

  useEffect(() => {
    fetchMR(setMr, match.params.id); // get medical record
  }, [setMr, match]);

  // token
  const config = {
    headers: {
      'x-acess-token': localStorage.getItem('token'),
    },
  };

  // delete with API
  const handleDelete = async (e) => {
    e.preventDefault();
    Axios.delete(
      `http://localhost:5000/api/v1/medicalRecord/${Mr.data.id}`,
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

  if (Mr.isPending) {
    return <Spinner />;
  } else {
    return (
      <div className='font-fontPro'>
        {Mr.error && <h1>Incorrect Url</h1>}
        <div className='p-5'>
          <button className='text-base text-gray-700' onClick={history.goBack}>
            <i className='fas fa-chevron-left text-gray-700'></i>
            <span> Back</span>
          </button>
        </div>
        {Mr.data && (
          <div className='flex-col'>
            <div className='text-center'>
              {' '}
              <h1 className='text-2xl font-bold'>
                {Mr.data && Mr.data.illness} (
                {Mr.data && Mr.data.date.split('T')[0]})
              </h1>
            </div>
            <div className='flex items-center justify-center pt-5 pb-10'>
              <div
                className='bg-gray-100 shadow-xl w-full overflow-hidden rounded-lg'
                style={{maxWidth: '90%'}}
              >
                <div className='md:flex w-full bg-white'>
                  <div className='w-full py-10 px-5 md:px-10'>
                    <div className='flex w-full -mx-3'>
                      <div className='w-2/4 px-3 mb-2'>
                        <label
                          htmlFor='true'
                          className='text-xs px-1 text-black'
                        >
                          {state.data &&
                            (state.data.type === 'patient'
                              ? 'Doctor'
                              : 'Paitent')}
                        </label>
                        <div className='flex'>
                          <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                          <p className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                            {state.data &&
                              Mr.data &&
                              (state.data.type === 'patient'
                                ? Mr.data.doctor.name
                                : Mr.data.patient.name)}
                          </p>
                        </div>
                      </div>
                      <div className='w-1/4 px-3 mb-2'>
                        <label
                          htmlFor='true'
                          className='text-xs px-1 text-black'
                        >
                          Date
                        </label>
                        <div className='flex'>
                          <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                          <p className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                            {Mr.data && Mr.data.date.split('T')[0]}
                          </p>
                        </div>
                      </div>
                      <div className='w-1/4 px-3 mb-2'>
                        <label
                          htmlFor='true'
                          className='text-xs px-1 text-black'
                        >
                          Illness
                        </label>
                        <div className='flex'>
                          <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                          <p className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                            {Mr.data && Mr.data.illness}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='flex -mx-3'>
                      <div className='w-1/2 px-3 mb-2'>
                        <label
                          htmlFor='true'
                          className='text-xs px-1 text-black'
                        >
                          History
                        </label>
                        <div className='flex'>
                          <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                          <p className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                            {Mr.data && Mr.data.history}
                          </p>
                        </div>
                      </div>
                      <div className='w-1/2 px-3 mb-2'>
                        <label
                          htmlFor='true'
                          className='text-xs px-1 text-black'
                        >
                          PE diagnosis
                        </label>
                        <div className='flex'>
                          <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                          <p className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                            {Mr.data && Mr.data.peDiagnosis}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='flex -mx-3'>
                      <div className='w-full px-3 mb-2'>
                        <label
                          htmlFor='true'
                          className='text-xs px-1 text-black'
                        >
                          Treatment
                        </label>
                        <div className='flex'>
                          <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                          <div className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                            {Mr.data && Mr.data.treatment}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='text-center'>
                      {error && (
                        <h1 className='text-base text-red-700 font-normal'>
                          {error.message}
                        </h1>
                      )}
                    </div>
                    {state.data && state.data.type === 'doctor' && (
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
                            pathname: `/doctor/medicalRecord/${match.params.id}/edit`,
                            state: {data: Mr.data},
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
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

// fetch Medical record with API
const fetchMR = (setMr, id) => {
  const fetchData = async () => {
    try {
      let res = await Axios.get(
        `http://localhost:5000/api/v1/medicalRecord/${id}`,
        {
          headers: {
            'x-acess-token': localStorage.getItem('token'),
          },
        }
      );
      let data = res.data.data;

      setMr({
        data: data,
        isPending: false,
        error: null,
      });
    } catch (error) {
      setMr({
        data: null,
        isPending: false,
        error: error,
      });
    }
  };
  fetchData();
};

export default EachMR;
