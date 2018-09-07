import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Settings.scss';
import { connect } from 'react-redux';
import { fetchLibraries } from '../../store/actions/libraries';
import axios from 'axios';
import Input from './../UI/Input/Input';
import Icon from './../UI/Icon/Icon';
import Button from './../UI/Button/Button';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addLib: {
        name: '',
        path: ''
      }
    };
  }

  componentDidMount = () => {
    this.props.fetchLib();
  };

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
      .catch(err => new Error(err));
  };

  deleteLibrary = id => {
    axios
      .delete(`http://localhost:4000/libraries/${id}`)
      .then(res => {
        this.props.fetchLib();
      })
      .catch(err => new Error(err));
  };

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
              this.deleteLibrary(lib._id);
            }}
          >
            <Icon>fa fa-trash-alt</Icon>
          </div>
        </div>
      ));
    } else {
      libList = <div>No libraries yet</div>;
    }

    let disable =
      this.state.addLib.name === '' || this.state.addLib.path === ''
        ? true
        : false;

    return (
      <div className={styles.Settings}>
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
                console.log('gggg');
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
                console.log('addLib');
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
