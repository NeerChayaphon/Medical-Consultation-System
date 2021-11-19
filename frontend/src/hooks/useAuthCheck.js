import {useState, useEffect} from 'react';
import Axios from 'axios';

const useAuthCheck = (url) => {
  const [data, setData] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authCheck = async () => {
      try {
        let res = await Axios.get(url, {
          headers: {
            'x-acess-token': localStorage.getItem('token'),
          },
        });
        res = await Axios.get(`https://harmore.herokuapp.com/api/v1/patient/${res.data.id}`);
        setData(res.data);
        setIsPending(false);
        setError(null);
      } catch (error) {
        setIsPending(false);
        setError(error.response.data);
      }
    };
    if (localStorage.getItem('token')) {
      authCheck();
    } else {
      setError({message: 'User must be authorize'});
    }
  }, [url]);
  return {data, isPending, error};
};

export default useAuthCheck;

// useEffect(() => {
//   const authCheck = async () => {
//     try {
//       let res = await Axios.get(url, {
//         headers: {
//           'x-acess-token': localStorage.getItem('token'),
//         },
//       });

//       await setUser(res.data);
//     } catch (error) {}
//   };
//   authCheck();
//   setIsPending(false);
// }, [url]);

// const useAuthCheck = (url) => {
//   const [data, setData] = useState([]);
//   const [isPending, setIsPending] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     Axios.get(url, {
//       headers: {
//         'x-acess-token': localStorage.getItem('token'),
//       },
//     })
//       .then((res) => {
//         return res.data;
//       })
//       .then((data) => {
//         setIsPending(false);
//         setData(data);
//         setError(null);
//       })
//       .catch((err) => {
//         if (err.name === 'AbortError') {
//           console.log('fetch aborted');
//         } else {
//           // auto catches network / connection error
//           setIsPending(false);
//           setError(err.message);
//         }
//       });
//   }, [url]);
//   return {data, isPending, error};
// };
