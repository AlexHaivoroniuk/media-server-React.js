import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from './../UI/Button/Button';
import styles from './Auth.scss';
import { userLogin } from '../../store/actions/user';

export class Login extends Component {
  onClick = e => {
    e.preventDefault();
    this.props.userLogin({
      username: this.refs.username.value,
      password: this.refs.password.value
    });
  };

  render() {
    return (
      <div className={styles.auth}>
        <div>
          <input
            className={styles.username}
            type="text"
            ref="username"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <input
            className={styles.password}
            type="password"
            ref="password"
            placeholder="Enter your password"
          />
        </div>
        <div>
          <Button btnSize="md" clicked={this.onClick}>
            Login
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { userLogin }
)(Login);
