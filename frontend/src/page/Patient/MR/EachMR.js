import {useEffect, useState} from 'react';
import Axios from 'axios';
import {useHistory} from 'react-router-dom';

const EachMR = ({match}) => {
  const history = useHistory();
  const [Mr, setMr] = useState({
    data: null,
    isPending: true,
    error: null,
  });

  useEffect(() => {
    fetchMR(setMr, match.params.id);
  }, [setMr, match]);

  if (Mr.data) {
    console.log(Mr.data);
  }

  return (
    <div className="font-fontPro">
      {Mr.error && <h1>Incorrect Url</h1>}
      <div className='p-5'>
        <button className='text-lg text-gray-700' onClick={history.goBack}>
          <i className='fas fa-chevron-left'></i>
          <span> Back</span>
        </button>
      </div>
      <div className='flex-col'>
        <div className="text-center"> <h1 className="text-2xl font-bold">{Mr.data && Mr.data.illness} ({Mr.data && Mr.data.date.split('T')[0]})</h1></div>
        <div className='flex items-center justify-center pt-5 pb-10'>
          <div
            className='bg-gray-100 shadow-xl w-full overflow-hidden rounded-lg'
            style={{maxWidth: '90%'}}
          >
            <div className='md:flex w-full bg-white'>
              <div className='w-full py-10 px-5 md:px-10'>
                <div className='flex w-full -mx-3'>
                  <div className='w-2/4 px-3 mb-2'>
                    <label htmlFor='true' className='text-xs px-1 text-black'>
                      Doctor
                    </label>
                    <div className='flex'>
                      <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                      <p className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                        {Mr.data && Mr.data.doctor.name}
                      </p>
                    </div>
                  </div>
                  <div className='w-1/4 px-3 mb-2'>
                    <label htmlFor='true' className='text-xs px-1 text-black'>
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
                    <label htmlFor='true' className='text-xs px-1 text-black'>
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
                    <label htmlFor='true' className='text-xs px-1 text-black'>
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
                    <label htmlFor='true' className='text-xs px-1 text-black'>
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
                    <label htmlFor='true' className='text-xs px-1 text-black'>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
