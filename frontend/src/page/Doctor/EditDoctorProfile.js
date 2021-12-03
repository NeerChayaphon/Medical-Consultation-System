// Edit doctor profile page
import {useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import ConfirmIcon from '../../img/confirm.png';
import Axios from 'axios';

const EditDoctorProfile = () => {
  const history = useHistory();
  const location = useLocation();
  const {data} = location.state; // old data

  // all the information
  const [name, setName] = useState(data.name);
  const [gender, setGender] = useState(data.gender);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
  const [hospital, setHospital] = useState(data.hospital);
  const [background, setBackground] = useState(data.background);
  const [SD, setSD] = useState(data.specializationDetail);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(false);

 // token
  const config = {
    headers: {
      'x-acess-token': localStorage.getItem('token'),
    },
  };

  // edit submit with API
  const handleSubmit = async (e) => {
    let formData = new FormData();
    formData.append('name', name);
    formData.append('gender', gender);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('hospital', hospital);
    formData.append('background', background);
    formData.append('specializationDetail', SD);
    if (photo) {
      formData.append('photo', photo);
    }

    e.preventDefault();
    Axios.put(
      `http://localhost:5000/api/v1/doctor/${data.id}`,
      formData,
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
      <div className='p-3'>
        <button className='text-base text-gray-700' onClick={history.goBack}>
          <i className='fas fa-chevron-left text-gray-700'></i>
          <span> Back</span>
        </button>
      </div>
      <div className='flex-col'>
        <div className='text-center mb-2'>
          <h1 className='text-2xl font-bold'>Edit Doctor's Profile</h1>
        </div>
        {data && (
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
                <h1>Specialization</h1>
              </div>
              <div className='flex justify-center'>
                <h1 className='text-center bg-pink-200 rounded-lg w-32'>
                  {data.specialization.specialization}
                </h1>
              </div>
            </div>

            <div
              className='bg-white shadow-xl w-2/3 overflow-hidden rounded-lg'
              style={{maxWidth: 1000}}
            >
              <form onSubmit={handleSubmit}>
                <div className='w-full py-10 px-5 md:px-10 bg-white'>
                  <div className='flex -mx-3'>
                    <div className='w-1/2 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>Name</label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <input
                          defaultValue={data.name}
                          onChange={(e) => setName(e.target.value)}
                          className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 '
                        />
                      </div>
                    </div>
                    <div className='w-1/2 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>Gender</label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <select
                          defaultValue={data.gender}
                          onChange={(e) => setGender(e.target.value)}
                          className='w-1/2 -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 '
                        >
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className='flex -mx-3'>
                    <div className='w-1/2 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>Email</label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <input
                          defaultValue={data.email}
                          onChange={(e) => setEmail(e.target.value)}
                          className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 '
                        />
                      </div>
                    </div>
                    <div className='w-1/2 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>
                        Phone number
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <input
                          defaultValue={data.phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 '
                        />
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
                        <input
                          defaultValue={data.hospital}
                          onChange={(e) => setHospital(e.target.value)}
                          className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 '
                        />
                      </div>
                    </div>
                    <div className='w-1/2 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>
                        Education
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <input
                          defaultValue={data.background}
                          onChange={(e) => setBackground(e.target.value)}
                          className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 '
                        />
                      </div>
                    </div>
                  </div>
                  <div className='flex -mx-3'>
                    <div className='w-1/2 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>
                        Specialization detail
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <textarea
                          defaultValue={data.specializationDetail}
                          onChange={(e) => setSD(e.target.value)}
                          className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 '
                        />
                      </div>
                    </div>
                    <div className='w-1/2 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>Picture</label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <input
                          type='file'
                          onChange={(e) => setPhoto(e.target.files[0])}
                          className='w-full -ml-10 pl-1 pr-3 py-2 rounded-lg outline-none focus:border-indigo-500 '
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
                      className='bg-green-400 hover:bg-green-500 font-bold py-2 px-4 mt-5 rounded inline-flex'
                    >
                      <img className='w-8 h-10 py-1 -mr-3' src={ConfirmIcon} alt=""/>
                      <div className='flex flex-col ml-5'>
                        <h1 className='py-2 text-xl text-white'>Confirm</h1>
                      </div>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditDoctorProfile;
