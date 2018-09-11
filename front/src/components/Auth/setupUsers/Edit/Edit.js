import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  userUpdate,
  userCancelEditing
} from '../../../../store/actions/setupUsers';

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
      <div className="post-container">
        <h4 className="post_heading">Edit user {this.props.user.username}</h4>
        <form className="form" onSubmit={this.handleSubmit}>
          <div>
            <label for="username">Username: </label>
            <input
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
              name="password"
              type="text"
              ref={input => (this.getPassword = input)}
              placeholder="Enter password"
            />
          </div>
          <div>
            <label for="role">Role: </label>
            <select
              required
              name="role"
              defaultValue={this.props.user.role}
              ref={input => (this.getRole = input)}
            >
              <option>User</option>
              <option>Admin</option>
            </select>
          </div>
          <button>Save</button>
          <button onClick={() => this.props.cancel(this.props.user.id)}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
}
//export default connect()(Add);
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
