import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './page/Patient/Home';
import Landing from './page/Patient/Landing';
import Login from './page/Patient/Login';
import Register from './page/Patient/Register';
import Navbar from './components/Navbar';

import {useFetchUser} from './context/userContext';

import './App.css';

function App() {
  const {state} = useFetchUser();
  return (
    <Router>
      {state.data && <Navbar />}
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/signup' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/home' component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
