import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userFetch } from '../../../../store/actions/setupUsers';
import User from '../User/User';
import Edit from '../Edit/Edit';

class List extends Component {
  componentDidMount = () => {
    this.props.fetch();
  };

  render() {
    return (
      <div>
        {this.props.users.map(user => (
          <div key={user.id}>
            {user.editing ? (
              <Edit user={user} key={user.id} />
            ) : (
              <User user={user} key={user.id} />
            )}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.setupUsers
  };
};

const mapDispatchToProps = dispatch => ({
  fetch: () => {
    dispatch(userFetch());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
