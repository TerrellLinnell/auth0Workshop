import React from 'react';
import {Route, IndexRedirect} from 'react-router';
import './App.css';
import Auth0Lock from 'auth0-lock';
import Home from './Home';
import Login from './Login';
import Container from './Container';
import AuthService from './AuthService';

// import Auth0 from 'auth0-js';

var App = React.createClass({
  getInitialState: function () {
    return (
      {
        token: null,
        lock: null
      }
    );
  },
  createLock: function (cbf) {
    this.setState({lock: new Auth0Lock('GiPnz58cNt9qVdyowetQRF0C55cj8ul7', 'carlfahl.auth0.com')});
  },
  getIdToken: function () {
    console.log("getting the token");
    var authToken = this.lock.parseHash(window.location.hash);
    var idToken = authToken.id_token;
    console.log(idToken);
    return idToken;
  },
  componentWillMount: function () {
    this.createLock();
    if (this.state.lock) {
      this.setState({token: this.getIdToken()});
    }
  },
  render: function () {
    if (this.state.token) {
      return (
        <div>
          <h1>Logged In.</h1>
        </div>
      );
    } else {
      return (
        <div>
          <Home lock={this.state.lock} />
        </div>
      );
    }
  }
});

export default App;
