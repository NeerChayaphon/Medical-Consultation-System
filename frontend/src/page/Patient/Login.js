import React from 'react';
import '../../styles/Login.css';
import axios from 'axios';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/v1/patient/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
        history.push('/home');
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data);
      });
  };

  return (
    <div className='login-wrapper'>
      <h1>Please Log In</h1>
      {error && <div>{error.message}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type='email' required onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type='password' required onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}
