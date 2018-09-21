import React, { Component } from 'react';
import Button from './../../../UI/Button/Button';
import PropTypes from 'prop-types';
import styles from '../../Auth.scss';

export class Edit extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const username = this.getUserName.value;
    const password = this.getPassword.value;
    const role = this.getRole.value;
    const data = {
      id: this.props.user.id,
      username,
      password,
      role,
      editing: false
    };
    this.props.update(data);

    this.getUserName.value = '';
    this.getPassword.value = '';
    this.getRole.value = 'User';
  };

  render() {
    return (
      <div className={styles.EditUser}>
        <form className={styles.EditUser_form}>
          <div>Edit user: {this.props.user.username}</div>
          <div className={styles.EditUser__form__inputGroup}>
            <div className={styles.EditUser__form__inputGroup__input}>
              <label htmlFor="username">Username: </label>
              <input
                required
                name="username"
                type="text"
                ref={input => (this.getUserName = input)}
                placeholder="Enter user name"
              />
            </div>
            <div className={styles.EditUser__form__inputGroup__input}>
              <label htmlFor="password">Password: </label>
              <input
                required
                name="password"
                type="text"
                ref={input => (this.getPassword = input)}
                placeholder="Enter password"
              />
            </div>
            <div className={styles.EditUser__form__inputGroup__input}>
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
          <div className={styles.EditUser__form__inputGroup__button}>
            <Button btnSize="md" clicked={this.handleSubmit}>
              Save
            </Button>
            <Button
              btnSize="md"
              clicked={e => {
                e.preventDefault();
                this.props.cancel();
                this.props.cancelAction(this.props.user.id);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

Edit.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    role: PropTypes.string
  }),
  update: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  cancelAction: PropTypes.func.isRequired
};

export default Edit;
