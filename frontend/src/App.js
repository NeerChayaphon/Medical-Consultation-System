import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './page/Patient/Home';
import Landing from './page/Patient/Landing';
import Login from './page/Patient/Login';
import Register from './page/Patient/Register';
import Navbar from './components/Navbar';
import DoctorInfo from './page/Patient/DoctorInfo';
import DoctorDashboard from './page/Doctor/DoctorDashboard';
import Call from './page/videoCall/VideoCall';
import UserNavbar from './components/UserNavbar';

// import {useFetchUser} from './context/userContext';

import './App.css';

function App() {
  // const {state} = useFetchUser();
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/signup' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/call/:id' component={Call} />
        <Route component={DefaultContainer} />
      </Switch>
    </Router>
  );
}

function DefaultContainer() {
  return (
    <>
      <UserNavbar />
      <Route path='/home' component={Home} />
      <Route path='/doctorInfo/:id' component={DoctorInfo} />
      <Route path='/doctor/:id' component={DoctorDashboard} />
    </>
  );
}

export default App;
