import {Redirect} from 'react-router-dom';
//import {useState} from 'react';
import useAuthCheck from '../../hooks/useAuthCheck';
import {useFetchUser} from '../../context/userContext';
import tokenCheck from '../../helper/tokenCheck';

function Home() {
  //const {data: user, isPending, error} = useAuthCheck('http://localhost:5000/api/v1/auth/patient/');
  const {state} = useFetchUser();
  let token = localStorage.getItem('token');
  if (!token) {
    return <Redirect to='/login' />;
  }
  console.log(state);
  return (
    <div className='wrapper'>
      <div>Home</div>
      {state.isLoading && <div>loading</div>}
      {state.data && <div>{state.data.name}</div>}
    </div>
  );
}

export default Home;
