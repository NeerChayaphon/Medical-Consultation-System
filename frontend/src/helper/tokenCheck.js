// user token check
import {useHistory} from 'react-router-dom';
const useTokenCheck = () => {
  const history = useHistory();
  let token = localStorage.getItem('token');
  if (!token) {
    history.push('/login');
  }
};

export default useTokenCheck;
