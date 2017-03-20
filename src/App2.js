import React, { Component } from 'react';
import {Router, Route, IndexRedirect, IndexRoute, hashHistory, browserHistory} from 'react-router';
import './App.css';
import Home from './Home';
import Login from './Login';
import Container from './Container';
import AuthService from './AuthService';

const auth = new AuthService('SFACxhfQYga0K03ggbncdtj91U4sj9mz', 'carlfahl.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

export class App2 extends Component {
  render = () => {
    return (
      <div>
        <Router history={browserHistory} >
          <Route path="/" component={Container} auth={auth}>
            <IndexRoute component={Home} onEnter={requireAuth} />
            <Route path="/login" component={Login} />
          </Route>
        </Router>
      </div>
    );
  }
}

export default App2;
