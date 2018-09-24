import React, { Component } from 'react';
import Input from './../../../UI/Input/Input';
import Button from './../../../UI/Button/Button';
import PropTypes from 'prop-types';
import styles from '../../Auth.scss';

export class Edit extends Component {
  state = {
    getUserName: this.props.user.username,
    getPassword: '',
    getRole: this.props.user.role
  };

  handleSubmit = e => {
    e.preventDefault();
    const username = this.state.getUserName;
    const password = this.state.getPassword;
    const role = this.state.getRole;
    const data = {
      id: this.props.user.id,
      username,
      password,
      role,
      editing: false
    };
    this.props.update(data);
    this.setState({ getPassword: '' });
  };

  handleInput(val, field) {
    this.setState({
      [field]: val
    });
  }

  render() {
    return (
      <div className={styles.EditUser}>
        <form className={styles.EditUser_form}>
          <div>Edit user: {this.props.user.username}</div>
          <div className={styles.EditUser__form__inputGroup}>
            <div className={styles.EditUser__form__inputGroup__input}>
              <Input
                type="text"
                label={'Username: '}
                value={this.state.getUserName}
                changed={e => {
                  this.handleInput(e.target.value, 'getUserName');
                }}
                placeholder="Enter user name"
              />
            </div>
            <div className={styles.EditUser__form__inputGroup__input}>
              <Input
                type="password"
                label={'Password: '}
                value={this.state.getPassword}
                changed={e => {
                  this.handleInput(e.target.value, 'getPassword');
                }}
                placeholder="Enter password"
              />
            </div>

            <div className={styles.EditUser__form__inputGroup__input}>
              <Input
                type="select"
                label={'Role: '}
                value={this.state.getRole}
                changed={e => {
                  this.handleInput(e.target.value, 'getRole');
                }}
                elConfig={{
                  options: [
                    { value: 'User', displayValue: 'User' },
                    { value: 'Admin', displayValue: 'Admin' }
                  ]
                }}
                placeholder={'Input user Role'}
              />
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
