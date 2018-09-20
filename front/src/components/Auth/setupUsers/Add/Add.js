import React, { Component } from 'react';
import Button from './../../../UI/Button/Button';
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
      <div className={styles.AddUser}>
        <h3>
          <em>Create a new user</em>
        </h3>
        <form className={styles.AddUser__form}>
          <div className={styles.AddUser__form__inputGroup}>
            <div className={styles.AddUser__form__inputGroup__input}>
              <label htmlFor="username">Username: </label>
              <input
                required
                name="username"
                type="text"
                ref={input => (this.getUserName = input)}
                placeholder="Enter user name"
              />
            </div>
            <div className={styles.AddUser__form__inputGroup__input}>
              <label htmlFor="password">Password: </label>
              <input
                required
                name="password"
                type="text"
                ref={input => (this.getPassword = input)}
                placeholder="Enter password"
              />
            </div>
            <div className={styles.AddUser__form__inputGroup__input}>
              <label htmlFor="role">Role: </label>
              <select
                required
                name="role"
                ref={input => (this.getRole = input)}
              >
                <option>User</option>
                <option>Admin</option>
              </select>
            </div>
          </div>
          <div className={styles.AddUser__form__inputGroup__button}>
            <Button btnSize="md" clicked={this.handleSubmit}>
              Add
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { userCreate }
)(Add);
