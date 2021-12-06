/* Edit medical record for doctor */
import {useState} from 'react';
import Axios from 'axios';
import {useHistory, useLocation} from 'react-router-dom';
import useTokenCheck from '../../../helper/doctorTokenCheck';
import ConfirmIcon from '../../../img/confirm.png';

const EditMR = () => {
  useTokenCheck(); 
  const location = useLocation();
  const {data} = location.state;

  const history = useHistory();

  if (data) {
    console.log(data);
  }

  // information
  const [date, setDate] = useState(data.date);
  const [illness, setIllness] = useState(data.illness);
  const [pHistory, setPHistory] = useState(data.history);
  const [peDiagnosis, setPeDiagnosis] = useState(data.peDiagnosis);
  const [treatment, setTreatment] = useState(data.treatment);
  const [error, setError] = useState(false);

  // token
  const config = {
    headers: {
      'x-acess-token': localStorage.getItem('token'),
    },
  };

  const bodyParameters = {
    patient: data.patient.id,
    date: date,
    illness: illness,
    history: pHistory,
    peDiagnosis: peDiagnosis,
    treatment: treatment,
  };

  // edit submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    Axios.put(
      `http://localhost:5000/api/v1/medicalRecord/${data.id}`,
      bodyParameters,
      config
    )
      .then((res) => {
        return res.data;
      })
      .then(() => {
        history.goBack();
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data);
      });
  };

  return (
    <div className='font-fontPro'>
      <div className='p-5'>
        <button className='text-base text-gray-700' onClick={history.goBack}>
          <i className='fas fa-chevron-left text-gray-700'></i>
          <span> Back</span>
        </button>
      </div>
      {data && (
        <div className='flex-col'>
          <div className='text-center'>
            {' '}
            <h1 className='text-2xl font-bold'>
              (Edit) {data && data.illness} ({data && data.date.split('T')[0]})
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
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
                          Patient
                        </label>
                        <div className='flex'>
                          <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                          <p className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                            {data.patient.name}
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
                          <input
                            type='date'
                            defaultValue={data && data.date.split('T')[0]}
                            onChange={(e) => setDate(e.target.value)}
                            className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-white'
                          />
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
                          <input
                            defaultValue={data && data.illness}
                            onChange={(e) => setIllness(e.target.value)}
                            className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-white'
                          />
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
                          <textarea
                            defaultValue={data && data.history}
                            onChange={(e) => setPHistory(e.target.value)}
                            className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-white'
                          />
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
                          <textarea
                            defaultValue={data && data.peDiagnosis}
                            onChange={(e) => setPeDiagnosis(e.target.value)}
                            className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-white'
                          />
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
                          <textarea
                            defaultValue={data && data.treatment}
                            onChange={(e) => setTreatment(e.target.value)}
                            className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-white'
                          />
                        </div>
                      </div>
                    </div>
                    <div className='text-center'>
                      {error ? (
                        <h1 className='text-base text-red-700 font-normal'>
                          {error.message}
                        </h1>
                      ) : (
                        <span> </span>
                      )}
                    </div>

                    <div className='flex justify-end'>
                      <button
                        type='submit'
                        className='bg-green-300 hover:bg-green-400 font-bold py-2 px-4 mt-10 rounded inline-flex'
                      >
                        <img
                          className='w-8 h-10 py-1 -mr-3'
                          src={ConfirmIcon} alt=""
                        />
                        <div className='flex flex-col ml-5'>
                          <h1 className='py-2 text-xl text-white'>Confirm</h1>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditMR;
