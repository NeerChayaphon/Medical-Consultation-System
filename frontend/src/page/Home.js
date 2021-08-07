import React from 'react';

import PatientLogin from './PatientLogin';

import useToken from '../components/useToken';

function Home() {
  // const [token, setToken] = useState(localStorage.getItem('token'));
  const {token, setToken} = useToken();
  if (!token) {
    return <PatientLogin setToken={setToken} />;
  }

  return (
    <div className='wrapper'>
      <h1>Home</h1>
    </div>
  );
}

export default Home;

//const {data, isPending, error} = useAuthCheck('http://localhost:5000/api/v1/auth/patient');
//   import PatientLogin from './PatientLogin';
// import useToken from '../components/useToken';
