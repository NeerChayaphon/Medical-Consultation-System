// Patient register page
import React from 'react';
import DoctorPic from '../../../img/Doctor.svg';
import axios from 'axios';
import {useState} from 'react';
import {useHistory, Link} from 'react-router-dom';

const PatientRegister = () => {
  // patient's data
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPass, setconfirmPass] = useState();
  const [phone, setPhone] = useState();
  const [gender, setGender] = useState();
  const [idCard, setIdCard] = useState();
  const [birthdate, setBirthdate] = useState();
  const [bloodType,setBloodType] = useState();
  const [allergy,setAllergy] = useState();
  const [error, setError] = useState(false); // Error 

  const history = useHistory();

  const validation = () => { // password validation
    if (password !== confirmPass) {
      return "password doesn't match";
    }
    return null;
  };

  // register with API
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(validation());
    axios
      .post('http://localhost:5000/api/v1/patient/register', {
        name: name,
        email: email,
        password: password,
        phone: phone,
        gender: gender,
        birthdate: birthdate,
        IDcard: idCard,
        bloodType: bloodType,
        allergy: allergy,
      })
      .then((res) => {
        return res.data;
      })
      .then(() => {
        history.push('/login');
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  return (
    <div>
      <div className='min-w-screen min-h-screen bg-white flex items-center justify-center px-5 py-5'>
        <div className='bg-gray-100 shadow-xl w-full overflow-hidden max-w-6xl'>
          <div className='md:flex w-full'>
            <div className='w-1/3 bg-blue-200 py-5 px-5'>
              <div className='w-full px-3 py-40'>
                <img
                  className='object-cover object-center rounded'
                  src={DoctorPic} alt=""
                />
              </div>
            </div>

            <div className='w-full md:w-2/3 py-10 px-5 md:px-10'>
              <div className='text-center mb-3'>
                <h1 className='text-3xl text-gray-900 -mt-3'>
                  Patient Register
                </h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div>
                  <div className='flex -mx-3'>
                    <div className='w-full px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>Name</label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'></div>
                        <input
                          type='text'
                          required
                          className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                          placeholder='Firstname Surname'
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='flex -mx-3'>
                    <div className='w-1/2 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>Email</label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'></div>
                        <input
                          type='email'
                          required
                          className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                          placeholder='jaidee@example.com'
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='w-1/2 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>
                        Password
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'></div>
                        <input
                          type='password'
                          required
                          className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                          placeholder='************'
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='flex -mx-3'>
                    <div className='w-1/2 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>
                        Confirm Password
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'></div>
                        <input
                          type='password'
                          required
                          className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                          placeholder='************'
                          onChange={(e) => setconfirmPass(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='w-1/2 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>
                        Phone number
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'></div>
                        <input
                          className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                          required
                          placeholder='08xxxxxxxx'
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='flex -mx-3'>
                    <div className='w-1/3 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>ID card</label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'></div>
                        <input
                          className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                          placeholder='x-xxxx-xxxxx-xx-x'
                          onChange={(e) => setIdCard(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className='w-1/3 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>
                        Blood type
                      </label>
                      <div className='relative'>
                        <select required onChange={(e) => setBloodType(e.target.value)} value={bloodType} className='block appearance-none w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'>
                          <option> </option>
                          <option>O</option>
                          <option>A</option>
                          <option>B</option>
                          <option>AB</option>
                        </select>
                        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                          <svg
                            className='fill-current h-4 w-4'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                          >
                            <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className='w-1/3 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>Birth </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'></div>
                        <input
                          type='date'
                          className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                          placeholder='DD/MM/YYYY'
                          required
                          onChange={(e) => setBirthdate(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='flex -mx-3'>
                    <div className='w-2/3 px-3 mb-8'>
                      <label className='text-xs px-1 text-black'>Allergy</label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'></div>
                        <input
                          className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                          placeholder='Food,Drink,Allergic'
                          required
                          onChange={(e) => setAllergy(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='w-1/3 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>
                        Gender
                      </label>
                      <div className='relative'>
                        <select required onChange={(e) => setGender(e.target.value)} value={gender} className='block appearance-none w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'>
                          <option> </option>
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                          <svg
                            className='fill-current h-4 w-4'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                          >
                            <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col -mx-3'>
                  <div className='mt-5 text-center text-red-500 text-sm no-underline block'>{error ? <div>{error.message}</div> : <div> </div>}</div>
                    <div className='w-full px-3 py-3 mb-5 mt-3'>
                      <button
                        type='submit'
                        className='block w-full max-w-xs mx-auto bg-blue-400 hover:bg-blue-500 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 -mb-7'
                      >
                        REGISTER
                      </button>
                    </div>
                  </div>
                  <div>
                    <center>
                      <Link
                        className='text-sm text-blue-500 hover:text-blue-800'
                        to="/login"
                      >
                        Already have as account
                      </Link>
                    </center>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRegister;
