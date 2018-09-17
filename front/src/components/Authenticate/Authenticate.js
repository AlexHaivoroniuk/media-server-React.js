import React, { Component, Fragment } from 'react';
import styles from './Authenticate.scss';
import Input from './../UI/Input/Input';
import Button from './../UI/Button/Button';
import ToggleSwitch from './../UI/ToggleSwitch/ToggleSwitch';

class Authenticate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      toggleSignIn: false
    };
  }

  handleInput = (value, field) => {
    this.setState({
      [field]: value
    });
  };

  handleToggleSignIn = () => {
    this.setState((prevState, props) => ({
      toggleSignIn: !prevState.toggleSignIn
    }));
  };

  render() {
    return (
      <Fragment>
        <div className={styles.Authenticate}>
          <p className={styles.Authenticate__Title}>
            {this.state.toggleSignIn ? 'Sign in' : 'Log in'}
          </p>
          <Input
            type="text"
            label="Username"
            placeholder="username"
            value={this.state.username}
            changed={e => {
              this.handleInput(e.target.value, 'username');
            }}
          />
          <Input
            type="password"
            label="Password"
            placeholder="password"
            value={this.state.password}
            changed={e => {
              this.handleInput(e.target.value, 'password');
            }}
          />
          <Button
            btnSize="md"
            btnColor={this.state.toggleSignIn ? 'info' : 'success'}
          >
            {this.state.toggleSignIn ? 'Sign in' : 'Log in'}
          </Button>
          <p>{this.state.toggleSignIn ? 'Log in' : 'Sign in'}</p>
          <ToggleSwitch
            value={this.state.toggleSignIn}
            changed={this.handleToggleSignIn}
          />
        </div>
      </Fragment>
    );
  }
}

export default Authenticate;
