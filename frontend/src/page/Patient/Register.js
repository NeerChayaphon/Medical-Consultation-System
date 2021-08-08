import React from 'react';
import '../../styles/Login.css';
import axios from 'axios';
import {useState} from 'react';
import {useHistory, Link} from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPass, setconfirmPass] = useState();
  const [phone, setPhone] = useState();
  const [gender, setGender] = useState();
  const [idCard, setIdCard] = useState();
  const [birthdate, setBirthdate] = useState();
  const [error, setError] = useState(false);

  const history = useHistory();

  const validation = () => {
    console.log(name, email, password, confirmPass, phone, gender, idCard, birthdate);
    if (password !== confirmPass) {
      return "password doesn't match";
    }
    return null;
  };

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
      })
      .then((res) => {
        return res.data;
      })
      .then(() => {
        history.push('/login');
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data);
      });
  };

  return (
    <div className='login-wrapper'>
      <h1 className='title'>Sign Up</h1>
      <p className='or'>
        <span></span>
      </p>
      <form onSubmit={handleSubmit}>
        <div className='email-login'>
          <label>Name</label>
          <input type='text' required onChange={(e) => setName(e.target.value)} />
          <label>Email</label>
          <input type='email' required onChange={(e) => setEmail(e.target.value)} />
          <label>Password</label>
          <input type='password' required onChange={(e) => setPassword(e.target.value)} />
          <label>Confirm Password</label>
          <input type='password' required onChange={(e) => setconfirmPass(e.target.value)} />
          <label>Phone</label>
          <input type='text' required onChange={(e) => setPhone(e.target.value)} />
          <label>Gender </label>
          <select required onChange={(e) => setGender(e.target.value)} value={gender}>
            <option value=''>---</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
          <label>ID Card</label>
          <input type='number' required onChange={(e) => setIdCard(e.target.value)} />
          <label>Birth date</label>
          <input type='date' required onChange={(e) => setBirthdate(e.target.value)} />

          <button className='cta-btn' type='submit'>
            Submit
          </button>
        </div>
        <div className='authError'>{error ? <div>{error.message}</div> : <div> </div>}</div>
      </form>
      <div className='signup'>
        Click here to <Link to='/login'>sign in</Link>
      </div>
    </div>
  );
}
