// All route
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './page/Patient/Home';
import Landing from './page/All/Landing';
import DoctorInfo from './page/Patient/DoctorInfo';
import DoctorDashboard from './page/Doctor/DoctorDashboard';
import Call from './page/videoCall/VideoCall';
import UserNavbar from './components/UserNavbar';

import './App.css';
import UserLogin from './page/Patient/authPage/UserLogin';
import PatientRegister from './page/Patient/authPage/PatientRegister';
import MRdashboard from './page/Patient/MR/MRdashboard';
import EachMR from './page/Patient/MR/EachMR';
import PatientProfile from './page/Patient/PatientProfile';
import EditPatientProfile from './page/Patient/EditPatientProfile';
import DoctorLogin from './page/Doctor/authPage/DoctorLogin';
import EditMR from './page/Doctor/MR/EditMR';
import ViewMRdashboard from './page/videoCall/MR/ViewMRdashboard';
import ViewEachMR from './page/videoCall/MR/ViewEachMR';
import AddMR from './page/videoCall/MR/AddMR';
import DoctorProfile from './page/Doctor/DoctorProfile';
import EditDoctorProfile from './page/Doctor/EditDoctorProfile';
import StaffLogin from './page/Staff/authPage/StaffLogin';
import DoctorManagement from './page/Staff/doctorManagement/DoctorManagement';
import EachDoctor from './page/Staff/doctorManagement/EachDoctor';
import AddDoctor from './page/Staff/doctorManagement/AddDoctor';
import StaffManagement from './page/Staff/staffManagement/StaffManagement';
import EachStaff from './page/Staff/staffManagement/EachStaff';
import EditStaffProfile from './page/Staff/EditStaffProfile';
import AddStaff from './page/Staff/staffManagement/AddStaff';
import StaffProfile from './page/Staff/StaffProfile';

function App() {
  // const {state} = useFetchUser();
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/register' component={PatientRegister} />
        <Route path='/login' component={UserLogin} />
        <Route path='/doctorLogin' component={DoctorLogin} />
        <Route path='/staffLogin' component={StaffLogin} />
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
      <Route
        exact
        path='/patient/profile/edit'
        component={EditPatientProfile}
      />
      <Route path='/doctorInfo/:id' component={DoctorInfo} />
      <Route exact path='/doctor' component={DoctorDashboard} />
      <Route exact path='/doctor/profile' component={DoctorProfile} />
      <Route exact path='/doctor/profile/edit' component={EditDoctorProfile} />
      
      <Route exact path='/doctor/medicalRecord/:id' component={EachMR} />
      <Route path='/doctor/medicalRecord/:id/edit' component={EditMR} />

      <Route
        exact
        path='/manageMedicalRecord/:id'
        component={ViewMRdashboard}
      />
      <Route path='/view/medicalRecord/:id' component={ViewEachMR} />
      <Route path='/add/medicalRecord/' component={AddMR} />

      <Route exact path="/staff/doctorManagement" component={DoctorManagement}/>
      <Route exact path="/add/doctorManagement" component={AddDoctor}/>
      <Route exact path="/staff/doctorManagement/:id" component={EachDoctor}></Route>
      <Route path="/staff/doctorManagement/:id/edit" component={EditDoctorProfile}></Route>

      <Route exact path="/staff/staffManagement" component={StaffManagement}/>
      <Route exact path="/add/staffManagement" component={AddStaff}/>
      <Route exact path="/staff/staffManagement/:id" component={EachStaff}></Route>
      <Route path="/staff/staffManagement/:id/edit" component={EditStaffProfile}></Route>

      <Route exact path="/staff/profile" component={StaffProfile}></Route>
      <Route exact path="/staff/profile/edit" component={EditStaffProfile}></Route>
    </>
  );
}

export default App;






