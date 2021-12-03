// edit staff information page
import {useState} from 'react';
import Axios from 'axios';
import {useHistory, useLocation} from 'react-router-dom';
import useTokenCheck from '../../helper/staffTokenCheck';
import ConfirmIcon from '../../img/confirm.png';

const EditStaffProfile = () => {
  useTokenCheck(); // token check
  const location = useLocation();
  const {data} = location.state;

  const history = useHistory();

  // staff information
  const [name, setName] = useState(data.name);
  const [gender, setGender] = useState(data.gender);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
  const [position, setPosition] = useState(data.position);
  const [salary, setSalary] = useState(data.salary);
  const [error, setError] = useState(false);

  // token
  const config = {
    headers: {
      'x-acess-token': localStorage.getItem('token'),
    },
  };

  // API parameters
  const bodyParameters = {
    name: name,
    gender: gender,
    email: email,
    phone: phone,
    position: position,
    salary: salary,
  };

  // submit edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    Axios.put(
      `http://localhost:5000/api/v1/staff/${data.id}`,
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
          {data && (
            <form onSubmit={handleSubmit}>
              <div className='md:flex w-full bg-white'>
                <div className='w-full py-10 px-5 md:px-10'>
                  <div className='flex -mx-3'>
                    <div className='w-2/3 px-3 mb-2'>
                      <label htmlFor className='text-xs px-1 text-black'>
                        Name
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <input
                          defaultValue={data.name}
                          onChange={(e) => setName(e.target.value)}
                          className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-white'
                        />
                      </div>
                    </div>
                    <div className='w-1/3 px-3 mb-2'>
                      <label htmlFor className='text-xs px-1 text-black'>
                        Phone number
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <input
                          defaultValue={data.phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-white'
                        />
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
                        <input
                          defaultValue={data.email}
                          onChange={(e) => setEmail(e.target.value)}
                          className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-white'
                        />
                      </div>
                    </div>
                    <div className='w-1/3 px-3 mb-2'>
                      <label htmlFor className='text-xs px-1 text-black'>
                        Position
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <input
                          defaultValue={data.position}
                          onChange={(e) => setPosition(e.target.value)}
                          className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-white'
                        />
                      </div>
                    </div>
                    <div className='w-1/3 px-3 mb-2'>
                      <label htmlFor className='text-xs px-1 text-black'>
                        Salary
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <input
                          defaultValue={data.salary}
                          onChange={(e) => setSalary(e.target.value)}
                          className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-white'
                        />
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
                        <select
                          defaultValue={data.gender}
                          onChange={(e) => setGender(e.target.value)}
                          className='w-1/2 -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-white'
                        >
                          <option>Male</option>
                          <option>Female</option>
                        </select>
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
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditStaffProfile;
