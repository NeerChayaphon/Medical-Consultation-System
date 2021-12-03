/* React conntext API */
import {createContext, useContext, useState, useEffect} from 'react';
import Axios from 'axios';

export const UserContext = createContext();

// Give user information
const UserContextProvider = (props) => {
  const [state, setState] = useState({
    isLoading: true,
    data: null,
    error: null,
    isUpdating: false,
  });
  return (
    <UserContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

// fetch data
export const useFetchUser = () => {
  const {state, setState} = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchUser(setState);
    } else {
      setState({
        isLoading: false,
        isUpdating: false,
        error: 'User must be authorize',
        data: null,
      });
    }
  }, [setState]);

  const refetch = () => {
    fetchUser(setState);
  };

  // fetch data from API
  const fetchUser = async (setState) => {
    try {
      let res = await Axios.get('http://localhost:5000/api/v1/auth/', {
        headers: {
          'x-acess-token': localStorage.getItem('token'),
        },
      });
      let type = res.data.type
      res = await Axios.get(`http://localhost:5000/api/v1/${type}/${res.data.id}`, {
        headers: {
          'x-acess-token': localStorage.getItem('token'),
        },
      });
      let result = res.data.data
      result.type = type
      setState({
        isLoading: false,
        isUpdating: false,
        error: null,
        data: result,
      });
    } catch (error) {
      setState({
        isLoading: false,
        isUpdating: false,
        error: error.response,
        data: null,
      });
    }
  };

  return {
    state: state,
    refetch: refetch,
  };
};

export default UserContextProvider;
