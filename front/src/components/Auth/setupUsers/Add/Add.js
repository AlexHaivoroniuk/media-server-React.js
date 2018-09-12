import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userCreate } from '../../../../store/actions/setupUsers';
import styles from '../../Auth.scss';

class Add extends Component {
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
    this.props.create(data);

    this.getUserName.value = '';
    this.getPassword.value = '';
    this.getRole.value = 'User';
  };

  render() {
    return (
      <div className={styles.auth}>
        <form className="form" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>New user</legend>
            <div>
              <label for="username">Username: </label>
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
              <label for="password">Password: </label>
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
              <label for="role">Role: </label>
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
            <button className={styles.button}>Add</button>
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  create: data => {
    dispatch(userCreate(data));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Add);
