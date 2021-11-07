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
import EachMR from './page/Patient/MR/EachMR';
import PatientProfile from './page/Patient/PatientProfile';
import EditPatientProfile from './page/Patient/EditPatientProfile';
import DoctorLogin from './page/Doctor/authPage/DoctorLogin';
import EditMR from './page/Doctor/MR/EditMR';

function App() {
  // const {state} = useFetchUser();
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/register' component={PatientRegister} />
        <Route path='/login' component={UserLogin} />
        <Route path='/doctorLogin' component={DoctorLogin} />
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
      <Route exact path='/patient/medicalRecord' component={MRdashboard} />
      <Route path='/patient/medicalRecord/:id' component={EachMR} />
      <Route exact path='/patient/profile' component={PatientProfile} />
      <Route exact path='/patient/profile/edit' component={EditPatientProfile} />
      <Route path='/doctorInfo/:id' component={DoctorInfo} />
      <Route exact path='/doctor' component={DoctorDashboard} />
      <Route exact path='/doctor/medicalRecord/:id' component={EachMR} />
      <Route path='/doctor/medicalRecord/:id/edit' component={EditMR} />
    </>
  );
}

export default App;
