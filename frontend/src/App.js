import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './page/Patient/Home';
import Landing from './page/Patient/Landing';
import Login from './page/Patient/Login';
import Register from './page/Patient/Register';
import Navbar from './components/Navbar';

import './App.css';
// import {useState} from 'react';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Landing />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/home'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
