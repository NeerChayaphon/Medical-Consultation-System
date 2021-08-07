import React from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import {useState} from 'react';

export default function PatientLogin({setToken}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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
        // console.log(data.token);
        // setData(data.token);
        setToken(data.token);

        localStorage.setItem('token', data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='login-wrapper'>
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type='text' onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type='password' onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}

PatientLogin.propTypes = {
  setToken: PropTypes.func.isRequired,
};
