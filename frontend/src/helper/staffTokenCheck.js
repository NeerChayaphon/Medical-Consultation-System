// staff token check
import {useHistory} from 'react-router-dom';
const useTokenCheck = () => {
  const history = useHistory();
  let token = localStorage.getItem('token');
  if (!token) {
    history.push('/staffLogin');
  }
};

export default useTokenCheck;
