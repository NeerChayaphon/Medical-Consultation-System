// Medical Record Dashboard page
import useTokenCheck from '../../../helper/tokenCheck';
import {useFetchUser} from '../../../context/userContext';
import {useEffect, useState} from 'react';
import Axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import Spinner from '../../../components/Spinner';

export default function Example() {
  const history = useHistory();
  useTokenCheck(); // token check
  const {state} = useFetchUser(); // User data

  const [mr, setMr] = useState({
    data: [],
    isPending: true,
    error: null,
  });

  useEffect(() => {
    if (state.data) {
      fetchMR(setMr, state.data.id); // get medical record
    }
  }, [setMr, state.data]);

  if (mr.isPending) {
    return <Spinner />;
  } else {
    return (
      <div className='font-fontPro'>
        <div className='p-5'>
          <button className='text-base text-gray-700' onClick={history.goBack}>
            <i className='fas fa-chevron-left text-gray-700'></i> Back
          </button>
        </div>
        <div className='mb-5 mx-auto max-w-7xl w-full px-10 flex flex-col space-y-4'>
          <div className='mx-auto max-w-7xl w-full flex justify-between mb-3'>
            <h1 className='text-3xl'>Medical Record</h1>
            {/* { <button className="px-4 py-2 rounded-md bg-blue-400 text-white">Add</button>} */}
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
                          Date
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Illness
                        </th>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                      {mr.data &&
                        mr.data.map((data) => (
                          <tr key={data.id ? data.id : Math.random()}>
                            <td className='px-6 py-4 whitespace-nowrap'>
                              <div className='flex items-center'>
                                <div className='flex-shrink-0 h-10 w-10'>
                                  <img
                                    className='h-10 w-10 rounded-full'
                                    src={data.doctor && data.doctor.photo}
                                    alt=''
                                  />
                                </div>
                                <div className='ml-4'>
                                  <div className='text-base font-medium text-gray-900'>
                                    {data.doctor && data.doctor.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                              <div className='text-base text-gray-900'>
                                {data.date.split('T')[0]}
                              </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                              <span className='px-2 inline-flex text-base leading-5 '>
                                {data.illness}
                              </span>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap '>
                              <Link
                                className='text-base font-bold text-purple-500 hover:text-pink-500'
                                to={`/patient/medicalRecord/${data.id}`}
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
}
// fetch user's medical record
const fetchMR = (setMr, id) => { 
  const fetchData = async () => {
    try {
      let res = await Axios.get(
        `http://localhost:5000/api/v1/medicalRecord/?sort=-date&patient=${id}`,
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
