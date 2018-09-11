import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userCreate } from '../../../../store/actions/setupUsers';

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
      <div className="post-container">
        <h3 className="post_heading">New user</h3>
        <form className="form" onSubmit={this.handleSubmit}>
          <div>
            <label for="username">Username: </label>
            <input
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
              required
              name="password"
              type="text"
              ref={input => (this.getPassword = input)}
              placeholder="Enter password"
            />
          </div>
          <div>
            <label for="role">Role: </label>
            <select required name="role" ref={input => (this.getRole = input)}>
              <option>User</option>
              <option>Admin</option>
            </select>
          </div>
          <button>Add</button>
        </form>
      </div>
    );
  }
}
//export default connect()(Add);
const mapDispatchToProps = dispatch => ({
  create: data => {
    dispatch(userCreate(data));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Add);
