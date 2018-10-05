import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userFetch } from '../../../../store/actions/setupUsers';
import User from '../User/User';
import Add from '../Add/Add';
import styles from './../../Auth.scss';

class List extends Component {
  componentDidMount = () => {
    this.props.fetch();
  };

  render() {
    return (
      <div className={styles.UserList}>
        {this.props.users.map(user => (
          <User user={user} key={user.id} />
        ))}
        <Add />
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
