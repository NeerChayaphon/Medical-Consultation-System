import {useState, useEffect} from 'react';
import Axios from 'axios';

const useDoctorAPI = (url) => {
  const [data, setData] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authCheck = async () => {
      try {
        let res = await Axios.get(url);
        setData(res.data);
        setIsPending(false);
        setError(null);
      } catch (error) {
        setIsPending(false);
        setError(error.response.data);
      }
    };
    authCheck();
  }, [url]);
  return {data, isPending, error};
};

export default useDoctorAPI;
