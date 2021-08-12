import {Redirect} from 'react-router-dom';
const tokenCheck = () => {
  let token = localStorage.getItem('token');
  if (!token) {
    return <Redirect to='/login' />;
  }
};

export default tokenCheck;
