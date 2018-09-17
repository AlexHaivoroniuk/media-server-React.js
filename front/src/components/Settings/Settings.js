import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Settings.scss';
import { connect } from 'react-redux';
import { fetchLibraries } from '../../store/actions/libraries';
import { notifyMessage } from '../../store/actions/notify';
import axios from 'axios';
import Input from './../UI/Input/Input';
import Icon from './../UI/Icon/Icon';
import Button from './../UI/Button/Button';
import Modal from './../UI/Modal/Modal';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addLib: {
        name: '',
        path: ''
      },
      showModal: false,
      libraryToDeleteId: null
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.deleteLibrary = this.deleteLibrary.bind(this);
  }

  componentDidMount = () => {
    this.props.fetchLib();
  };

  toggleModal() {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  }

  handleAddLibInput = (val, field) => {
    this.setState((prevState, props) => ({
      addLib: {
        ...prevState.addLib,
        [field]: val
      }
    }));
  };

  addLibrary = data => {
    axios
      .post('http://localhost:4000/libraries', {
        name: data.name,
        path: data.path,
        uId: data.id
      })
      .then(res => {
        this.props.fetchLib();
        this.setState({ addLib: { name: '', path: '' } });
      })
      .catch(err => {
        let id =
          Math.random()
            .toString(36)
            .substring(2, 15) +
          Math.random()
            .toString(36)
            .substring(2, 15);
        let errorMessage = null;
        if (err.message.data.msg !== undefined) {
          errorMessage = err.message.data.msg;
        } else {
          errorMessage = 'Unknown error occured';
        }
        this.props.notifyMsg({ message: errorMessage, type: 'error' }, id);
        this.setState(prevState => ({
          addLib: { ...prevState.addLib, path: '' }
        }));
      });
  };

  deleteLibrary() {
    axios
      .delete(`http://localhost:4000/libraries/${this.state.libraryToDeleteId}`)
      .then(() => {
        this.props.fetchLib();
      })
      .catch(err => new Error(err));
  }

  render() {
    let libList = null;
    if (this.props.libraries.length > 0) {
      libList = this.props.libraries.map((lib, idx) => (
        <div
          key={idx}
          className={styles.Settings__Libraries__LibrariesList__item}
        >
          <div
            className={styles.Settings__Libraries__LibrariesList__item__name}
          >
            <Icon>fa fa-folder</Icon>
            <span>{lib.name}</span>
          </div>
          <div
            className={styles.Settings__Libraries__LibrariesList__item__delete}
            onClick={() => {
              this.setState({ libraryToDeleteId: lib._id });
              this.toggleModal();
            }}
          >
            <Icon>fa fa-trash-alt</Icon>
          </div>
        </div>
      ));
    } else {
      libList = <div>No libraries yet</div>;
    }

    let modal = null;
    if (this.state.showModal) {
      modal = (
        <Modal
          show={this.state.showModal}
          close={() => {
            this.toggleModal();
          }}
          cancellable={false}
        >
          <div>
            <h3>
              <span>Are you sure to delete this library?</span>
            </h3>
          </div>
          <div>
            <Button
              btnSize="md"
              btnColor="success"
              clicked={() => {
                this.toggleModal();
                this.deleteLibrary();
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
    }

    let disable =
      this.state.addLib.name === '' || this.state.addLib.path === ''
        ? true
        : false;

    return (
      <div className={styles.Settings}>
        {modal}
        <h2>Settings</h2>
        <hr />
        <h3>
          <em>User</em>
        </h3>
        <div className={styles.Settings__User}>
          <Input
            type="text"
            label="Username"
            placeholder="Username"
            value=""
            changed={e => {
              return e.target.value;
            }}
          />
          <Input
            type="password"
            label="Password"
            placeholder="Password"
            value=""
            changed={e => {
              return e.target.value;
            }}
          />
        </div>
        <hr />
        <h3>
          <em>Libraries</em>
        </h3>
        <div className={styles.Settings__Libraries}>
          <div className={styles.Settings__Libraries__LibrariesList}>
            {libList}
          </div>
          <div className={styles.Settings__Libraries__AddLibraries}>
            <Input
              type="text"
              label="Library name"
              placeholder="e.g. favorite"
              value={this.state.addLib.name}
              changed={e => {
                this.handleAddLibInput(e.target.value, 'name');
              }}
            />
            <Input
              type="text"
              label="Path to library"
              placeholder="e.g. /home/user/myMovies"
              value={this.state.addLib.path}
              changed={e => {
                this.handleAddLibInput(e.target.value, 'path');
              }}
            />
            <Button
              btnSize="md"
              clicked={() => {
                this.addLibrary({
                  name: this.state.addLib.name,
                  path: this.state.addLib.path,
                  id: this.props.user.id
                });
              }}
              disabled={disable}
            >
              Add library
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    isLoading: PropTypes.bool
  }),
  libraries: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      path: PropTypes.string,
      userId: PropTypes.string
    })
  )
};

const mapStateToProps = state => ({
  user: state.user,
  libraries: state.libraries
});

const mapDispatchToProps = dispatch => ({
  fetchLib: () => {
    dispatch(fetchLibraries());
  },
  notifyMsg: (data, id) => {
    dispatch(notifyMessage(data, id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
