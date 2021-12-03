// patient profile
import useTokenCheck from '../../helper/tokenCheck';
import {useFetchUser} from '../../context/userContext';
import {useHistory, Link} from 'react-router-dom';
import EditIcon from '../../img/edit.png';
import Spinner from '../../components/Spinner';

const PatientProfile = () => {
  const history = useHistory();
  useTokenCheck(); // token check
  const {state} = useFetchUser(); // User data

  if (state.data === null) {
    return <Spinner />;
  } else {
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
          <h1 className='text-3xl'>User's Profile</h1>
        </div>
        {state.data !== null && (
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
                        <div className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                          {state.data.name}
                        </div>
                      </div>
                    </div>
                    <div className='w-1/4 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>Gender</label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <div className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                          {state.data.gender}
                        </div>
                      </div>
                    </div>
                    <div className='w-1/4 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>
                        Birth date
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <div className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                          {state.data.birthdate.split('T')[0]}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex -mx-3'>
                    <div className='w-1/3 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>Email</label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <div className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                          {state.data.email}
                        </div>
                      </div>
                    </div>
                    <div className='w-1/3 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>
                        Phone number
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <div className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                          {state.data.phone}
                        </div>
                      </div>
                    </div>
                    <div className='w-1/3 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>ID card</label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <div className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                          {state.data.IDcard}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex -mx-3'>
                    <div className='w-2/6 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>Allergy</label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <div className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                          {state.data.allergy ? state.data.allergy : 'None'}
                        </div>
                      </div>
                    </div>
                    <div className='w-1/6 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>
                        Blood type
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <div className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                          {state.data.bloodType}
                        </div>
                      </div>
                    </div>
                    <div className='w-2/6 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>
                        Relative
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <div className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                          {state.data.relative.name
                            ? state.data.relative.name
                            : 'None'}
                        </div>
                      </div>
                    </div>
                    <div className='w-1/6 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>
                        Relative type
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <div className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                          {state.data.relative.relativeType
                            ? state.data.relative.relativeType
                            : 'None'}
                        </div>
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
                        <div className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                          {state.data.currentAddress
                            ? state.data.currentAddress
                            : 'None'}
                        </div>
                      </div>
                    </div>
                    <div className='w-1/4 px-3 mb-2'>
                      <label className='text-xs px-1 text-black'>
                        Relative Phone number
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center' />
                        <div className='w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 bg-gray-200'>
                          {state.data.relative.phoneNumber
                            ? state.data.relative.phoneNumber
                            : 'None'}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-end'>
                    <Link
                      className='bg-yellow-300 hover:bg-yellow-400 font-bold py-2 px-4 mt-10 rounded inline-flex'
                      to={{
                        pathname: '/patient/profile/edit',
                        state: {data: state.data},
                      }}
                    >
                      <img className='w-8 h-10 py-1 -mr-3' src={EditIcon} alt="" />
                      <div className='flex flex-col ml-5'>
                        <h1 className='py-2 text-xl text-white'>Edit</h1>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
}

export default PatientProfile;
