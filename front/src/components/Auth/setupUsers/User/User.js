import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userDelete } from '../../../../store/actions/setupUsers';
import styles from '../../Auth.scss';

export class User extends Component {
  render() {
    return (
      <div className="User">
        {this.props.user.username}{' '}
        <span className={styles.roleInfo}>
          ( role: {this.props.user.role} )
        </span>
        <button
          className={styles.button + ' edit'}
          onClick={() => this.props.edit(this.props.user.id)}
        >
          Edit
        </button>
        <button
          className={styles.button + ' delete'}
          onClick={() => {
            if (
              window.confirm(
                `Are you sure you wish to delete user ${
                  this.props.user.username
                }?`
              )
            )
              this.props.delete(this.props.user.id);
          }}
        >
          Delete
        </button>
      </div>
    );
  }
}

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    role: PropTypes.string
  })
};

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
