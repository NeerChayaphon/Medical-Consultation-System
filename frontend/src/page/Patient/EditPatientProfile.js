// edit patient profile page
import {useState} from 'react';
import useTokenCheck from '../../helper/tokenCheck';
import {useHistory, useLocation} from 'react-router-dom';
import ConfirmIcon from '../../img/confirm.png';
import axios from 'axios';

const EditPatientProfile = () => {
  const history = useHistory();
  const location = useLocation();
  const {data} = location.state;
  useTokenCheck(); // token check


  // patient personal information
  const [name, setName] = useState(data.name);
  const [gender, setGender] = useState(data.gender);
  const [birthdate, setBirthdate] = useState(data.birthdate);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
  const [idCard, setIdCard] = useState(data.IDcard);
  const [allergy, setAllergy] = useState(data.allergy);
  const [bloodType, setBloodType] = useState(data.bloodType);
  const [relative, setRelative] = useState(data.relative.name);
  const [relativeType, setRelativeType] = useState(data.relative.relativeType);
  const [relativePhone, setRelativePhone] = useState(data.relative.phoneNumber);
  const [currentAddress, setCurrentAddress] = useState(data.currentAddress);
  const [error, setError] = useState(false); // error message

  // token
  const config = {
    headers: {
      'x-acess-token': localStorage.getItem('token'),
    },
  };

  // parameter for API request
  const bodyParameters = {
    name: name,
    email: email,
    phone: phone,
    gender: gender,
    birthdate: birthdate,
    IDcard: idCard,
    bloodType: bloodType,
    allergy: allergy,
    relative: {
      name: relative,
      phoneNumber: relativePhone,
      relativeType: relativeType,
    },
    currentAddress: currentAddress,
  };

  // submit edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:5000/api/v1/patient/${data.id}`,
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
      <div className='px-5 pt-5'>
        <button className='text-base text-gray-700' onClick={history.goBack}>
          <i className='fas fa-chevron-left text-gray-700'></i>
          <span> Back</span>
        </button>
      </div>
      <div className='flex-col'>
        <div className='text-center'>
          <h1 className='text-3xl'>Edit Profile</h1>
        </div>
        <form onSubmit={handleSubmit}>
          {data !== null && (
            <div className='flex items-center justify-center pt-4 pb-10'>
              <div
                className='bg-gray-100 shadow-xl w-full overflow-hidden rounded-lg'
                style={{maxWidth: '90%'}}
              >
                <div className='md:flex w-full bg-white'>
                  <div className='w-full py-10 px-5 md:px-10'>
                    <div className='flex -mx-3'>
                      <div className='w-2/4 px-3 mb-2'>
                        <label className='text-xs px-1 text-black'>Name</label>
                        <div className='flex'>
                          <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                          <input
                            defaultValue={data.name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-indigo-500 bg-white'
                          />
                        </div>
                      </div>
                      <div className='w-1/4 px-3 mb-2'>
                        <label className='text-xs px-1 text-black'>
                          Gender
                        </label>
                        <div className='flex'>
                          <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                          <select
                            defaultValue={data.gender}
                            required
                            onChange={(e) => setGender(e.target.value)}
                            value={gender}
                            className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-indigo-500 bg-white'
                          >
                            {' '}
                            d<option>Male</option>
                            <option>Female</option>
                          </select>
                        </div>
                      </div>
                      <div className='w-1/4 px-3 mb-2'>
                        <label className='text-xs px-1 text-black'>
                          Birth date
                        </label>
                        <div className='flex'>
                          <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                          <input
                            defaultValue={data.birthdate.split('T')[0]}
                            type='date'
                            onChange={(e) => setBirthdate(e.target.value)}
                            className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-indigo-500 bg-white'
                          />
                        </div>
                      </div>
                    </div>
                    <div className='flex -mx-3'>
                      <div className='w-1/3 px-3 mb-2'>
                        <label className='text-xs px-1 text-black'>Email</label>
                        <div className='flex'>
                          <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                          <input
                            defaultValue={data.email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-indigo-500 bg-white'
                          />
                        </div>
                      </div>
                      <div className='w-1/3 px-3 mb-2'>
                        <label className='text-xs px-1 text-black'>
                          Phone number
                        </label>
                        <div className='flex'>
                          <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                          <input
                            defaultValue={data.phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-indigo-500 bg-white'
                          />
                        </div>
                      </div>
                      <div className='w-1/3 px-3 mb-2'>
                        <label className='text-xs px-1 text-black'>
                          ID card
                        </label>
                        <div className='flex'>
                          <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                          <input
                            defaultValue={data.IDcard}
                            onChange={(e) => setIdCard(e.target.value)}
                            className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-indigo-500 bg-white'
                          />
                        </div>
                      </div>
                    </div>
                    <div className='flex -mx-3'>
                      <div className='w-2/6 px-3 mb-2'>
                        <label className='text-xs px-1 text-black'>
                          Allergy
                        </label>
                        <div className='flex'>
                          <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                          <input
                            defaultValue={data.allergy ? data.allergy : ''}
                            onChange={(e) => setAllergy(e.target.value)}
                            className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-indigo-500 bg-white'
                          />
                        </div>
                      </div>
                      <div className='w-1/6 px-3 mb-2'>
                        <label className='text-xs px-1 text-black'>
                          Blood type
                        </label>
                        <div className='flex'>
                          <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                          <select
                            defaultValue={data.bloodType}
                            onChange={(e) => setBloodType(e.target.value)}
                            value={bloodType}
                            className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-indigo-500 bg-white'
                          >
                            <option>O</option>
                            <option>A</option>
                            <option>B</option>
                            <option>AB</option>
                          </select>
                        </div>
                      </div>
                      <div className='w-2/6 px-3 mb-2'>
                        <label className='text-xs px-1 text-black'>
                          Relative
                        </label>
                        <div className='flex'>
                          <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                          <input
                            defaultValue={
                              data.relative.name ? data.relative.name : ''
                            }
                            onChange={(e) => setRelative(e.target.value)}
                            className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-indigo-500 bg-white'
                          />
                        </div>
                      </div>
                      <div className='w-1/6 px-3 mb-2'>
                        <label className='text-xs px-1 text-black'>
                          Relative type
                        </label>
                        <div className='flex'>
                          <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                          <input
                            defaultValue={
                              data.relative.relativeType
                                ? data.relative.relativeType
                                : ''
                            }
                            onChange={(e) => setRelativeType(e.target.value)}
                            className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-indigo-500 bg-white'
                          />
                        </div>
                      </div>
                    </div>
                    <div className='flex -mx-3'>
                      <div className='w-2/4 px-3 mb-2'>
                        <label className='text-xs px-1 text-black'>
                          Current address
                        </label>
                        <div className='flex'>
                          <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                          <input
                            defaultValue={
                              data.currentAddress ? data.currentAddress : ''
                            }
                            onChange={(e) => setCurrentAddress(e.target.value)}
                            className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-indigo-500 bg-white'
                          />
                        </div>
                      </div>
                      <div className='w-1/4 px-3 mb-2'>
                        <label className='text-xs px-1 text-black'>
                          Relative Phone number
                        </label>
                        <div className='flex'>
                          <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                          <input
                            defaultValue={
                              data.relative.phoneNumber
                                ? data.relative.phoneNumber
                                : ''
                            }
                            onChange={(e) => setRelativePhone(e.target.value)}
                            className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-indigo-500 bg-white'
                          />
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
                    <div className='flex justify-end'>
                      <button
                        type='submit'
                        className='bg-green-600 hover:bg-green-700 font-bold py-2 px-4 mt-10 rounded inline-flex'
                      >
                        <img
                          className='w-8 py-1 -mr-3'
                          src={ConfirmIcon}
                          alt=''
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
          )}
        </form>
      </div>
    </div>
  );
};

export default EditPatientProfile;
