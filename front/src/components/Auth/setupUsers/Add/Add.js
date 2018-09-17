import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userCreate } from '../../../../store/actions/setupUsers';
import styles from '../../Auth.scss';

export class Add extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const username = this.getUserName.value;
    const password = this.getPassword.value;
    const role = this.getRole.value;
    const data = {
      id: new Date(),
      username,
      password,
      role,
      editing: false
    };
    this.props.userCreate(data);

    this.getUserName.value = '';
    this.getPassword.value = '';
    this.getRole.value = 'User';
  };

  render() {
    return (
      <div className={styles.auth}>
        <form className="form">
          <fieldset>
            <legend>New user</legend>
            <div>
              <label htmlFor="username">Username: </label>
              <input
                className={styles.username}
                required
                name="username"
                type="text"
                ref={input => (this.getUserName = input)}
                placeholder="Enter user name"
              />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input
                className={styles.password}
                required
                name="password"
                type="text"
                ref={input => (this.getPassword = input)}
                placeholder="Enter password"
              />
            </div>
            <div>
              <label htmlFor="role">Role: </label>
              <select
                className={styles.role}
                required
                name="role"
                ref={input => (this.getRole = input)}
              >
                <option>User</option>
                <option>Admin</option>
              </select>
            </div>
            <button className={styles.button} onClick={this.handleSubmit}>
              Add
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { userCreate }
)(Add);
