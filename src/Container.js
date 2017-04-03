import React, { Component, PropTypes as T } from 'react'
import { Jumbotron, Button } from 'react-bootstrap'
import {WebAuth} from 'auth0-js';
import $ from 'jquery';

class Container extends Component {
  constructor(props) {
    super (props);
    this.state = {user: null}
  }

  componentWillMount = () => {
    this.auth0 = new WebAuth({
      domain: "carlfahl.auth0.com",
      clientID: "SFACxhfQYga0K03ggbncdtj91U4sj9mz"
    })
  }

  logout = () => {
    this.props.route.auth.logout();
  }

  getCurrentUser = () => {
    // ajax version
    var token = this.props.route.auth.getToken();
    console.log(token);
    $.ajax({
      url: 'https://carlfahl.auth0.com/userinfo',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    }).done((data) => {
      console.log(data);
    });
    // node module version
    // var token = this.props.route.auth.getToken();
    // console.log(token);
    // this.auth0.client.userInfo(this.props.route.auth.getToken(), (err, user) => {
      // if (err) {
        // console.log("Error: ", err);
      // } else {
        // console.log(user);
      // }
    // })
  }

  render = () => {
    let children = null;
    if (this.props.children) {
      console.log("Making the children.")
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance from route to children
      });
    }

    return (
      <Jumbotron>
        <h2>
          <img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg" />
        </h2>
        <Button bsStyle='primary' onClick={() => this.getCurrentUser()}>Get Current User</Button>
        {children}
      </Jumbotron>
    )
  }
}

export default Container;
