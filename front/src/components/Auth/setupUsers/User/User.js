import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userDelete, userUpdate } from '../../../../store/actions/setupUsers';
import Edit from './../Edit/Edit';
import Modal from './../../../UI/Modal/Modal';
import Button from './../../../UI/Button/Button';
import Icon from '././../../../UI/Icon/Icon';
import styles from '../../Auth.scss';

export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      editing: this.props.editing,
      editStyles: [styles.User__edit]
    };
  }

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  };
  toggleEditMode = () => {
    this.setState(prevState => ({
      editing: !prevState.editing,
      editStyles:
        prevState.editStyles.length === 1
          ? [styles.User__edit, styles.User__edit_expand]
          : [styles.User__edit]
    }));
  };

  render() {
    let modal = null;
    modal = (
      <Modal show={this.state.showModal}>
        <div>
          <h3>
            <span>Are you sure to delete this User?</span>
          </h3>
        </div>
        <div>
          <Button
            btnSize="md"
            btnColor="success"
            clicked={() => {
              this.toggleModal();
              this.props.delete(this.props.user.id);
            }}
          >
            Confirm
            <Icon>fa fa-check</Icon>
          </Button>
          <Button
            btnSize="md"
            btnColor="danger"
            clicked={() => {
              this.toggleModal();
            }}
          >
            Decline
            <Icon>fa fa-times</Icon>
          </Button>
        </div>
      </Modal>
    );
    return (
      <Fragment>
        <div className={styles.User}>
          {modal}
          <div className={styles.User__content}>
            <div className={styles.User__content__info}>
              <div className={styles.User__content__info__name}>
                <Icon>fa fa-user-circle</Icon> {this.props.user.username}{' '}
              </div>
              <div className={styles.roleInfo}>
                ( role: {this.props.user.role} )
              </div>
            </div>
            <div className={styles.User__content__controls}>
              <div
                className={styles.User__content__controls__edit}
                onClick={() => {
                  this.props.edit(this.props.user.id);
                  this.toggleEditMode();
                }}
              >
                <Icon iconSize="md">fa fa-edit</Icon>
              </div>
              <div
                className={styles.User__content__controls__delete}
                onClick={() => {
                  this.toggleModal();
                }}
              >
                <Icon iconSize="md">fa fa-trash-alt</Icon>
              </div>
            </div>
          </div>
          <div className={this.state.editStyles.join(' ')}>
            <Edit
              user={this.props.user}
              cancel={this.toggleEditMode}
              update={this.props.update}
              cancelAction={this.props.cancelAction}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    role: PropTypes.string,
    editing: PropTypes.bool
  })
};

const mapDispatchToProps = dispatch => ({
  edit: id => {
    dispatch({ type: 'USER_EDIT', id });
  },
  delete: id => {
    dispatch(userDelete(id));
  },
  update: data => {
    dispatch(userUpdate(data));
  },
  cancelAction: id => {
    dispatch({ type: 'USER_EDIT', id });
  }
});

export default connect(
  null,
  mapDispatchToProps
)(User);
