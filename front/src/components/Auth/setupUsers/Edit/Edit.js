import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userUpdate } from '../../../../store/actions/setupUsers';
import styles from '../../Auth.scss';

class Edit extends Component {
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
      <div className={styles.auth}>
        <form className="form" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Edit user: {this.props.user.username}</legend>
            <div>
              <label for="username">Username: </label>
              <input
                className={styles.username}
                name="username"
                type="text"
                defaultValue={this.props.user.username}
                ref={input => (this.getUserName = input)}
                placeholder="Enter user name"
              />
            </div>
            <div>
              <label for="password">Password: </label>
              <input
                className={styles.password}
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
                defaultValue={this.props.user.role}
                ref={input => (this.getRole = input)}
              >
                <option>User</option>
                <option>Admin</option>
              </select>
            </div>
            <button className={styles.button}>Save</button>
            <button
              className={styles.button}
              onClick={() => this.props.cancel(this.props.user.id)}
            >
              Cancel
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  update: data => {
    dispatch(userUpdate(data));
  },
  cancel: id => {
    dispatch({ type: 'USER_EDIT', id });
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Edit);
