import {useEffect} from 'react';
import useAuthCheck from '../../hooks/useAuthCheck';
import {useFetchUser} from '../../context/userContext';
import useTokenCheck from '../../helper/tokenCheck';
import useDoctorAPI from '../../hooks/useDoctorAPI';

function Home() {
  //const {data: user, isPending, error} = useAuthCheck('http://localhost:5000/api/v1/auth/patient/');
  useTokenCheck();
  const {state} = useFetchUser();
  const {data: doctor} = useDoctorAPI('http://localhost:5000/api/v1/doctor');
  console.log(doctor.data);

  return (
    <div className='wrapper'>
      <div>Home</div>
      {state.isLoading && <div>loading</div>}
      {state.data && <div>{state.data.name}</div>}
    </div>
  );
}

export default Home;
