import {Redirect} from 'react-router-dom';
import {useState} from 'react';
import useAuthCheck from '../../adapters/useAuthCheck';

function Home() {
  const {data: user, isPending, error} = useAuthCheck('http://localhost:5000/api/v1/auth/patient/');

  //let token = localStorage.getItem('token');
  if (error) {
    console.log(error);
    return <Redirect to='/login' />;
  }
  return (
    <div className='wrapper'>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
