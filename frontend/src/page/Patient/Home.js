import {useHistory, Redirect} from 'react-router-dom';

function Home() {
  const history = useHistory();
  let token = localStorage.getItem('token');

  if (!token) {
    return <Redirect to='/login' />;
  }

  return (
    <div className='wrapper'>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
