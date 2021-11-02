import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './page/Patient/Home';
import Landing from './page/All/Landing';
import Login from './page/Patient/Login';
import Register from './page/Patient/Register';
import Navbar from './components/Navbar';
import DoctorInfo from './page/Patient/DoctorInfo';
import DoctorDashboard from './page/Doctor/DoctorDashboard';
import Call from './page/videoCall/VideoCall';
import UserNavbar from './components/UserNavbar';

// import {useFetchUser} from './context/userContext';

import './App.css';
import UserLogin from './page/Patient/authPage/UserLogin';
import PatientRegister from './page/Patient/authPage/PatientRegister';
import MRdashboard from './page/Patient/MR/MRdashboard';

function App() {
  // const {state} = useFetchUser();
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/register' component={PatientRegister} />
        <Route path='/login' component={UserLogin} />
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
      <Route path='/patient/medicalRecord' component={MRdashboard} />
      <Route path='/doctorInfo/:id' component={DoctorInfo} />
      <Route path='/doctor/:id' component={DoctorDashboard} />
    </>
  );
}

export default App;
