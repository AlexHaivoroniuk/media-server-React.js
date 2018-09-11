import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userDelete } from '../../../../store/actions/setupUsers';

class User extends Component {
  render() {
    return (
      <div className="User">
        {this.props.user.username} ( {this.props.user.role} {this.props.user.id}{' '}
        )
        <button
          className="edit"
          onClick={() => this.props.edit(this.props.user.id)}
        >
          Edit
        </button>
        <button
          className="delete"
          onClick={() => this.props.delete(this.props.user.id)}
        >
          Delete
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  edit: id => {
    dispatch({ type: 'USER_EDIT', id });
  },
  delete: id => {
    dispatch(userDelete(id));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(User);
