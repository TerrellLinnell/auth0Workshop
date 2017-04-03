import React from 'react';
import { Button } from 'react-bootstrap';

const Home = (props) => {
  return (
    <div>
      <h1>Logged In</h1>
      <h3>Welcome: {props.auth.getUser()}</h3>
      <Button bsStyle='primary' onClick={() => {props.auth.logout(); window.location='/';}}>Logout</Button>
    </div>
  );
}

export default Home;
