import React from 'react';
import '../../styles/Login.css';
import axios from 'axios';
import {useState} from 'react';
import {useHistory, Link} from 'react-router-dom';

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
      <h1 className='title'>Log In</h1>
      <p className='or'>
        <span></span>
      </p>
      <form onSubmit={handleSubmit}>
        <div className='email-login'>
          <label>Email</label>
          <input type='email' required onChange={(e) => setEmail(e.target.value)} />
          <label>Password</label>
          <input type='password' required onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <button type='submit' className='cta-btn'>
            Submit
          </button>
        </div>
        <div className='authError'>{error ? <div>{error.message}</div> : <div> </div>}</div>

        <div className='signup'>
          Click here to <Link to='/register'>sign up</Link>
        </div>
      </form>
    </div>
  );
}
