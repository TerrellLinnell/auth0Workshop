import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import './index.css';
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

ReactDOM.render(
  <div>
    <Router history={browserHistory} >
      <Route path="/" component={Container} auth={auth} >
        <IndexRoute component={Home} onEnter={requireAuth} />
        <Route path="/login" component={Login} />
      </Route>
    </Router>
  </div>,
  document.getElementById('root')
);
