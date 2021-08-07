import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './page/Home';
import Landing from './page/Landing';
import PatientLogin from './page/PatientLogin';
//import {useState} from 'react';

function App() {
  return (
    <Router>
      <div className='App'>
        <div className='content'>
          <Switch>
            <Route exact path='/'>
              <Landing />
            </Route>
            <Route path='/login'>
              <PatientLogin />
            </Route>
            <Route path='/home'>
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
